export interface Metrics {
  rawTokenCount: number;
  companionTokenCount: number;
  burdenDelta: number; // Positive means we saved burden (Raw > Companion)
  estimatedTotalTokens: number;
}

export class MetricsEngine {
  // A rough approximation: 1 token ~= 4 characters
  private static CHARS_PER_TOKEN = 4;

  static estimateTokens(text: string): number {
    return Math.ceil(text.length / this.CHARS_PER_TOKEN);
  }

  static calculateBurdenDelta(rawContent: string, companionContent: string | null): number {
    const rawTokens = this.estimateTokens(rawContent);
    const companionTokens = companionContent ? this.estimateTokens(companionContent) : 0;
    
    // If no companion exists, we haven't saved any burden (in fact, the burden is full)
    // But for the "Delta" metric:
    // If I read the Companion INSTEAD of the Raw, I save (Raw - Companion).
    // If Companion is 0 (missing), I save 0 (I have to read Raw).
    if (!companionContent) return 0;

    return rawTokens - companionTokens;
  }
}
