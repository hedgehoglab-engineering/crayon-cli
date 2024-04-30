import { defineCommand } from 'citty';
import type { FrameworkSelectOption, TestRunnerSelectOption } from './types';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'pathe';
import type { CrayonConfig, FrameworkOption, TestRunner } from '../../types';
import { confirm, promptScope, select } from '../../prompts.js';

export default defineCommand({
    meta: {
        name: 'init',
        description: 'Initialise a Crayon CLI config in the current directory',
    },

    async run() {
        const rootDir = process.cwd();
        const configPath = resolve(rootDir, './.crayon.config.js');
        const packageJson = JSON.parse(
            readFileSync(resolve(rootDir, './package.json'), 'utf-8'),
        );

        const dependencies = {
            ...(packageJson.dependencies ?? {}),
            ...(packageJson.devDependencies ?? {}),
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

            const hasStorybook = await confirm({
                message: 'Does this project use storybook?',
                initialValue: storybookDetected,
            });

            const vitestDetected = Object.keys(dependencies).some((name) =>
                name.includes('vitest'),
            );

            const jestDetected = Object.keys(dependencies).some((name) =>
                name.includes('jest'),
            );

            const hasTests = await confirm({
                message: 'Does this project have unit tests?',
                initialValue: vitestDetected || jestDetected,
            });

            let testRunner: TestRunner | undefined = undefined;

            if (hasTests) {
                const testRunners: TestRunnerSelectOption[] = [
                    {
                        label: 'Vitest',
                        value: 'vitest',
                        hint: vitestDetected ? '(detected)' : undefined,
                    },
                    {
                        label: 'Jest',
                        value: 'jest',
                        hint: jestDetected ? '(detected)' : undefined,
                    },
                ];

                testRunner = (await select({
                    message: 'Select test runner:',
                    options: testRunners,
                    initialValue: vitestDetected
                        ? 'vitest'
                        : jestDetected
                          ? 'jest'
                          : undefined,
                })) as TestRunner;
            }

            const config: CrayonConfig = {
                framework,
                features: {
                    storybook: hasStorybook,
                    tests:
                        hasTests && testRunner
                            ? {
                                  runner: testRunner,
                              }
                            : false,
                },
            };

            writeFileSync(
                configPath,
                `/**
 * @type {import('@hedgehoglab/crayon-cli').CrayonConfig}
 */
const config = ${JSON.stringify(config, null, 4)
                    .replace(/"([^"]+)":/g, '$1:')
                    .replace(/"/g, "'")};

export default config;
      `,
                'utf-8',
            );

            outro(`Config initialised at ${configPath}`);
        });
    },
});
