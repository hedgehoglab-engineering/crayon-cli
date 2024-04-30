import type { TemplateData } from '../../../types';

export default (value: TemplateData) => `/**
 * Stories for ${value.component.name.pascal}.
 *
 * @see https://storybook.js.org/docs/vue/essentials/controls
 */

import generateArgTypes from '@netsells/storybook-vue-generate-arg-types';
import ${value.component.name.pascal} from './${
    value.component.name.pascal
}.vue';
import { argsKeys } from '../../../.storybook/helpers';
import { useStorybookArgs } from '../../../composables/useStorybookArgs';
import type { Meta, StoryObj } from '@storybook/vue3';
import type { ComponentProps } from 'vue-component-type-helpers';

type ${value.component.name.pascal}PropsAndCustomArgs = ComponentProps<
    typeof ${value.component.name.pascal}
> & {};

const meta = {
    /**
     * Set the component on the default export for props to be
     * automatically converted to args/controls.
     */
    component: ${value.component.name.pascal},
    /**
     * Provide custom control types for your props.
     *
     * @see https://storybook.js.org/docs/vue/essentials/controls#annotation
     */
    argTypes: generateArgTypes(${value.component.name.pascal}),
    /**
     * Set any default props data on your component.
     *
     * @see https://storybook.js.org/docs/8.0/vue/writing-stories/args
     */
    ${(() => {
        const requiredProps = value.component.props.filter(
            ({ required }) => required,
        );

        if (!requiredProps.length) {
            return 'args: {},';
        }

        return `args: {
${requiredProps
    .map(({ name, defaultValue }) => `        ${name}: ${defaultValue},`)
    .join('\n')}
    },`;
    })()}
    /**
     * Set any default parameters on your stories.
     *
     * @see https://storybook.js.org/docs/8.0/vue/writing-stories/parameters
     */
    parameters: {
        container: true,
        layout: 'centered',
    },
    /**
     * Return your rendered component.
     *
     * @see https://storybook.js.org/docs/8.0/vue/api/csf
     */
    render: (args, { argTypes }) => ({
        name: '${value.component.name.kebab}-story',

        props: argsKeys({ ...args, ...argTypes }),

        components: { ${value.component.name.pascal} },

        setup(props) {
            const { propArgs } = useStorybookArgs({ props, args });

            return {
                propArgs,
            };
        },

        template: \`
            <${value.component.name.kebab}
                v-bind="propArgs"
            />
        \`,
    }),
} satisfies Meta<typeof ${value.component.name.pascal}PropsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ${value.component.name.camel}: Story = {
    name: '${value.component.name.pascal}',
};

${value.component.props
    .filter(({ required }) => !required)
    .map(
        (prop) => `export const ${prop.name}: Story = {
    args: {
        ${prop.name}: ${prop.defaultValue},
    },
}`,
    )
    .join('\n\n')}
`;
