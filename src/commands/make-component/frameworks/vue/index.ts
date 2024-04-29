import { camelCase, kebabCase, pascalCase } from 'scule';
import { type Prop } from '../../props';
import { log } from '@clack/prompts';
import config from '../../../../config';
import { ejectStub, generateStub } from '../../stubs';

interface TemplateData {
    component: {
        name: {
            pascal: ReturnType<typeof pascalCase>;
            kebab: ReturnType<typeof pascalCase>;
            camel: ReturnType<typeof pascalCase>;
        };
        props: Prop[];
    };
}

const generateComponentStub = ({
    componentName,
    path,
    templateData,
}: {
    componentName: string;
    path: string;
    templateData: TemplateData;
}) => {
    generateStub({
        fileName: `${componentName}.vue`,
        path,
        templateData,
        stubFile: 'Component.vue.stub',
    });
};

const generateStoriesStub = ({
    componentName,
    path,
    templateData,
}: {
    componentName: string;
    path: string;
    templateData: TemplateData;
}) => {
    generateStub({
        fileName: `${componentName}.stories.ts`,
        path,
        templateData,
        stubFile: 'Component.stories.ts.stub',
    });
};

const generateTestsStub = ({
    componentName,
    path,
    templateData,
}: {
    componentName: string;
    path: string;
    templateData: TemplateData;
}) => {
    generateStub({
        fileName: `${componentName}.spec.ts`,
        path,
        templateData,
        stubFile: 'Component.spec.ts.stub',
    });
};

const generateTemplateData = ({
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

export const run = async ({
    componentName,
    path,
    props,
}: {
    componentName: string;
    path: string;
    props: Prop[];
}) => {
    const crayonConfig = await config();

    const templateData = generateTemplateData({
        componentName,
        props,
    });

    generateComponentStub({
        componentName,
        path,
        templateData,
    });

    if (crayonConfig?.features?.storybook) {
        generateStoriesStub({
            componentName,
            path,
            templateData,
        });
    }

    if (crayonConfig?.features?.tests) {
        generateTestsStub({
            componentName,
            path,
            templateData,
        });
    }
};

export const eject = async () => {
    const crayonConfig = await config();

    await ejectStub('Component.vue.stub');
    log.success('Ejected Component.vue.stub');

    if (crayonConfig?.features?.storybook) {
        await ejectStub('Component.stories.ts.stub');
        log.success('Ejected Component.stories.ts.stub');
    }

    if (crayonConfig?.features?.tests) {
        await ejectStub('Component.spec.ts.stub');
        log.success('Ejected Component.spec.ts.stub');
    }
};
