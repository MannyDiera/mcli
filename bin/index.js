#!/usr/bin/env node
import { Command } from 'commander';
import { scaffold } from '../src/commands/scaffold.js';
const program = new Command();

program
  .name('mcli')
  .description('A simple CLI to create node projects with jest and webpack config setup')
  .version('1.0.0');

program
  .command('new <projectName>')
  .description('Build a new project')
  .action((projectName, options) => {
    scaffold(projectName, options);
  });

program.parse(process.argv);
