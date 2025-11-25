import type { Reflection } from './gatekeeper.js';

export interface ContextItem {
  path: string;
  rawContent: string;
  companionContent: string | null;
}

export class Scribe {
  static generateScroll(intent: string, reflection: Reflection, items: ContextItem[]): string {
    const timestamp = new Date().toISOString();
    
    let scroll = `# The Context Scroll\n`;
    scroll += `**Date:** ${timestamp}\n`;
    scroll += `**Intent:** "${intent}"\n`;
    scroll += `**Seeker State:** ${reflection.state}\n`;
    if (reflection.state !== 'Calm') {
      scroll += `**Gatekeeper Note:** ${reflection.message}\n`;
    }
    scroll += `\n---\n\n`;

    scroll += `## I. The Companions (The Spirit)\n`;
    if (items.length === 0) {
      scroll += `*No specific artifacts were summoned.*\n`;
    } else {
      for (const item of items) {
        if (item.companionContent) {
          scroll += `### ${item.path}\n`;
          scroll += `${item.companionContent}\n\n`;
        } else {
          scroll += `### ${item.path}\n`;
          scroll += `*This artifact has no companion yet. It is raw and untamed.*\n\n`;
        }
      }
    }

    scroll += `## II. The Raw Materials (The Letter)\n`;
    for (const item of items) {
      scroll += `### ${item.path}\n`;
      scroll += "```typescript\n"; // TODO: Detect language
      scroll += item.rawContent;
      scroll += "\n```\n\n";
    }

    scroll += `## III. The Charge\n`;
    scroll += `Advisor (Zhuge Liang), you are summoned. The Seeker is ${reflection.state}. \n`;
    scroll += `Answer their intent with grace. Use the Companions to guide your understanding of the Raw code.\n`;
    
    return scroll;
  }
}
