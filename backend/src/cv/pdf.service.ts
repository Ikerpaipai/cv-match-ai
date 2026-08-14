import 'multer';

import { Injectable } from '@nestjs/common';
import pdfParse from 'pdf-parse';

@Injectable()
export class PdfService {
  async extractText(file: Express.Multer.File) {
    const data = (await pdfParse(file.buffer)) as {
      text: string;
    };

    return data.text;
  }
}
