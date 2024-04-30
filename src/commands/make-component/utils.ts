import type { TemplateData } from './types';
import type { Prop } from './props';
import { camelCase, kebabCase, pascalCase } from 'scule';

export const generateTemplateData = ({
    componentName,
    props,
}: {
    componentName: string;
    props: Prop[];
}): TemplateData => ({
    component: {
        name: {
            pascal: pascalCase(componentName),
            kebab: kebabCase(componentName),
            camel: camelCase(componentName),
        },

        props,
    },
});
