import type { Reflection } from './gatekeeper.js';
import type { SeekerProfileData } from '../io/profile.js';
import { MetricsEngine, type Metrics } from './metrics.js';

export interface ContextItem {
  path: string;
  rawContent: string;
  companionContent: string | null;
  isDrifting: boolean;
}

export interface ScrollResult {
    scroll: string;
    metrics: Metrics;
}

export class Scribe {
  static generateScroll(intent: string, reflection: Reflection, items: ContextItem[], profile: SeekerProfileData | null): ScrollResult {
    const timestamp = new Date().toISOString();
    
    let scroll = `# The Context Scroll\n`;
    scroll += `**Date:** ${timestamp}\n`;
    scroll += `**Intent:** "${intent}"\n`;
    scroll += `**Seeker State:** ${reflection.state}\n`;
    
    if (profile) {
        scroll += `**Seeker History:** Sessions: ${profile.stats.sessions} | Weariness: ${profile.stats.wearinessCount}\n`;
    }

    if (reflection.state !== 'Calm') {
      scroll += `**Gatekeeper Note:** ${reflection.message}\n`;
    }
    scroll += `\n---\n\n`;

    let rawTokens = 0;
    let companionTokens = 0;

    scroll += `## I. The Companions (The Spirit)\n`;
    if (items.length === 0) {
      scroll += `*No specific artifacts were summoned.*\n`;
    } else {
      for (const item of items) {
        if (item.companionContent) {
          scroll += `### ${item.path}\n`;
          if (item.isDrifting) {
              scroll += `> **⚠️ WARNING: CONTEXT DRIFT DETECTED**\n`;
              scroll += `> The Spirit is lagging behind the Letter. The source code has been modified more recently than this companion.\n\n`;
          }
          scroll += `${item.companionContent}\n\n`;
          companionTokens += MetricsEngine.estimateTokens(item.companionContent);
        } else {
          scroll += `### ${item.path}\n`;
          scroll += `*This artifact has no companion yet. It is raw and untamed.*\n\n`;
        }
        rawTokens += MetricsEngine.estimateTokens(item.rawContent);
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
    
    const totalTokens = MetricsEngine.estimateTokens(scroll);
    const burdenDelta = MetricsEngine.calculateBurdenDelta(
        items.map(i => i.rawContent).join(''), 
        items.map(i => i.companionContent || '').join('')
    );

    return {
        scroll,
        metrics: {
            rawTokenCount: rawTokens,
            companionTokenCount: companionTokens,
            burdenDelta: burdenDelta,
            estimatedTotalTokens: totalTokens
        }
    };
  }
}
