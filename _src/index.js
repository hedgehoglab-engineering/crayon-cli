#!/usr/bin/env node
import caporal from '@caporal/core';
import { globSync } from 'glob';
//const logger = require('./logger');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = globSync(`${ __dirname }/commands/*/index.js`);
const logo = fs.readFileSync(
    path.resolve(__dirname, './utils/logo.txt'),
    'utf-8',
);

const { program } = caporal;

console.log(program);

(async () => {
    program.description(`a frontend CLI tool for bootstrapping and scaffolding frontend applications. \n ${ logo }`);

    //program.logger(logger);

    // Register each command
    await Promise.all(
        commands.map((path) => import(path)),
    );


    // Parse the CLI arguments to decide which command to execute
    program.run();
})();
