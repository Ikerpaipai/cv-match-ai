import 'multer';
import { Injectable } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CvAnalysisService } from './cv-analysis.service';
import { CandidateService } from 'src/candidate/candidate.service';

@Injectable()
export class CvService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly cvAnalysisService: CvAnalysisService,
    private readonly candidateService: CandidateService,
  ) {}

  async upload(file: Express.Multer.File) {
    const text = await this.pdfService.extractText(file);

    const analysis = await this.cvAnalysisService.analyze(text);

    const candidate = await this.candidateService.create(analysis);

    return {
      message: 'CV analysé',
      analysis: candidate,
    };
  }

  findAll() {
    return this.candidateService.findAll();
  }
}
