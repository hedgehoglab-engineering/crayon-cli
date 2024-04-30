import type { TemplateData } from '../../../types';

export default (value: TemplateData) => `import * as ${
    value.component.name.pascal
} from './${value.component.name.pascal}.stories';
import {
    generateSuite,
    type VueWrapper,
} from '@netsells/vue-storybook-test-utils';
import { describe, beforeEach, test, expect } from '${value.testRunner}';

const suite = generateSuite(${value.component.name.pascal});

describe('${value.component.name.pascal}', () => {
    let wrapper: VueWrapper;

    const ${value.component.name.camel} = () => wrapper.getComponent();

    beforeEach(() => {
        wrapper = suite.${value.component.name.camel}();
    });
    ${(() => {
        if (value.component.props.length) {
            return `
    test.todo('something appropriate happens', () => {
        expect(true).toBe(false);
    });`;
        }

        return value.component.props
            .map(
                ({ name }) => `
    describe('when the ${name} prop is provided', () => {
        test.todo('something appropriate happens', () => {
            expect(true).toBe(false);
        });
    });`,
            )
            .join('\n');
    })()}
});

`;
