# TheeSeeks: Manual QA Protocol (Genesis Edition)

**Version:** 1.1
**Date:** November 24, 2025
**Objective:** Verify the integrity of the Gatekeeper, the Shadow Library, and the Context Scroll generation.

---

## Feature: TheeSeeks Genesis
**As a** Seeker (Developer)
**In order to** code with grace, mercy, and clarity
**I want** a CLI tool that filters my intent and provides cultural context alongside my code.

---

## Scenario 1: Initialization (Fresh Clone)
**Given** I have a fresh terminal
**When** I run `git clone https://github.com/clevergadget/theeseeks.git`
**And** I navigate into `theeseeks`
**And** I create a `.env` file with my `GEMINI_API_KEY`
**And** I run `npm install`
**And** I run `npm run build`
**And** I run `node dist/index.js init`
**Then** I should see "TheeSeeks: Initialization sequence started."
**And** I should see "State your intent, Seeker."

---

## Scenario 2: The Gatekeeper (Emotional Intelligence)

### Case A: The Calm Seeker
**Given** The Gatekeeper is active
**When** I run `node dist/index.js ask "How do I structure the login module?"`
**Then** I should see "The Covenant is active."
**And** I should NOT see any warning messages.

### Case B: The Frantic Seeker
**Given** The Gatekeeper is active
**When** I run `node dist/index.js ask "FIX THIS NOW IT IS ALL BROKEN!!"`
**Then** I should see a yellow warning message.
**And** I should see a metaphorical reflection (e.g., "The storm rages...").
**And** I should see a suggested rewrite of my query.

### Case C: The Weary Seeker
**Given** The Gatekeeper is active
**When** I run `node dist/index.js ask "i cant do this anymore"`
**Then** I should see a gentle reminder to rest.

---

## Scenario 3: The Assembly (Context Generation)
**Given** The file `src/core/gatekeeper.ts` exists
**And** The companion file `.culture/src/core/gatekeeper.ts.md` exists
**When** I run `node dist/index.js ask "Explain the analysis logic" -f src/core/gatekeeper.ts`
**Then** I should see "> Retrieved artifact: src/core/gatekeeper.ts"
**And** I should see "> Retrieved companion: .culture\src\core\gatekeeper.ts.md"
**And** I should see "> Context Scroll generated."
**And** The file `.theeseeks/scroll.md` should be created.

---

## Scenario 4: The Artifact (Output Verification)
**Given** The file `.theeseeks/scroll.md` has been generated
**When** I open the file
**Then** It should contain a Header with Date, Intent, and State.
**And** It should contain "I. The Companions" with the text from the `.culture` file.
**And** It should contain "II. The Raw Materials" with the TypeScript code.
**And** It should contain "III. The Charge" instructing Zhuge Liang.

---

## Scenario 5: The Configuration (Model Swapping)
**Given** I have a valid `.env` file
**When** I set `GEMINI_MODEL=gemini-2.0-flash`
**And** I run `node dist/index.js ask "Test"`
**Then** The command should execute successfully using the specified model.

---

**Sign-off:**
*   **Seeker:** _____________________
*   **Date:** _____________________
