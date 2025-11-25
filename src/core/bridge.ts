import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export type BridgeMode = 'ARCHITECT' | 'CODER' | 'SCRIBE';

interface BridgeConfig {
  model: string;
  temperature: number;
  thinkingConfig?: {
    includeThoughts: boolean;
    thinkingLevel?: "LOW" | "HIGH";
    thinkingBudget?: number;
  };
  presencePenalty?: number;
  frequencyPenalty?: number;
}

export class Bridge {
  private static ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  private static getModeConfig(mode: BridgeMode): BridgeConfig {
    switch (mode) {
      case 'ARCHITECT':
        return {
          model: 'gemini-3-pro-preview',
          temperature: 0.7,
          thinkingConfig: {
            includeThoughts: true,
            thinkingLevel: "HIGH"
          },
          presencePenalty: 0.0
        };
      case 'CODER':
        return {
          model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
          temperature: 0.1,
          presencePenalty: 0.0,
          frequencyPenalty: 0.0
        };
      case 'SCRIBE':
        return {
          model: 'gemini-2.5-flash-lite',
          temperature: 0.3,
          presencePenalty: 0.2,
          frequencyPenalty: 0.2
        };
      default:
        return {
          model: 'gemini-2.0-flash-exp',
          temperature: 0.5
        };
    }
  }

  static async cross(scroll: string, mode: BridgeMode = 'CODER'): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("The Bridge is broken (No API Key).");
    }

    const config = this.getModeConfig(mode);
    // Allow env override for model only if not strictly Architect (which needs thinking)
    if (mode !== 'ARCHITECT' && process.env.GEMINI_MODEL) {
        config.model = process.env.GEMINI_MODEL;
    }

    // @ts-ignore - The SDK types might lag behind the experimental params
    const generationConfig: any = {
        temperature: config.temperature,
        presencePenalty: config.presencePenalty,
        frequencyPenalty: config.frequencyPenalty
    };

    if (config.thinkingConfig) {
        generationConfig.thinkingConfig = config.thinkingConfig;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: config.model,
        contents: scroll,
        config: generationConfig
      });
      
      const text = response.text;
      if (!text) throw new Error("The Advisor is silent.");

      return text;
    } catch (error) {
      throw error;
    }
  }
}
