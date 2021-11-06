#!/usr/bin/env node
const { program } = require('@caporal/core');
const glob = require('glob');
const commands = glob.sync(`${ __dirname }/commands/*/index.js`);
const logger = require('./logger');
const fs = require('fs');
const logo = fs.readFileSync('./utils/logo.txt', 'utf-8');

program.description(`a frontend CLI tool for bootstrapping and scaffolding frontend applications. \n ${ logo }`);
program.logger(logger);

// Register each command
commands.forEach(require);

// Parse the CLI arguments to decide which command to execute
program.run();
