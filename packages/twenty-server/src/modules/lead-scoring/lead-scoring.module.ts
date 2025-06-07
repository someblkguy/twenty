import { Module } from '@nestjs/common';

import { LeadScoringService } from './services/lead-scoring.service';

@Module({
  providers: [LeadScoringService],
  exports: [LeadScoringService],
})
export class LeadScoringModule {}
