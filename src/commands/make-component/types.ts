import type { Prop } from './props';
import { pascalCase } from 'scule';

export type FrameworkModuleRunConfig = {
    componentName: string;
    path: string;
    props: Prop[];
};

export type FrameworkModule = {
    run: (config: FrameworkModuleRunConfig) => void;
    eject: () => void;
};

type ComponentNameCaseVariants = {
    pascal: ReturnType<typeof pascalCase>;
    kebab: ReturnType<typeof pascalCase>;
    camel: ReturnType<typeof pascalCase>;
};

export type TemplateData = {
    component: {
        name: ComponentNameCaseVariants;
        props: Prop[];
    };
};
