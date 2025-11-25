# TheeSeeks Quality Assurance Protocol (v1.0)

**Project:** TheeSeeks Context Engineering Engine
**Version:** 1.0.0
**Date:** November 25, 2025
**Status:** Active / Release Candidate

---

## 1. Environment Prerequisites
Before beginning the QA process, ensure the test environment meets the following criteria:

*   **Runtime:** Node.js (v18 or higher recommended).
*   **Package Manager:** npm.
*   **API Access:** A valid Google Gemini API Key.
*   **Terminal:** Bash or PowerShell.

## 2. Installation & Build Verification

### 2.1. Repository Setup
1.  Clone the repository.
2.  Run `npm install` to install dependencies (`commander`, `chalk`, `@google/genai`, `dotenv`).
3.  **Validation:** Ensure `node_modules` folder is created and no critical errors occur during installation.

### 2.2. Compilation
1.  Run `npm run build`.
2.  **Validation:** Ensure the `dist/` directory is created and contains compiled `.js` files (specifically `dist/index.js`).
3.  **Validation:** Ensure no TypeScript compilation errors are reported in the terminal.

### 2.3. Configuration
1.  Create a `.env` file in the project root.
2.  Add `GEMINI_API_KEY=your_api_key_here`.
3.  (Optional) Add `GEMINI_MODEL=gemini-3-pro-preview`.
4.  **Validation:** Ensure the application can read this file (verified in Section 4).

---

## 3. Core Functionality Testing

### 3.1. Initialization (`init`)
**Command:** `node dist/index.js init`
**Expected Behavior:**
1.  Console output confirms initialization sequence.
2.  **Artifact Check:** A `.theeseeks/` directory is created in the root.
3.  **Artifact Check:** A `.theeseeks/profile.json` file is created with default values (State: 'Calm', Sessions: 0).
4.  **Artifact Check:** A `.culture/` directory is created (if it didn't exist).

### 3.2. Sentiment Analysis ("The Gatekeeper")
**Command:** `node dist/index.js ask "Explain the architecture"`
**Expected Behavior:**
1.  The system pauses briefly to analyze intent.
2.  If the input is neutral/professional, it proceeds without warning.
3.  **Validation (Negative Test):** Run `node dist/index.js ask "I AM ANGRY AND THIS IS BROKEN FIX IT NOW"`
    *   The system should output a yellow warning message regarding the user's state ("Frantic").
    *   It should offer a suggested rephrasing.
    *   It should update `.theeseeks/profile.json` incrementing `franticCount`.

### 3.3. Context Retrieval & Shadow Library
**Pre-requisite:** Ensure a file exists at `src/index.ts` and a companion exists at `.culture/src/index.ts.md`.
**Command:** `node dist/index.js ask "How does the entry point work?" -f src/index.ts`
**Expected Behavior:**
1.  Console output confirms retrieval of artifact: `src/index.ts`.
2.  Console output confirms retrieval of companion: `.culture/src/index.ts.md`.
3.  **Artifact Check:** Open `.theeseeks/scroll.md`.
    *   Verify Section I contains the content of `.culture/src/index.ts.md`.
    *   Verify Section II contains the raw code of `src/index.ts`.

### 3.4. Drift Detection
**Test Steps:**
1.  Modify `src/index.ts` (add a comment or change a line) and save it.
2.  Ensure `.culture/src/index.ts.md` remains untouched (making it older than the source).
3.  Run: `node dist/index.js ask "Check for drift" -f src/index.ts`
**Expected Behavior:**
1.  Console output displays a yellow warning: `⚠️ Drift Detected: Companion is older than Source.`
2.  **Artifact Check:** Open `.theeseeks/scroll.md`.
    *   Verify that a warning block ("WARNING: CONTEXT DRIFT DETECTED") is inserted before the companion text.

### 3.5. The Ritual of the Seal (Consent & Metrics)
**Command:** `node dist/index.js ask "Test query"`
**Expected Behavior:**
1.  The system generates the Scroll.
2.  The system displays **[The Ritual of the Seal]**.
3.  **Metric Check:** It displays "Weight: ~X tokens."
4.  **Metric Check:** If a companion was used, it displays "Burden Lifted: ~Y tokens saved."
5.  **Prompt:** It asks "Do you consent to cast this across the Bridge? (Y/n)".

**Branch A (Refusal):**
1.  Type `n` and Enter.
2.  System outputs "The Scroll is sealed but not sent."
3.  No API call is made.

**Branch B (Consent):**
1.  Type `y` and Enter.
2.  System outputs "The Bridge opens..."
3.  Proceeds to Section 3.6.

### 3.6. The Bridge (API Integration)
**Pre-requisite:** Valid API Key in `.env`.
**Action:** Consent to the request in Step 3.5.
**Expected Behavior:**
1.  The system connects to the Google Gemini API.
2.  Console displays "The Advisor speaks:".
3.  The LLM response is streamed/printed to the console.
4.  The response should be relevant to the query and context provided.

### 3.7. Resonance (Feedback Loop)
**Action:** After the Advisor speaks (Step 3.6).
**Expected Behavior:**
1.  System prompts: "How did this resonate? (1-5, Enter to skip)".
2.  **Input:** Type `5` and Enter.
3.  System confirms: "Resonance recorded."
4.  **Data Validation:** Check `.theeseeks/profile.json`.
    *   `stats.resonanceSum` should increase by 5.
    *   `stats.resonanceCount` should increase by 1.
    *   `stats.totalTokensEstimated` should reflect the recent transaction.

---

## 4. Artifact Validation Summary

| Artifact | Location | Purpose | Validation Criteria |
| :--- | :--- | :--- | :--- |
| **Profile** | `.theeseeks/profile.json` | User State & Metrics | Valid JSON; updates after sessions. |
| **Scroll** | `.theeseeks/scroll.md` | The Prompt Context | Contains Date, Intent, Companions, Code. |
| **Shadow** | `.culture/**/*.md` | Semantic Documentation | Matches source file structure. |

## 5. Known Limitations (v1.0)
*   **Single File Context:** The `-f` flag currently accepts only one file path.
*   **Token Estimation:** Uses a heuristic (char/4) rather than a precise tokenizer.
*   **Language Support:** Syntax highlighting in the Scroll defaults to TypeScript/Generic; auto-detection is pending.

---

**Tester Signature:** __________________________
**Date:** __________________________
