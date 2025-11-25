# Design Doc 001: The Librarian (External Knowledge Ingestion)

**Status:** Draft
**Date:** November 25, 2025
**Driver:** The Need for Absolute Truth in Context

## 1. The Problem
We rely on external libraries (specifically the Google GenAI SDK) to build `theeseeks`. If the Advisor (AI) hallucinates the API surface, the code it generates is poison.
We cannot rely on the AI's training data (which is cut off in the past) nor on ephemeral web searches (which are unstable).
We need **Immutable, Versioned, Local Truth**.

## 2. The Concept: The Librarian
We introduce a new role/module: **The Librarian**.
The Librarian's job is to ingest external knowledge, freeze it in time (The Letter), and then interpret it for the Advisor (The Spirit & Skeleton).

## 3. The Architecture

### 3.1. The Guild (Hierarchical Intelligence)
To honor **Mercy** (cost/efficiency) and **Grace** (quality), we employ a multi-model strategy:

*   **The Architect (Gemini 3 Pro):**
    *   **Role:** Governance & Strategy.
    *   **Task:** Analyzes the document structure, decides *how* to chunk it, and resolves ambiguities. It sets the "Cultural Prompt" for the Scribes.
*   **The Scribes (Gemini Flash):**
    *   **Role:** Labor & Speed.
    *   **Task:** The atomic work. They take a specific section defined by the Architect, read the Raw text, and generate the Shadow Companion (Summary + Skeleton).
    *   **Constraint:** They are "Culturally Encoded" via system instructions to ensure they extract the *Spirit*, not just the syntax.

### 3.2. The Protocol of Escalation (Procedural Consent)
We operationalize the **Dignity of Consent** for our agents:

*   **The Right of Refusal:** If a Scribe encounters a section that is too dense, ambiguous, or culturally complex, it is programmed to return a `STATUS: OVERLOAD` signal instead of hallucinating a poor summary.
*   **The Escalation:** The Architect monitors for this signal. Upon receiving it, the Architect steps in to process that specific chunk itself, applying its superior reasoning capabilities.
*   **The Audit (The Mirror):** The Architect performs a statistical sample (e.g., 5-10%) of the Scribes' completed work. If the "Spirit" is found lacking, the Architect may trigger a re-processing of that batch.

### 3.3. The Stacks (Storage)
We will expand the `.culture` directory to include a formal library structure:

```
.culture/
  ├── external/
  │   ├── google-genai/
  │   │   ├── v1.0.0/              <-- Versioned Snapshot
  │   │   │   ├── raw/             <-- The Immutable Letter
  │   │   │   │   ├── quickstart.html
  │   │   │   │   └── reference.html
  │   │   │   ├── shadow/          <-- The Spirit & Skeleton
  │   │   │   │   ├── quickstart.md
  │   │   │   │   └── reference.md
  │   │   │   └── manifest.json    <-- Metadata (Source URL, Date, Hash)
```

### 3.4. The Workflow (The Ritual of Ingestion)

1.  **Acquisition:**
    *   User provides a URL (e.g., `https://ai.google.dev/gemini-api/docs`) or a local file path.
    *   The Librarian downloads the content.
    *   It saves the **Raw** content into the `raw/` folder. This file is *never* touched again.

2.  **The Shadowing (Semantic Chunking):**
    *   The Librarian analyzes the Raw file.
    *   Instead of arbitrary "50 lines," it identifies **Semantic Sections** (Headers, Code Blocks, Logical Units).
    *   It generates a **Shadow Companion** in the `shadow/` folder.

3.  **The Peek (The Index):**
    *   The Shadow Companion is not a copy. It is a **Map**.
    *   For each section in the Raw file, the Shadow contains:
        *   **The Header:** Title of the section.
        *   **The Peek:** A compressed "Skeleton" (key signatures, critical warnings).
        *   **The Pointer:** A reference to the line numbers in the Raw file (e.g., `Lines 100-150`).

## 4. The "Peek" Logic (Semantic Rounding)
The user specified: *"Adding a new companion section for each peek rounding up in size to cover lengths of sections."*

**Algorithm:**
1.  Parse the Raw Document (HTML/Markdown).
2.  Identify H1, H2, H3 tags as "Section Boundaries."
3.  For each Section:
    *   Extract the **Intent** (What is this section for?).
    *   Extract the **Code** (The Skeleton).
    *   If the section is huge (e.g., a list of 100 error codes), the Peek summarizes it ("List of Error Codes 400-500").
    *   If the section is dense (e.g., a critical function definition), the Peek preserves the Signature.

## 5. Usage in `seeks ask`
When the Seeker asks: *"How do I use streaming?"*
1.  The Librarian searches the **Shadows** (The Spirit).
2.  It finds the match in `shadow/google-genai/v1/text_generation.md`.
3.  It reads the **Peek** for that section.
4.  (Optional) If the Peek is insufficient, it follows the **Pointer** to read the specific lines from the **Raw** file.

## 6. Next Steps
1.  Build the `ingest` command (`seeks ingest <url>`).
2.  Implement the "Semantic Chunker" (likely using Gemini to parse the structure initially).
3.  Define the JSON schema for the `manifest.json`.
