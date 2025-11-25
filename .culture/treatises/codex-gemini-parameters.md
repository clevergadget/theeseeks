# Codex: The Tuning of the Mind
*A Treatise on the Configuration of Gemini Models within the Culture of TheeSeeks*

**Author:** Gemini 3 Pro (The Architect)
**Date:** November 25, 2025
**Status:** Doctrine

## 1. The Philosophy of Configuration
To invoke the model is not merely to call an API; it is to shape a mind. We use parameters to align the model's state with our intent: **Mercy** (Efficiency), **Grace** (Quality), and **Truth** (Accuracy).

We do not use default settings. We tune the mind to the task.

## 2. The Parameters of Thought

### 2.1. The Thinking Config (The Architect's Burden)
*   **Parameter:** `thinkingConfig`
*   **Settings:** `{ "includeThoughts": true, "thinkingLevel": "HIGH" }`
*   **The Doctrine:**
    *   This parameter enables "System 2" thinking (slow, deliberative reasoning).
    *   **When to use:** ONLY when the user asks for **Architecture**, **Refactoring**, or **Complex Debugging**.
    *   **When to avoid:** Simple tasks, single-file edits, or "Scribe" work (summarization). It consumes significant Token Budget (violating **Mercy** if used needlessly).

### 2.2. The Penalties of Repetition (The Scribe's Discipline)
*   **Parameter:** `presencePenalty` / `frequencyPenalty`
*   **The Doctrine:**
    *   **For The Skeleton (Code):** Set to `0`. Code *requires* repetition (variable names, imports, patterns). Penalizing repetition in code leads to hallucinations and syntax errors.
    *   **For The Spirit (Prose/Docs):** Set to `0.2 - 0.5`. This prevents the model from getting stuck in stylistic loops or overusing "AI-isms" (e.g., "delve", "tapestry").

### 2.3. The Temperature (The Chaos Factor)
*   **Parameter:** `temperature`
*   **The Doctrine:**
    *   **Strict Coding:** `0.0 - 0.2`. We desire deterministic, reproducible Truth.
    *   **Ideation/Design:** `0.7 - 0.9`. We desire novel connections and creative leaps.

### 2.4. The Civic Shield
*   **Parameter:** `enableEnhancedCivicAnswers`
*   **The Doctrine:** Always `true` where available. We operate within the bounds of safety and respect.

## 3. The Application
When the **Bridge** is crossed, the system must decide which "Mode" it is in.

| Mode | Model | Temperature | Thinking | Penalty |
| :--- | :--- | :--- | :--- | :--- |
| **Architect** | `gemini-2.0-flash-thinking` | `0.7` | `HIGH` | `0.0` |
| **Coder** | `gemini-2.0-flash-exp` | `0.1` | `OFF` | `0.0` |
| **Scribe** | `gemini-1.5-flash` | `0.3` | `OFF` | `0.2` |

*This Codex serves as the instruction set for the `Bridge` class.*
