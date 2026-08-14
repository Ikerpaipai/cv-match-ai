import { Injectable } from '@nestjs/common';

@Injectable()
export class AdzunaJobPageService {
  async extractJobDescription(url: string): Promise<string | null> {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    const sectionMatch = html.match(
      /<section[^>]*class="[^"]*adp-body[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
    );

    if (!sectionMatch) {
      return null;
    }

    const sectionHtml = sectionMatch[1];

    const text = sectionHtml
      .replace(/<li[^>]*>/gi, '\n- ')
      .replace(/<\/li>/gi, '')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();

    return text;
  }
}
