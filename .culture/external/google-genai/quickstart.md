# Quickstart: Google GenAI SDK

**Source:** [https://ai.google.dev/gemini-api/docs/quickstart](https://ai.google.dev/gemini-api/docs/quickstart)

## The Skeleton (Key Concepts)

### 1. Installation
The SDK is available for Python, Node.js, Go, and Java.
For Node.js (our environment):
```bash
npm install @google/genai
```

### 2. Initialization
The client is initialized with an API key.
```typescript
import { GoogleGenAI } from "@google/genai";
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

### 3. Basic Request (Generate Content)
The core method is `models.generateContent`.
```typescript
const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works"
});
console.log(response.text);
```

## The Spirit (Notes)
*   **API Key:** Must be set in `GEMINI_API_KEY` or passed explicitly.
*   **Models:** `gemini-2.5-flash` is the standard; `gemini-3-pro-preview` is the advanced reasoning model we use.
