import { Injectable, NotFoundException } from '@nestjs/common';
import { CandidateService } from '../candidate/candidate.service';
import { JobMatchService } from '../job-match/job-match.service';
import { MatchingReportService } from './matching-report/matching-report.service';
import { Skill } from 'src/common/types/skill.type';
import { TitleNormalizerService } from 'src/common/title-normalizer/title-normalizer.service';
import { JobSkillExtractorService } from 'src/job-offer/job-skill-extractor/job-skill-extractor.service';
import { MatchingResultDto } from './dto/matching-result.dto/matching-result.dto';

type MatchScore = {
  matchedRequiredSkills: string[];
  matchedOptionalSkills: string[];
  missingSkills: string[];
  score: number;
  explanation: string;
};

@Injectable()
export class MatchingService {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly jobMatchService: JobMatchService,
    private readonly matchingReportService: MatchingReportService,
    private readonly titleNormalizer: TitleNormalizerService,
    private readonly jobSkillExtractor: JobSkillExtractorService,
  ) {}

  private calculateSkillScore(
    candidateSkills: string[],
    jobSkills: Skill[],
  ): MatchScore {
    const normalizedCandidateSkills = candidateSkills.map((skill) =>
      this.jobSkillExtractor.normalize(skill),
    );

    const normalizedJobSkills = jobSkills.map((skill) => ({
      ...skill,
      name: this.jobSkillExtractor.normalize(skill.name),
    }));

    const requiredSkills = normalizedJobSkills
      .filter((skill) => skill.required)
      .map((skill) => skill.name);

    const optionalSkills = normalizedJobSkills
      .filter((skill) => !skill.required)
      .map((skill) => skill.name);

    const matchedRequiredSkills = normalizedCandidateSkills.filter(
      (candidateSkill) =>
        requiredSkills.some(
          (requiredSkill) => requiredSkill === candidateSkill,
        ),
    );

    const matchedOptionalSkills = normalizedCandidateSkills.filter(
      (candidateSkill) =>
        optionalSkills.some(
          (optionalSkill) => optionalSkill === candidateSkill,
        ),
    );

    const missingSkills = requiredSkills.filter(
      (requiredSkill) =>
        !normalizedCandidateSkills.some(
          (candidateSkill) => candidateSkill === requiredSkill,
        ),
    );

    const requiredScore =
      requiredSkills.length === 0
        ? 100
        : (matchedRequiredSkills.length / requiredSkills.length) * 100;

    const optionalScore =
      optionalSkills.length === 0
        ? 100
        : (matchedOptionalSkills.length / optionalSkills.length) * 100;

    const score = Math.round(requiredScore * 0.8 + optionalScore * 0.2);

    const explanation = `
      Matched required: ${
        matchedRequiredSkills.length > 0
          ? matchedRequiredSkills.join(', ')
          : 'None'
      }.
      Matched optional: ${
        matchedOptionalSkills.length > 0
          ? matchedOptionalSkills.join(', ')
          : 'None'
      }.
      Missing required: ${
        missingSkills.length > 0 ? missingSkills.join(', ') : 'None'
      }.
    `;

    return {
      matchedRequiredSkills,
      matchedOptionalSkills,
      missingSkills,
      score,
      explanation,
    };
  }

  private calculateTitleScore(
    candidateTitle: string,
    jobTitle: string,
  ): number {
    const normalizedCandidate = this.titleNormalizer.normalize(candidateTitle);

    const normalizedJob = this.titleNormalizer.normalize(jobTitle);

    console.log({
      candidateTitle,
      jobTitle,
      normalizedCandidate,
      normalizedJob,
    });

    if (normalizedCandidate === normalizedJob) {
      return 100;
    }

    return 0;
  }

  private calculateExperienceScore(
    candidateYears: number,
    requiredYears: number,
  ): number {
    if (requiredYears === 0) {
      return 100;
    }

    return Math.min(100, Math.round((candidateYears / requiredYears) * 100));
  }

  private calculateGlobalScore(
    skillScore: number,
    titleScore: number,
    experienceScore: number,
    semanticScore: number,
    missingRequiredSkills: number,
  ): number {
    const semantic = semanticScore * 100;

    let score = Math.round(
      skillScore * 0.4 +
        titleScore * 0.15 +
        experienceScore * 0.15 +
        semantic * 0.3,
    );

    if (missingRequiredSkills > 0) {
      score -= missingRequiredSkills * 10;
    }

    return Math.max(0, score);
  }

  private buildMatch(
    candidate: {
      skills: string[];
      title: string;
      experienceYears: number;
    },
    job: {
      id: string;
      title: string;
      company: string;
      location: string;
      description: string;
      experienceYears: number;
      url: string;
      similarity: number;
      skills: Skill[];
    },
  ): MatchingResultDto {
    const skill = this.calculateSkillScore(candidate.skills, job.skills);

    const title = this.calculateTitleScore(candidate.title, job.title);

    const experience = this.calculateExperienceScore(
      candidate.experienceYears,
      job.experienceYears,
    );

    const semantic = job.similarity;

    console.log({
      job: job.title,
      semanticScore: semantic,
      skillScore: skill.score,
      titleScore: title,
      experienceScore: experience,
    });

    const globalScore = this.calculateGlobalScore(
      skill.score,
      title,
      experience,
      semantic,
      skill.missingSkills.length,
    );

    const report = this.matchingReportService.build({
      matchedRequiredSkills: skill.matchedRequiredSkills,
      matchedOptionalSkills: skill.matchedOptionalSkills,
      missingSkills: skill.missingSkills,
      titleScore: title,
      experienceScore: experience,
      semanticScore: semantic,
      globalScore,
    });

    return {
      job: {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        experienceYears: job.experienceYears,
        url: job.url,
        skills: job.skills.map((skill) => ({
          name: skill.name,
          required: skill.required,
        })),
      },

      matchedRequiredSkills: skill.matchedRequiredSkills,
      matchedOptionalSkills: skill.matchedOptionalSkills,
      missingSkills: skill.missingSkills,

      skillScore: skill.score,
      titleScore: title,
      experienceScore: experience,
      semanticScore: semantic,

      score: globalScore,

      report,
    };
  }

  async matchCandidate(candidateId: string): Promise<MatchingResultDto[]> {
    const candidate = await this.candidateService.findOne(candidateId);

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    /*
     * GET /matching/:candidateId
     *
     * Récupère uniquement les jobs déjà analysés.
     *
     * Aucun appel Gemini.
     */
    const jobs = await this.jobMatchService.findAnalyzedMatches(candidateId);

    const matches = jobs.map((job) => this.buildMatch(candidate, job));

    matches.sort((a, b) => b.score - a.score);

    return matches;
  }

  async importMatches(
    candidateId: string,
    limit: number,
  ): Promise<MatchingResultDto[]> {
    const candidate = await this.candidateService.findOne(candidateId);

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    /*
     * POST /matching/:candidateId/import
     *
     * JobMatchService :
     * - cherche les meilleurs jobs non analysés
     * - appelle Gemini
     * - sauvegarde l'analyse
     * - retourne les jobs enrichis
     */
    const jobs = await this.jobMatchService.importNewMatches(
      candidateId,
      limit,
    );

    const matches = jobs.map((job) => this.buildMatch(candidate, job));

    matches.sort((a, b) => b.score - a.score);

    return matches;
  }
}
