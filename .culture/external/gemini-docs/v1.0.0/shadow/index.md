# Shadow Companion: Gemini API Quickstart

## The Spirit
This document serves as the spark of ignition. It bridges the silence between a local development environment and the reasoning capabilities of the Gemini models. Its purpose is purely foundational: to dissolve the friction of setup and guide the Scribe through the ritual of "First Contact"—transforming a static script into a vessel for synthetic thought via a single text prompt.

## The Skeleton

**The Artifacts (Libraries)**
*   **Python:** `pip install google-genai`
*   **Node.js:** `npm install @google/genai`
*   **Go:** `go get google.golang.org/genai`
*   **Java (Maven):** `com.google.genai:google-genai`
*   **C# (NuGet):** `Google.GenAI`

**The Key**
*   **Credential:** `GEMINI_API_KEY` (Stored as Environment Variable)

**The Universal Invocation (Abstracted Pattern)**
```code
// 1. Initialize the conduit
Client client = new Client(ApiKey);

// 2. Transmit the prompt
Response response = client.models.generateContent(
    model = "gemini-2.5-flash",
    contents = "Explain how AI works..."
);

// 3. Reveal the result
print(response.text);
```

## The Peek
*   **Prerequisites:** The necessity of the API Key from Google AI Studio.
*   **Installation:** Instructions for imparting the SDKs into Python, JavaScript, Go, Java, C#, and Apps Script environments.
*   **Execution:** Code snippets demonstrating the instantiation of the client and the execution of the `generateContent` method.
*   **The Protocol:** A fallback method using raw REST/cURL for those eschewing libraries.