import { log } from '@clack/prompts';
import config from '../../../../config';
import { ejectStubs, generateStubs } from '../../stubs';
import type { FrameworkModule } from '../../types';
import { generateTemplateData } from '../../utils';
import component from './stubs/Component.vue';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const run: FrameworkModule['run'] = async ({
    componentName,
    path,
    props,
}) => {
    const crayonConfig = await config();

    const templateData = generateTemplateData({
        componentName,
        props,
    });

    const stubs = generateStubs({
        componentFileName: 'Component.vue',
        componentName,
        outputPath: path,
        templateData,
    });

    if (true) {
        const customTemplatePath = resolve(__dirname, './CustomStub.vue.ts');

        const custom = await import(customTemplatePath);

        console.log({ custom: custom.default(templateData) });
    }

    console.log(component(templateData));

    await stubs.component();

    if (crayonConfig?.features?.storybook) {
        await stubs.stories();
    }

    if (crayonConfig?.features?.tests) {
        await stubs.tests();
    }
};

export const eject: FrameworkModule['eject'] = async () => {
    const crayonConfig = await config();
    const stubs = ejectStubs({
        componentFileName: 'Component.vue',
    });

    await stubs.component();
    log.success('Ejected Component.vue.stub');

    if (crayonConfig?.features?.storybook) {
        await stubs.stories();
        log.success('Ejected Component.stories.ts.stub');
    }

    if (crayonConfig?.features?.tests) {
        await stubs.tests();
        log.success('Ejected Component.spec.ts.stub');
    }
};
