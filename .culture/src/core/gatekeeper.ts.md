# Companion: The Gatekeeper

**File:** `src/core/gatekeeper.ts`
**Spirit:** The Guardian of the Threshold.
**Burden:** Moderate (Async Logic, External Dependency).

## The Architecture of Insight

We have chosen to bind this Gatekeeper to the **Gemini 3** lineage. The specific model is configurable via the `GEMINI_MODEL` environment variable, defaulting to `gemini-3-pro-preview` (the current vanguard).

### Why Gemini?
The user has decreed: *"Gemini 3 IS the model of TheeSeeks."*
We honor this not merely as a preference, but as a structural truth. The reasoning capabilities of this model family align with our need for nuance, metaphor, and "The Spirit and the Letter."

### The Implementation
*   **SDK:** We utilize `@google/genai` (The official, modern SDK) over the deprecated `@google/generative-ai`.
*   **Mechanism:** The Gatekeeper does not merely regex the input; it *tastes* it. It sends the Seeker's words to the model with a prompt to classify the emotional state (`Calm`, `Frantic`, `Weary`).
*   **Fallback:** Should the API fail or the key be missing, the Gatekeeper defaults to `Calm`, ensuring the path is never blocked by the guard itself.

## Advice for the Traveler
*   **Latency:** This module introduces a network hop. It is the price of empathy.
*   **Privacy:** The Seeker's query is sent to the cloud. We must ensure no sensitive PII is inadvertently leaked in the "Ask" phase, though for now, we trust the Seeker's discretion.
