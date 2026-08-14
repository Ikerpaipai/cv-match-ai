import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingResultDto } from './dto/matching-result.dto/matching-result.dto';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get(':candidateId')
  matchCandidate(
    @Param('candidateId') candidateId: string,
  ): Promise<MatchingResultDto[]> {
    return this.matchingService.matchCandidate(candidateId);
  }

  @Post(':candidateId/import')
  importMatches(
    @Param('candidateId') candidateId: string,
    @Query('limit') limit = '5',
  ): Promise<MatchingResultDto[]> {
    return this.matchingService.importMatches(candidateId, Number(limit));
  }
}
