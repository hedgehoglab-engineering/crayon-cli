import { defineCommand } from 'citty';
import type { FrameworkSelectOption } from './types';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'pathe';
import type { CrayonConfig, FrameworkOption } from '../../types';
import { confirm, promptScope, select } from '../../prompts.js';

export default defineCommand({
    meta: {
        name: 'init',
        description: 'Initialise a crayon cli config in the current directory',
    },

    async run() {
        const rootDir = process.cwd();
        const configPath = resolve(rootDir, './.crayon.config.js');
        const packageJson = JSON.parse(
            readFileSync(resolve(rootDir, './package.json'), 'utf-8'),
        );

        const dependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
        };

        await promptScope(async ({ intro, outro }) => {
            intro('Creating crayon config');

            const reactDetected = Object.keys(dependencies).some((name) =>
                name.includes('react'),
            );

            const vueDetected = Object.keys(dependencies).some((name) =>
                name.includes('vue'),
            );

            const frameworks: FrameworkSelectOption[] = [
                {
                    label: 'React',
                    value: 'react',
                    hint: reactDetected ? '(detected)' : undefined,
                },
                {
                    label: 'Vue',
                    value: 'vue',
                    hint: vueDetected ? '(detected)' : undefined,
                },
            ];

            const framework = (await select({
                message: 'Select framework:',
                options: frameworks,
                initialValue: reactDetected
                    ? 'react'
                    : vueDetected
                      ? 'vue'
                      : undefined,
            })) as FrameworkOption;

            const storybookDetected = Object.keys(dependencies).some((name) =>
                name.includes('storybook'),
            );
            const storybook = await confirm({
                message: 'Does this project use storybook?',
                initialValue: storybookDetected,
            });

            const config: CrayonConfig = {
                framework,
                features: {
                    storybook: storybook,
                },
            };

            writeFileSync(
                configPath,
                `const config = ${JSON.stringify(config, null, 4)};

export default config;
      `,
                'utf-8',
            );

            outro(`Config initialised at ${configPath}`);
        });
    },
});
