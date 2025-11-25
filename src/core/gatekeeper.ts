import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export type SeekerState = 'Calm' | 'Frantic' | 'Weary';

export interface Reflection {
  state: SeekerState;
  original: string;
  suggestion?: string;
  message: string;
}

export class Gatekeeper {
  private static ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  static async analyze(input: string): Promise<Reflection> {
    if (!process.env.GEMINI_API_KEY) {
        return {
            state: 'Calm',
            original: input,
            message: "The Gatekeeper is blind (No API Key). Proceeding with caution."
        };
    }

    try {
      const prompt = `
        Role: You are the Gatekeeper, a wise, ancient observer of a software developer's state of mind.
        Task: Analyze the developer's input.
        Classify State: 'Calm' (Focused, clear), 'Frantic' (Urgent, angry, shouting, panicked), or 'Weary' (Tired, low effort, vague).
        Output: A JSON object with:
        - state: 'Calm' | 'Frantic' | 'Weary'
        - message: A short, metaphorical observation of their state (in the style of Zhuge Liang).
        - suggestion: (Only if Frantic or Weary) A rewritten, calm, and clear version of their intent.

        Input: "${input}"
        Response (JSON only):
      `;

      const response = await this.ai.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json'
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("No response from Gatekeeper");

      const analysis = JSON.parse(text);

      return {
        state: analysis.state,
        original: input,
        message: analysis.message,
        suggestion: analysis.suggestion
      };
    } catch (error) {
      console.error("Gatekeeper Error:", error);
      return {
        state: 'Calm',
        original: input,
        message: "The Gatekeeper is clouded. Proceeding."
      };
    }
  }
}
