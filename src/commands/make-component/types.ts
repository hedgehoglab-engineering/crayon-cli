import type { Prop } from './props';
import { pascalCase } from 'scule';
import type { TestRunner } from '../../types';

export type FrameworkModuleRunConfig = {
    componentName: string;
    path: string;
    props: Prop[];
};

export type FrameworkModule = {
    run: (config: FrameworkModuleRunConfig) => Promise<void>;
    eject: () => Promise<string>;
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
    testRunner: TestRunner | undefined;
};
