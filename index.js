#!/usr/bin/env node
const crayon = require('caporal');
const glob = require('glob');
const { version } = require('./package.json');
const commands = glob.sync(`${__dirname}/commands/*/index.js`);

// Set the version from the package.json
crayon.version(version);

// Register each command
commands.forEach(require);

// Parse the CLI arguments to decide which command to execute
crayon.parse(process.argv);
