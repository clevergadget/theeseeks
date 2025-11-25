import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export interface LibraryManifest {
  name: string;
  version: string;
  source: string;
  ingestedAt: string;
  hash: string;
  files: {
    rawPath: string;
    shadowPath: string;
    originalUrl?: string;
  }[];
}

export class Librarian {
  private static cultureDir = '.culture';
  private static externalDir = 'external';
  private static ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  static async ingest(source: string, name: string, version: string): Promise<void> {
    console.log(`Librarian: Ingesting ${name} ${version} from ${source}...`);

    // 1. Prepare Directories
    const libPath = path.join(process.cwd(), this.cultureDir, this.externalDir, name, version);
    const rawPath = path.join(libPath, 'raw');
    const shadowPath = path.join(libPath, 'shadow');

    if (!fs.existsSync(rawPath)) fs.mkdirSync(rawPath, { recursive: true });
    if (!fs.existsSync(shadowPath)) fs.mkdirSync(shadowPath, { recursive: true });

    // 2. Fetch Content (Basic implementation for single URL)
    let content = '';
    try {
        if (source.startsWith('http')) {
            const response = await fetch(source);
            if (!response.ok) throw new Error(`Failed to fetch ${source}: ${response.statusText}`);
            content = await response.text();
        } else {
            // Local file
            content = fs.readFileSync(source, 'utf-8');
        }
    } catch (error) {
        throw new Error(`Librarian failed to acquire source: ${error}`);
    }

    // 3. Save Raw (The Letter)
    const filename = 'index.html'; // Simplification for v1
    const rawFilePath = path.join(rawPath, filename);
    fs.writeFileSync(rawFilePath, content);

    // 4. Create Manifest
    const manifest: LibraryManifest = {
        name,
        version,
        source,
        ingestedAt: new Date().toISOString(),
        hash: crypto.createHash('sha256').update(content).digest('hex'),
        files: [{
            rawPath: path.relative(process.cwd(), rawFilePath),
            shadowPath: path.relative(process.cwd(), path.join(shadowPath, 'index.md')),
            originalUrl: source
        }]
    };

    fs.writeFileSync(path.join(libPath, 'manifest.json'), JSON.stringify(manifest, null, 2));

    console.log(`Librarian: Raw content preserved at ${rawFilePath}`);
    console.log(`Librarian: Manifest created.`);
    
    // 5. Trigger Shadowing (The Spirit)
    await this.summonScribes(content, shadowPath, source);
  }

  private static async summonScribes(rawContent: string, shadowDir: string, sourceUrl: string): Promise<void> {
      console.log("Librarian: Summoning the Scribes to analyze the text...");
      
      if (!process.env.GEMINI_API_KEY) {
          console.warn("Librarian: No API Key found. Scribes cannot work. Creating placeholder.");
          const shadowFile = path.join(shadowDir, 'index.md');
          const placeholder = `# Shadow: Index\n\n*The Scribes could not be summoned (No API Key).*\n\n## Raw Peek\n(Content pending)`;
          fs.writeFileSync(shadowFile, placeholder);
          return;
      }

      try {
        // Use the configured model or default to Flash for speed/cost
        const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp'; 
        console.log(`Librarian: Using model ${model}`);
        
        const prompt = `
            Role: You are The Librarian's Scribe.
            Task: Create a "Shadow Companion" for the provided documentation.
            
            The Shadow Companion is a map of the content, not a copy.
            
            Output Format (Markdown):
            # [Document Title]
            
            ## [Section Header]
            **Intent:** [One sentence: What is this section for?]
            **Peek:** [A compressed "Skeleton" of the code or key concepts. If it's a list of errors, summarize. If it's a function, show the signature.]
            **Pointer:** [Reference to the approximate location in the raw text, e.g., "Start of file", "Middle", "End" or specific headers]
            
            Rules:
            1. Do not reproduce the full text.
            2. Focus on "The Spirit" (Intent) and "The Skeleton" (Code Signatures/Structure).
            3. Be concise.
            
            Input Document:
            ${rawContent}
        `;
        
        console.log("Librarian: Sending request to Gemini...");
        const response = await this.ai.models.generateContent({
            model: model,
            contents: prompt
        });
        console.log("Librarian: Received response from Scribe.");

        const shadowContent = response.text;
        if (!shadowContent) throw new Error("Scribe returned empty scroll.");

        const shadowFile = path.join(shadowDir, 'index.md');
        fs.writeFileSync(shadowFile, shadowContent);
        console.log(`Librarian: Scribe has finished. Shadow preserved at ${shadowFile}`);

      } catch (error) {
          console.error(`Librarian: The Scribes failed: ${error}`);
          const shadowFile = path.join(shadowDir, 'index.md');
          const placeholder = `# Shadow: Index\n\n*The Scribes failed during the ritual.*\nError: ${error}`;
          fs.writeFileSync(shadowFile, placeholder);
      }
  }
}
