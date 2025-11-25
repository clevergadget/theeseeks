import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export class Bridge {
  private static ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  static async cross(scroll: string): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("The Bridge is broken (No API Key).");
    }

    try {
      const response = await this.ai.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-3-pro-preview',
        contents: scroll,
      });
      
      const text = response.text;
      if (!text) throw new Error("The Advisor is silent.");

      return text;
    } catch (error) {
      // console.error("Bridge Error:", error); // Let the caller handle the error display
      throw error;
    }
  }
}
