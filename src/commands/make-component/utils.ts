import type { TemplateData } from './types';
import type { Prop } from './props';
import { camelCase, kebabCase, pascalCase } from 'scule';
import type { TestRunner } from '../../types';

export const generateTemplateData = ({
    componentName,
    props,
    testRunner,
}: {
    componentName: string;
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
});
