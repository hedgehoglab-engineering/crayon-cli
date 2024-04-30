import { fileURLToPath } from 'url';
import { resolve } from 'pathe';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import config from '../../config';
import template from 'lodash.template';
import type { TemplateData } from './types';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const defaultStubPath = async (path: string) =>
    resolve(
        __dirname,
        'frameworks',
        (await config())?.framework!,
        'stubs',
        path,
    );

const ejectedStubPath = async (path: string) =>
    resolve(
        process.cwd(),
        '.crayon/commands/make-component',
        (await config())?.framework!,
        'stubs',
        path,
    );

export const getStubPath = async (path: string) => {
    const defaultPath = await defaultStubPath(path);
    const ejectedPath = await ejectedStubPath(path);

    if (existsSync(ejectedPath)) {
        return ejectedPath;
    }

    return defaultPath;
};

export const generateStub = async ({
    fileName,
    path,
    stubFile,
    templateData,
}: {
    fileName: string;
    path: string;
    stubFile: string;
    templateData: {
        [key: string]: any;
    };
}) => {
    const componentTemplate = readFileSync(
        await getStubPath(`${stubFile}.stub`),
        'utf-8',
    );
    const compile = template(componentTemplate);

    const compiled = compile(templateData);

    if (!existsSync(path)) {
        mkdirSync(path, {
            recursive: true,
        });
    }

    writeFileSync(resolve(path, fileName), compiled, 'utf-8');
};

export const ejectStub = async (path: string) => {
    if (!existsSync(await ejectedStubPath(''))) {
        mkdirSync(await ejectedStubPath(''), {
            recursive: true,
        });
    }

    const stubContent = readFileSync(
        `${await defaultStubPath(path)}.stub`,
        'utf-8',
    );

    writeFileSync(`${await ejectedStubPath(path)}.stub`, stubContent, 'utf-8');
};

export const generateStubs = ({
    componentName,
    componentFileName = 'Component.tsx',
    outputPath,
    templateData,
}: {
    componentName: string;
    componentFileName?: string;
    outputPath: string;
    templateData: TemplateData;
}) => {
    return {
        component: () =>
            generateStub({
                fileName: componentFileName.replace('Component', componentName),
                path: outputPath,
                templateData,
                stubFile: componentFileName,
            }),
        stories: () =>
            generateStub({
                fileName: componentFileName.replace('Component', componentName),
                path: outputPath,
                templateData,
                stubFile: 'Component.stories.ts',
            }),
        tests: () =>
            generateStub({
                fileName: componentFileName.replace('Component', componentName),
                path: outputPath,
                templateData,
                stubFile: 'Component.spec.ts',
            }),
    };
};

export const ejectStubs = ({
    componentFileName = 'Component.tsx',
}: {
    componentFileName?: string;
} = {}) => {
    return {
        component: () => ejectStub(componentFileName),
        stories: () => ejectStub('Component.stories.ts'),
        tests: () => ejectStub('Component.spec.ts'),
    };
};
