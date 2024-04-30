import { fileURLToPath } from 'url';
import { resolve } from 'pathe';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import config from '../../config';
import type { TemplateData } from './types';
import { log } from '@clack/prompts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const ejectPath = async () =>
    resolve(
        process.cwd(),
        '.crayon/commands/make-component',
        (await config())?.framework!,
        'templates',
    );

const defaultTemplatePath = async (path: string = '') =>
    resolve(
        __dirname,
        'frameworks',
        (await config())?.framework!,
        'templates',
        path,
    );

const ejectedTemplatePath = async (path: string = '') =>
    resolve(await ejectPath(), path);

export const getTemplatePath = async (path: string) => {
    const ejectedPath = await ejectedTemplatePath(`${path}.mjs`);

    if (existsSync(ejectedPath)) {
        return ejectedPath;
    }

    return false;
};

export const generateTemplate = async ({
    fileName,
    path,
    stubFile,
    templateData,
    template,
}: {
    fileName: string;
    path: string;
    stubFile: string;
    templateData: TemplateData;
    template: (value: TemplateData) => string;
}) => {
    const customTemplate = await getTemplatePath(stubFile);

    let compiled: string = template(templateData);

    if (customTemplate) {
        compiled = (await import(customTemplate)).default(templateData);
    }

    const filePath = resolve(path, fileName);

    if (!existsSync(path)) {
        mkdirSync(path, {
            recursive: true,
        });
    }

    writeFileSync(filePath, compiled, 'utf-8');
};

export const ejectStub = async (path: string) => {
    if (!existsSync(await ejectedTemplatePath())) {
        mkdirSync(await ejectedTemplatePath(), {
            recursive: true,
        });
    }

    const stubContent = readFileSync(
        await defaultTemplatePath(`${path}.mjs`),
        'utf-8',
    );

    writeFileSync(
        await ejectedTemplatePath(`${path}.mjs`),
        [
            `/**
 * @param {import('@hedgehoglab/crayon-cli').MakeComponentTemplateData} value
 * 
 * @returns string
 */`,
            stubContent,
        ].join('\n'),
        'utf-8',
    );

    log.success(`Ejected ${path}.mjs`);
};

export const generateTemplates = ({
    componentName,
    componentFileName = 'Component.tsx',
    outputPath,
    templateData,
    componentTemplate,
    storiesTemplate,
    testsTemplate,
}: {
    componentName: string;
    componentFileName?: string;
    outputPath: string;
    templateData: TemplateData;
    componentTemplate: (value: TemplateData) => string;
    testsTemplate: (value: TemplateData) => string;
    storiesTemplate: (value: TemplateData) => string;
}) => {
    return {
        component: () =>
            generateTemplate({
                fileName: componentFileName.replace('Component', componentName),
                path: outputPath,
                templateData,
                template: componentTemplate,
                stubFile: componentFileName,
            }),
        stories: () =>
            generateTemplate({
                fileName: 'Component.stories.ts'.replace(
                    'Component',
                    componentName,
                ),
                path: outputPath,
                templateData,
                template: storiesTemplate,
                stubFile: 'Component.stories.ts',
            }),
        tests: () =>
            generateTemplate({
                fileName: 'Component.spec.ts'.replace(
                    'Component',
                    componentName,
                ),
                path: outputPath,
                templateData,
                template: testsTemplate,
                stubFile: 'Component.spec.ts',
            }),
    };
};

export const ejectTemplates = async ({
    componentFileName = 'Component.tsx',
}: {
    componentFileName?: string;
} = {}) => {
    return {
        component: () => ejectStub(componentFileName),
        stories: () => ejectStub('Component.stories.ts'),
        tests: () => ejectStub('Component.spec.ts'),
        templatesPath: await ejectPath(),
    };
};
