# TheeSeeks: Context Engineering Engine

**TheeSeeks** (`seeks`) is a CLI tool designed to solve the "Context Alignment" problem in AI-assisted software development. It acts as a middleware layer between the developer's intent and the LLM's execution, ensuring that code generation is grounded in the project's specific architectural and cultural standards.

> "Better inputs yield superior outputs. TheeSeeks automates the curation of high-quality context to reduce hallucination, token waste, and cognitive load."

## 🚀 The Problem
As AI integration deepens, developers face new bottlenecks:
1.  **Context Rot:** The "Why" behind code (architecture, constraints, business logic) is often lost or scattered, leading LLMs to suggest generic, non-compliant solutions.
2.  **Prompt Fatigue:** Manually pasting context for every query is inefficient and error-prone.
3.  **Cognitive Overload:** Managing the state of a complex codebase *and* the state of an LLM conversation simultaneously leads to burnout.

## 🛠 The Solution
TheeSeeks introduces a **"Shadow Library"** architecture—a parallel file structure that mirrors your source code but contains the *semantic intent* (the "Spirit") rather than just the syntax (the "Letter").

### Key Features

*   **The Shadow Library (`.culture/`)**: A structured repository of markdown "Companions" that travel with your code files. When you ask about `auth.ts`, the system automatically injects the architectural constraints defined in `.culture/src/auth.ts.md`.
*   **The Gatekeeper (Sentiment Analysis)**: Uses Gemini 3 to analyze the developer's input state. It detects frantic or vague queries and prompts for clarification *before* wasting tokens on a poor generation.
*   **Context Scrolls**: Automatically assembles a "Context Scroll"—a highly optimized, token-efficient prompt package containing only the relevant code and its semantic companions.
*   **The Covenant Protocol**: A configurable set of axioms (Grace, Clarity, Consent) that the AI must adhere to, acting as a system prompt that enforces code quality and maintainability.

## 📦 Installation & Usage

```bash
# Install globally (Coming Soon)
npm install -g theeseeks

# Initialize in your project (Python, Node, Rust, etc.)
seeks init

# Ask a question with full context awareness
seeks ask "Refactor the login loop to use the new retry logic."
```

## 🏗 Architecture

*   **Core:** TypeScript / Node.js
*   **AI Engine:** Google Gemini 3 Pro (via `@google/genai`)
*   **CLI:** Commander.js
*   **State Management:** Local JSON profile persistence

## 🔮 Roadmap: The Context Engineering Suite

We are building a comprehensive suite of metrics to quantify the value of "Humane Engineering":
*   **Resonance Score:** Measuring the alignment between developer intent and AI output.
*   **Burden Delta:** Calculating cognitive load saved per session.
*   **Context Drift Detection:** Automated flagging of documentation that has fallen out of sync with the codebase.

## 📄 License
MIT
