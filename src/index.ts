#!/usr/bin/env node

import { defineCommand, runMain } from 'citty';
import { readFileSync } from 'fs';
import { resolve, join, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import type { PackageJson } from 'type-fest';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const pkgFile = join(process.cwd(), 'package.json');
const pkg: PackageJson = JSON.parse(readFileSync(pkgFile, 'utf-8'));

if (process.argv.at(-1) === '--help') {
    const logo = readFileSync(resolve(__dirname, './logo.txt'), 'utf-8');

    console.log(logo);
}

const main = defineCommand({
    meta: {
        name: pkg.name,
        version: pkg.version,
        description: 'Crayon CLI',
    },

    setup({ rawArgs }: any) {
        if (rawArgs.length) {
            return;
        }
    },

    subCommands: {
        init: () => import('./commands/init').then((r) => r.default),
        'make:component': () =>
            import('./commands/make-component').then((r) => r.default),
        config: () => import('./commands/config').then((r) => r.default),
    },
});

runMain(main);

// Export our types
export { type CrayonConfig } from './types';
export { type TemplateData as MakeComponentTemplateData } from './commands/make-component/types';
