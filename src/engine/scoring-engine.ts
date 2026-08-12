import { ScoringConfig } from "../types/circuit";

export const defaultScoringConfig: ScoringConfig = {
  maxScore: 100,
  connectionPoints: 5,
  incorrectConnectionPenalty: 2,
  hintPenalty: 5,
  completionBonus: 20,
  simulationBonus: 20,
};

export class ScoringEngine {
  private score: number = 0;
  private hintsUsed: number = 0;
  private wrongConnections: number = 0;

  constructor(private config: ScoringConfig = defaultScoringConfig) {}

  public recordConnection(valid: boolean) {
    if (valid) {
      this.score += this.config.connectionPoints;
    } else {
      this.wrongConnections++;
      this.score = Math.max(0, this.score - this.config.incorrectConnectionPenalty);
    }
  }

  public recordHintUsed() {
    this.hintsUsed++;
    this.score = Math.max(0, this.score - this.config.hintPenalty);
  }

  public recordCompletion() {
    this.score += this.config.completionBonus;
  }

  public recordSimulationSuccess() {
    this.score += this.config.simulationBonus;
  }

  public getScore(): number {
    return Math.min(this.config.maxScore, Math.max(0, this.score));
  }

  public getStats() {
    return {
      score: this.getScore(),
      hintsUsed: this.hintsUsed,
      wrongConnections: this.wrongConnections,
    };
  }

  public reset() {
    this.score = 0;
    this.hintsUsed = 0;
    this.wrongConnections = 0;
  }
}
