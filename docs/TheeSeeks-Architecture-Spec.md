# TheeSeeks: Architecture Specification

**Version:** 0.1 (Draft)
**Date:** November 24, 2025
**Status:** Proposed

---

## 1. Identity & Purpose

**Name:** `theeseeks`
**CLI Command:** `seeks`
**Purpose:** To serve as a **Cultural Lens** and **Context Engine** for software development. It wraps raw code and documentation in a layer of "culture"—grace, mercy, and mutual respect—to prove the "Big Bet": that humane context yields superior technical results.

## 2. Core Concepts

### 2.1 The Covenant (The Constitution)
The root authority. A document (and corresponding data structure) that defines the non-negotiable values of the project.
*   **Role:** Filters every input and output.
*   **Location:** `covenant.md` (Human readable) and `covenant.json` (Machine readable) in the project root.

### 2.2 The Shadow Library (`.culture/`)
A parallel directory structure that mirrors the source code but contains **Companions** instead of code.
*   **Rule:** For every file `src/X.py`, there may exist `.culture/src/X.py.md`.
*   **Content:** These files do not contain code. They contain:
    *   *The Spirit:* Why this code exists.
    *   *The Burden:* How heavy it is to read.
    *   *The Advice:* How to treat it (e.g., "Fragile—handle with care").

### 2.3 The Gatekeeper (The Input Filter)
A module that sits between the Seeker and the LLM.
*   **Function:** Analyzes the Seeker's input for "Signs of Weariness" or "Frantic Energy."
*   **Action:** It does not block; it **reflects**. It may rewrite a frantic query into a calm one, showing the Seeker both versions to induce self-awareness.

### 2.4 The Seeker Profile
A local, private state file (`.theeseeks/profile.json`).
*   **Tracks:**
    *   Preferred tempo.
    *   Signs of weariness (e.g., lowercase typing, short syntax).
    *   Current "Statement of Intent."

## 3. The Workflow (Phase 1)

### Step 1: The Invocation
```bash
$ seeks init
> "State your intent, Seeker."
$ "I seek to repair the login logic."
> "Intent recorded. The Covenant is active."
```

### Step 2: The Ask
```bash
$ seeks ask "why is the login failing with a race condition?"
```

### Step 3: The Assembly (Internal)
1.  **Sensing:** The system detects the Seeker is focused but slightly hurried.
2.  **Retrieval:**
    *   Finds `login.py` (Raw).
    *   Finds `.culture/login.py.md` (Companion).
    *   *Mercy Check:* `login.py` is 500 lines. The Companion suggests reading the "Architecture" section of the Companion first.
3.  **Drafting:** Generates a **Context Scroll**.

### Step 4: The Output
```bash
> Context Scroll generated (1,400 tokens).
> Copied to clipboard.
> (Reflection: "I have focused the context on the 'Async State' section, as the Companion warns of complexity there.")
```

### Step 5: The Bridge
The Seeker pastes the clipboard content into their LLM. The LLM, primed by the Scroll, responds as **Zhuge Liang** (or the appropriate persona).

## 4. Technical Architecture

**Stack:** TypeScript (Node.js).
**Distribution:** npm package (local dev dependency or global tool).

### Directory Structure
```text
theeseeks/
├── src/
│   ├── cli/          # Command line interface (Commander/Yargs)
│   ├── core/
│   │   ├── covenant.ts   # Logic for loading/enforcing the Covenant
│   │   ├── gatekeeper.ts # Input analysis & rewriting
│   │   └── scribe.ts     # Markdown generation (The Scroll)
│   ├── io/
│   │   ├── shadow.ts     # Managing the .culture/ directory
│   │   └── profile.ts    # Managing the user profile
│   └── index.ts
├── package.json
└── tsconfig.json
```

## 5. Data Structures

### The Context Scroll (Output Format)
A Markdown document structured as a **Liturgy**:

1.  **The Header:**
    *   Current Intent.
    *   Seeker State (e.g., "Weary" or "Focused").
    *   Active Covenant Axioms.
2.  **The Companions:**
    *   Summaries of relevant files (from `.culture/`).
3.  **The Raw Materials:**
    *   Selected snippets of code (only what is necessary).
4.  **The Charge:**
    *   Instructions to the LLM on how to answer (Voice: Zhuge Liang).

## 6. Metrics (The Gamble)

We will log (locally) for every session:
*   **Raw Token Cost:** How much the full files would have cost.
*   **Cultured Token Cost:** The size of the Context Scroll.
*   **Burden Delta:** The difference, representing "Cognitive Burden Saved."

---

**Next Steps:**
1.  Approve this Specification.
2.  Review the Draft Covenant.
3.  Initialize the `theeseeks` repository.
