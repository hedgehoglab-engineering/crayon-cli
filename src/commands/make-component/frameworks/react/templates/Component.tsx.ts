import type { TemplateData } from '../../../types';

export default (
    value: TemplateData,
) => `import { Box, type BoxProps } from '@chakra-ui/react';
import { cx } from '@chakra-ui/utils';

interface ${value.component.name.pascal}Props extends BoxProps {
    ${value.component.props
        .map(
            ({ name, type, required }) =>
                `${name}${required ? '' : '?'}: ${type};`,
        )
        .join('\n    ')}
    // Any additional props
};

export default function ${value.component.name.pascal}({
    ${value.component.props.map(({ name }) => `${name},`).join('\n    ')}
    className,
    ...passThroughProps
}: ${value.component.name.pascal}Props) {
    return (
        <Box
            className={cx('${value.component.name.kebab}', className)}
            {...passThroughProps}
        >
            ${value.component.name.pascal}
        </Box>
    );
}
`;
