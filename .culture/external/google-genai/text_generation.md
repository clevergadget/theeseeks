# Text Generation

**Source:** [https://ai.google.dev/gemini-api/docs/text-generation](https://ai.google.dev/gemini-api/docs/text-generation)

## The Skeleton (Key Concepts)

### 1. Simple Text
```typescript
const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Write a story about a magic backpack."
});
```

### 2. Streaming
For long responses, use streaming to reduce latency perception.
```typescript
const result = await client.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: "Write a long story..."
});
for await (const chunk of result.stream) {
    process.stdout.write(chunk.text());
}
```

### 3. Configuration
You can control temperature, topK, and topP.
```typescript
const config = {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
};
```

## The Spirit (Notes)
*   **Streaming:** Essential for CLI tools like `theeseeks` to provide immediate feedback.
*   **System Instructions:** Can be passed to define the persona (e.g., "You are Zhuge Liang").
