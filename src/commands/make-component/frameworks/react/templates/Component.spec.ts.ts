import type { TemplateData } from '../../../types';

export default (
    value: TemplateData,
) => `import { describe, beforeEach, test, expect } from '${value.testRunner}';
import { render } from '@testing-library/react';
import ${value.component.name.pascal} from './${value.component.name.pascal}';

describe('${value.component.name.pascal}', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = render(<${value.component.name.pascal} />);
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
