#!/usr/bin/env node
const { program } = require('@caporal/core');
const glob = require('glob');
const commands = glob.sync(`${ __dirname }/commands/*/index.js`);

// Register each command
commands.forEach(require);

// Parse the CLI arguments to decide which command to execute
program.run();
