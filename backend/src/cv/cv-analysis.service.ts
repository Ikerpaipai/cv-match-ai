import { Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { CvAnalysisSchema } from './schemas/cv-analysis.schema';
import { CvFallbackExtractorService } from './cv-fallback-extractor.service';

@Injectable()
export class CvAnalysisService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly fallbackExtractor: CvFallbackExtractorService,
  ) {}

  async analyze(text: string) {
    try {
      const prompt = `
Tu es un expert en recrutement de développeurs.

Analyse le CV suivant.

Retourne uniquement un JSON valide avec cette structure :

{
  "name": string,
  "title": string,
  "skills": string[],
  "experienceYears": number
}

Règles :

- Ne retourne aucun texte avant ou après le JSON.
- name : nom complet du candidat.
- title : titre professionnel principal du candidat.
- skills : uniquement les technologies et compétences techniques.
- experienceYears : calcule le nombre total d'années d'expérience professionnelle en utilisant les périodes indiquées dans le CV.

Pour calculer experienceYears :
- Si le CV indique directement un nombre d'années d'expérience, utilise cette information.
- Si le CV indique des périodes avec des années ou des dates, calcule la durée des expériences.
- Exemple : 2012-2024 correspond à environ 12 années d'expérience.
- Exemple : 2009-2010 correspond à environ 1 année d'expérience.
- Si plusieurs expériences sont indiquées, estime le nombre total d'années d'expérience professionnelle.
- Ne compte pas deux fois les périodes qui se chevauchent.
- Si aucune expérience professionnelle ne peut être déterminée, retourne 0.
- experienceYears doit toujours être un nombre entier.

Si une information textuelle comme name ou title est réellement absente, utilise une chaîne vide.

CV :

${text}
`;

      const result = await this.geminiService.generate(prompt);

      console.log('GEMINI RESPONSE:');
      console.log(result);

      const cleanedResult = result
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/, '')
        .trim();

      const json: unknown = JSON.parse(cleanedResult);

      console.log('PARSED JSON:');
      console.log(json);

      return CvAnalysisSchema.parse(json);
    } catch (error: unknown) {
      console.error(
        'Gemini indisponible, fallback activé',
        error instanceof Error ? error.message : error,
      );

      const fallback = this.fallbackExtractor.extract(text);

      console.log('FALLBACK RESULT:');
      console.log(fallback);

      return CvAnalysisSchema.parse(fallback);
    }
  }
}
