export interface Metrics {
  rawTokenCount: number;
  companionTokenCount: number;
  burdenDelta: number;
  estimatedTotalTokens: number;
}

export class MetricsEngine {
  private static CHARS_PER_TOKEN = 4;

  static estimateTokens(text: string): number {
    return Math.ceil(text.length / this.CHARS_PER_TOKEN);
  }

  static calculateBurdenDelta(rawContent: string, companionContent: string | null): number {
    const rawTokens = this.estimateTokens(rawContent);
    const companionTokens = companionContent ? this.estimateTokens(companionContent) : 0;
    
    if (!companionContent) return 0;

    return rawTokens - companionTokens;
  }
}
