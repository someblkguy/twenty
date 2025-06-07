import { Injectable } from '@nestjs/common';
import { OpportunityWorkspaceEntity } from 'src/modules/opportunity/standard-objects/opportunity.workspace-entity';

/**
 * Service providing basic machine learning driven lead scoring and risk insights.
 * The scoring uses a simple logistic regression over opportunity fields.
 */
@Injectable()
export class LeadScoringService {
  /**
   * Calculate a score between 0 and 1 estimating how likely the lead will close.
   * Higher scores indicate a better chance of closing.
   */
  calculateLeadScore(opportunity: Pick<OpportunityWorkspaceEntity, 'amount' | 'stage' | 'closeDate'>): number {
    const stageWeights: Record<string, number> = {
      NEW: 0,
      SCREENING: 0.2,
      MEETING: 0.4,
      PROPOSAL: 0.7,
      CUSTOMER: 1,
    };

    const w0 = -1;
    const wAmount = 0.000001; // amountMicros is used
    const wStage = 1;
    const wTime = -0.01;

    const amount = opportunity.amount ? opportunity.amount.amountMicros : 0;
    const stageWeight = stageWeights[opportunity.stage] ?? 0;
    const daysUntilClose = opportunity.closeDate
      ? (opportunity.closeDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      : 0;

    const x = w0 + wAmount * amount + wStage * stageWeight + wTime * daysUntilClose;
    const score = 1 / (1 + Math.exp(-x));
    return parseFloat(score.toFixed(4));
  }

  /**
   * Determine if a deal is at risk based on the calculated score.
   * Deals with a score under 0.4 are considered at risk.
   */
  isDealAtRisk(opportunity: Pick<OpportunityWorkspaceEntity, 'amount' | 'stage' | 'closeDate'>): boolean {
    const score = this.calculateLeadScore(opportunity);
    return score < 0.4;
  }
}
