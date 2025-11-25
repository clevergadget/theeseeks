#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { Gatekeeper } from './core/gatekeeper.js';
import { Shadow } from './io/shadow.js';
import { SeekerProfile } from './io/profile.js';
import { Scribe, type ContextItem } from './core/scribe.js';

const program = new Command();

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
            items.push({
                path: options.file,
                rawContent,
                companionContent
            });
            console.log(chalk.dim(`> Retrieved artifact: ${options.file}`));
            if (companionContent) {
                console.log(chalk.dim(`> Retrieved companion: ${Shadow.getCompanionPath(options.file)}`));
            }
        } catch (err) {
            console.error(chalk.red(`Could not read file: ${options.file}`));
        }
    }

    // Scribe
    const scroll = Scribe.generateScroll(query, reflection, items, profile);
    
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
  });

program.parse();
