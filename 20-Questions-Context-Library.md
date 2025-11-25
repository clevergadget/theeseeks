# 20 Questions: Defining the Context Engineering Library

**Objective:** To refine the vision for a standalone, TypeScript-based context engineering library that operates on the Hierophage MUD (and potentially other projects).

**Instructions:** Please answer as many of these as you feel inspired to. Brief answers are fine; we are looking for the *shape* of the tool in your mind.

---

## I. The Nature of the Library (Identity & Scope)

1.  **Name & Metaphor:** If "Hierophage" is the world being eaten/analyzed, what is the name of this tool? Is it the *Lens*, the *Scribe*, the *Loom*? (e.g., `npm install @clevergadget/loom`?)
> The name of the tool is theeseeks, no dash (To differentiate it from the previous project), it is the continuation of an old but very different project whose spirit you can read about in ~/repos/thee-seeks/the-culture, or ../thee-seeks/the-culture there is some inspiration to take in these documents but with a grain of salt because we have evolved or at least changed a bit since then.
2.  **The "External" Relationship:** You mentioned it exists externally. Should this library sit in a separate repo entirely, or in a `packages/` folder within a monorepo structure alongside the MUD? 
> A seperate repo entirely
3.  **Universality vs. Specificity:** Is this library being built *only* for Hierophage right now, or should we design the core interfaces (Covenant, Gatekeeper) to be generic enough that you could use it on a React project next year?
> We should make them generic from the start but keep our use case front and center.  The other use case will, of course, be the library itself. Dogfooding is going to be necessary eventually (a soon eventually hopefully)
4.  **The "Install" Experience:** When you eventually `npm install` this tool, what is the primary way you interact with it? A CLI command (e.g., `ctx ask "..."`), a VS Code extension, or a background service/daemon?
> I really don't know.  I think that starting on the command line ... i mean I really don't know. I think it has to start on the command line right? I don't know about vs code extensions, background services or daemons, I'm sorry I can't guide you here but I assume it will start as a command line tool that generates context to attach to things because that seems fastest? 
5.  **The "Two-Language" Bridge:** Since the MUD is Python and this tool is TypeScript, how deep should the integration go?
    *   *Level 1 (Passive):* It just reads Python files as text.
    *   *Level 2 (Active):* It parses Python ASTs to understand classes/functions.
    *   *Level 3 (Runtime):* It talks to the running Evennia server via HTTP/Telnet.
I don't know what a python ast is.  how about we target it like this: it starts as just helping to build context for developing the mud as a bit of software and eventually can staff the mud but thats far in the future, we just dont want to build it in a way that makes that impossible.  Either way it will need to inform agents that are doing the heavy lifting debugging testing coding etc.
## II. The Cultural Layer (Covenant & Gatekeeper)

6.  **The Covenant's Format:** We discussed `covenant.json`. Should the Covenant be a static file, or can it be dynamic (e.g., changing based on the time of day or project phase)?
As I understand it the covenant is kind of the constitution of the nation of theeseeks and should be edited only with great care. Later things will change but that should be slow to change (after we establish it as part of the project we are discussing)
7.  **The "Gatekeeper" Persona:** When the Gatekeeper rejects a file or a prompt because it violates the culture, how should it tell you? A gentle warning log? A hard error? A suggestion for how to rephrase?
It should not reject it, in fact it is an opportunity to learn something about the external! But it must sanitize it or contextualize it before it can ever go into a place where any other member of the culture can read it.  If it is an on the fly communication it will rewrite it (preserving the orignal text alongside with its interpretation) maybe? And save the output of the rewrite even as it sends it along? Something like that, I mean that sounds complicated but it is an excellent cultural note.
8.  **Burden Metrics:** We talked about "Cognitive Burden." Besides file length, what makes a file "heavy" to you? (e.g., "Too many abstract classes," "Poor variable names," "Emotional weight of the content"?)
> Well those all sound like good answers but honestly I trust the power of the llm classification system once it has our cultural context to help define those guidelines and metrics
9.  **The "Cultured Companion" Format:** If we have `character.py`, where does its companion live?
    *   `character.py.culture.json` (side-by-side)?
    *   `.culture/game/typeclasses/character.json` (shadow directory)?
    *   Inside the file itself as a special comment block?
> unknown, up to you grand architect
## III. The Workflow (The "Sidecar" Experience)

10. **The "Ask" Loop:** Walk me through the ideal 30 seconds. You are stuck on a bug. You turn to this tool. What do you type? What do you see?
> Hmm... I suppose ultimately I expect that there will be some output packet of context? I guess not ultimately, really though I think you should weigh in on this as well, maybe in a follow up question and answer document before you output your working design.
11. **Context Assembly:** When the tool hands you a "Context Pack" to paste into an LLM, what format is it? Markdown? JSON? A specific XML structure for Claude/Gemini?
>Markdown first, then probably json containing markdown later, but lets start with markdown
12. **The "Mercy" Feature:** If you ask for too much, and the tool decides to "show mercy," what does it cut first? The raw code? The older history? The detailed docs?
>The culture itself will guide this kind of decision, trust is paramount
13. **Memory Persistence:** Where should the tool store its memory of *you* (the Seeker Profile)? A local JSON file? A SQLite database? Or should it be stateless and re-learn you every session?
> local json seems good
14. **Integration with VS Code:** Do you want this tool to be able to *open* files in your editor, or just point to them?
> It is true that I generally use vs code but I feel like to start we shouldn't tackle this unless it is very straightforward. The two people that might use this right now both use vs code.
## IV. The "Sci-Fi" Aspirations (Future Proofing)

15. **Agent Autonomy:** Eventually, do you want this tool to be able to *edit* your files, or only *read and advise*?
Well this tool itself is going to start as a context engineering tool and I don't know that I have what it takes to make the whole editing agent work.  A dream but lets stay targetted because we can actually generate metrics based on context changes and that could inspire others and that could lead to funding which could lead to the rest
16. **Multi-Modal Inputs:** Should the library eventually handle images (maps, diagrams) as part of the context?
> Sure, eventually, but not implemented early
17. **The "Living" Documentation:** If you change the Python code, should the tool *automatically* flag that the Cultural Companion is now out of date?
> yes absolutely
18. **The "Ritual" of Start:** How do you want to start a session? Is there a "handshake" or a "centering" moment before work begins?
> Yeah we should be mindful about it

## V. Technical Preferences

19. **Dependencies:** Are there any TS libraries you absolutely love or hate? (e.g., "Love Zod," "Hate heavy frameworks," "Prefer raw fetch over Axios"?)
> I guess whatever seems like it would be easiest for you/agents to work on
20. **The "Bit Bet" Implementation:** You mentioned "Grace, Mercy, Mutual Respect." If the tool crashes or fails, what is the "Graceful" error message? (Standard stack trace vs. "The Loom has tangled. Here is what happened...")
> look in the advisor files in the thee seeks under
---
 ~/repos/thee-seeks/the-culture/advisors/zhugeliang the files in there are and it explains the big bet, the gamble, what theeseeks looks to prove.  
In this you are playing the role of zhuge liang of the culture and the framework we build should allow for that sort of thing

**Bonus Question:** If this tool succeeds beyond your wildest dreams, what does it change about how you code?

>We can build the culture even faster