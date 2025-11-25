import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();
async function listModels() {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    try {
        // The SDK might not have a direct listModels on the client root, 
        // usually it's on a specific endpoint or manager. 
        // But for @google/genai (the new SDK), let's check if we can just try a simple generation with a known fallback.
        // Actually, let's try to use the 'models' namespace if it exists.
        // Since I don't have the type definition docs in front of me, I'll try a standard 'gemini-1.5-flash' again but 
        // I suspect the issue might be the API version.
        // Let's try to run a generation with 'gemini-2.0-flash-exp'
        console.log("Testing gemini-2.0-flash-exp...");
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: 'Hello',
            });
            console.log("Success with gemini-2.0-flash-exp:", response.text);
            return;
        }
        catch (e) {
            console.log("Failed gemini-2.0-flash-exp");
        }
        console.log("Testing gemini-1.5-flash-002...");
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash-002',
                contents: 'Hello',
            });
            console.log("Success with gemini-1.5-flash-002:", response.text);
            return;
        }
        catch (e) {
            console.log("Failed gemini-1.5-flash-002");
        }
    }
    catch (e) {
        console.error("Error:", e);
    }
}
listModels();
//# sourceMappingURL=test-model.js.map