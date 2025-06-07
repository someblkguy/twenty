import { Test, TestingModule } from '@nestjs/testing';
import { LeadScoringService } from './lead-scoring.service';

// Mock current date to keep tests deterministic
const RealDate = Date;

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00Z'));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('LeadScoringService', () => {
  let service: LeadScoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadScoringService],
    }).compile();

    service = module.get<LeadScoringService>(LeadScoringService);
  });

  it('calculates high score for promising deal', () => {
    const score = service.calculateLeadScore({
      amount: { amountMicros: 50000000, currencyCode: 'USD' },
      stage: 'PROPOSAL',
      closeDate: new Date('2023-01-05T00:00:00Z'),
    } as any);

    expect(score).toBeGreaterThan(0.5);
  });

  it('detects at-risk deal', () => {
    const risk = service.isDealAtRisk({
      amount: { amountMicros: 1000000, currencyCode: 'USD' },
      stage: 'NEW',
      closeDate: new Date('2022-12-20T00:00:00Z'),
    } as any);

    expect(risk).toBe(true);
  });
});
