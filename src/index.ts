#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Gatekeeper } from './core/gatekeeper.js';
import { Shadow } from './io/shadow.js';
import { SeekerProfile } from './io/profile.js';
import { Scribe, type ContextItem } from './core/scribe.js';
import { Bridge } from './core/bridge.js';
import { Librarian } from './core/librarian.js';

const program = new Command();

function askConsent(question: string): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.toLowerCase() !== 'n');
        });
    });
}

function askResonance(): Promise<number | null> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(chalk.white('\nHow did this resonate? (1-5, Enter to skip): '), (answer) => {
            rl.close();
            const score = parseInt(answer);
            if (!isNaN(score) && score >= 1 && score <= 5) {
                resolve(score);
            } else {
                resolve(null);
            }
        });
    });
}

program
  .name('seeks')
  .description('TheeSeeks: A Cultural Lens and Context Engine for Software Development')
  .version('0.1.0');

program.command('init')
  .description('Initialize the Covenant and the Shadow Library')
  .action(() => {
    console.log(chalk.blue('TheeSeeks: Initialization sequence started.'));
    SeekerProfile.init();
    console.log(chalk.green('State your intent, Seeker.'));
  });

program.command('ingest')
  .argument('<source>', 'URL or file path to ingest')
  .argument('<name>', 'Name of the library (e.g., google-genai)')
  .argument('<version>', 'Version string (e.g., v1.0.0)')
  .description('Ingest external documentation into the Shadow Library')
  .action(async (source, name, version) => {
      try {
          await Librarian.ingest(source, name, version);
          console.log(chalk.green(`\n> Ingestion complete for ${name} ${version}.`));
      } catch (error) {
          console.error(chalk.red(`\n> Ingestion failed: ${error}`));
      }
  });

program.command('ask')
  .argument('<query>', 'The question you seek to answer')
  .option('-f, --file <path>', 'Specific file to include context for')
  .description('Ask a question to the Advisor')
  .action(async (query, options) => {
    // Load Profile
    let profile = SeekerProfile.load();
    if (!profile) {
        SeekerProfile.init();
        profile = SeekerProfile.load();
    }

    const reflection = await Gatekeeper.analyze(query);

    // Update Profile Stats
    if (profile) {
        profile.stats.sessions++;
        if (reflection.state === 'Frantic') profile.stats.franticCount++;
        if (reflection.state === 'Weary') profile.stats.wearinessCount++;
        profile.state = reflection.state;
        SeekerProfile.save(profile);
    }

    if (reflection.state !== 'Calm') {
      console.log(chalk.yellow(`\n(The Gatekeeper steps forward)`));
      console.log(chalk.yellow(`"${reflection.message}"`));
      if (reflection.suggestion) {
        console.log(chalk.dim(`\nPerhaps you meant:\n"${reflection.suggestion}"`));
      }
      console.log(chalk.dim('\n-----------------------------------\n'));
    }

    console.log(chalk.blue(`The Covenant is active. You ask: "${query}"`));
    
    // Assembly
    const items: ContextItem[] = [];
    if (options.file) {
        try {
            const rawContent = fs.readFileSync(options.file, 'utf-8');
            const companionContent = Shadow.read(options.file);
            const isDrifting = Shadow.isDrifting(options.file);
            
            items.push({
                path: options.file,
                rawContent,
                companionContent,
                isDrifting
            });
            console.log(chalk.dim(`> Retrieved artifact: ${options.file}`));
            if (companionContent) {
                console.log(chalk.dim(`> Retrieved companion: ${Shadow.getCompanionPath(options.file)}`));
                if (isDrifting) {
                    console.log(chalk.yellow(`> ⚠️  Drift Detected: Companion is older than Source.`));
                }
            }
        } catch (err) {
            console.error(chalk.red(`Could not read file: ${options.file}`));
        }
    }

    // Scribe
    const { scroll, metrics } = Scribe.generateScroll(query, reflection, items, profile);
    
    // Output to file
    const outputDir = path.join(process.cwd(), '.theeseeks');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, 'scroll.md');
    fs.writeFileSync(outputPath, scroll);

    console.log(chalk.green(`\n> Context Scroll generated.`));
    console.log(chalk.dim(`> Artifact saved to: ${outputPath}`));
    console.log(chalk.dim('-----------------------------------'));
    console.log(scroll);
    console.log(chalk.dim('-----------------------------------'));

    // The Ritual of the Seal
    console.log(chalk.cyan(`\n[The Ritual of the Seal]`));
    console.log(chalk.cyan(`Weight: ~${metrics.estimatedTotalTokens} tokens.`));
    if (metrics.burdenDelta > 0) {
        console.log(chalk.green(`Burden Lifted: ~${metrics.burdenDelta} tokens saved by the Shadow Library.`));
    }
    
    const consented = await askConsent(chalk.white('Do you consent to cast this across the Bridge? (Y/n) '));
    
    if (!consented) {
        console.log(chalk.yellow('\nThe Scroll is sealed but not sent. It remains in .theeseeks/scroll.md'));
        return;
    }

    // Update Profile Stats with Metrics
    if (profile) {
        profile.stats.tokensSaved = (profile.stats.tokensSaved || 0) + metrics.burdenDelta;
        profile.stats.totalTokensEstimated = (profile.stats.totalTokensEstimated || 0) + metrics.estimatedTotalTokens;
        SeekerProfile.save(profile);
    }

    console.log(chalk.blue('\nThe Bridge opens...'));
    try {
        const response = await Bridge.cross(scroll);
        console.log(chalk.green('\nThe Advisor speaks:\n'));
        console.log(response);

        // The Resonance (Phase 4)
        const resonance = await askResonance();
        if (resonance !== null && profile) {
            profile.stats.resonanceSum = (profile.stats.resonanceSum || 0) + resonance;
            profile.stats.resonanceCount = (profile.stats.resonanceCount || 0) + 1;
            SeekerProfile.save(profile);
            console.log(chalk.dim(`> Resonance recorded. (Avg: ${(profile.stats.resonanceSum / profile.stats.resonanceCount).toFixed(1)})`));
        }

    } catch (e) {
        console.error(chalk.red('\nThe Bridge collapsed.'));
        if (e instanceof Error) console.error(chalk.red(e.message));
    }
  });

program.parse();
