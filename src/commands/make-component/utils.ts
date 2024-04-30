import type { TemplateData } from './types';
import type { Prop } from './props';
import { camelCase, kebabCase, pascalCase } from 'scule';
import type { TestRunner } from '../../types';
import { relative, resolve } from 'pathe';

export const generateTemplateData = ({
    componentName,
    componentPath,
    props,
    testRunner,
}: {
    componentName: string;
    componentPath: string;
    props: Prop[];
    testRunner?: TestRunner;
}): TemplateData => ({
    component: {
        name: {
            pascal: pascalCase(componentName),
            kebab: kebabCase(componentName),
            camel: camelCase(componentName),
        },

        props,
    },

    testRunner,

    paths: {
        fromRoot: (path) => {
            const root = process.cwd();
            const fullComponentPath = resolve(root, componentPath);
            const fullPath = resolve(root, path);

            return relative(fullComponentPath, fullPath);
        },
    },
});
