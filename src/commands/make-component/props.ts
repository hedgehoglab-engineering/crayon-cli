import { confirm, select, text } from '../../prompts';
import { camelCase } from 'scule';

type BasicType =
    | 'string'
    | 'string[]'
    | 'number'
    | 'number[]'
    | 'boolean'
    | '{ id: string }[]'
    | '{}'
    | '() => void'
    | 'any';

export interface Prop {
    name: string;
    type: BasicType;
    required: boolean;
    defaultValue?: string;
}

interface PropConfig {
    label: string;
    type: BasicType;
    defaultPropValue: string;
}

interface PropOption {
    label: string;
    value: string;
}

const propConfigs: PropConfig[] = [
    {
        label: 'String',
        type: 'string',
        defaultPropValue: "'string'",
    },
    {
        label: 'Array of strings',
        type: 'string[]',
        defaultPropValue: "['string 1', 'string 1']",
    },
    {
        label: 'Number',
        type: 'number',
        defaultPropValue: '0',
    },
    {
        label: 'Array of numbers',
        type: 'number[]',
        defaultPropValue: '[1, 2]',
    },
    {
        label: 'Boolean',
        type: 'boolean',
        defaultPropValue: 'true',
    },
    {
        label: 'Object',
        type: '{}',
        defaultPropValue: '{}',
    },
    {
        label: 'Array of objects',
        type: '{ id: string }[]',
        defaultPropValue: "[{ id: 'string 1' }, { id: 'string 2' }]",
    },
    {
        label: 'Callback function',
        type: '() => void',
        defaultPropValue: '() => {}',
    },
    {
        label: 'Other',
        type: 'any',
        defaultPropValue: "'string'",
    },
];

const typeOptions: PropOption[] = propConfigs.map(({ label, type }) => ({
    label,
    value: type,
}));

async function defineProp(props: Prop[]): Promise<Prop> {
    const name = await text({
        message: 'Name:',
        validate(value: string) {
            if (!value) {
                return 'Prop name is required';
            }

            if (!/^[a-z0-9]+$/i.test(value)) {
                return 'Prop name must be alphanumeric';
            }

            if (
                value[0] !== value.toLowerCase()[0] ||
                value !== camelCase(value)
            ) {
                return 'Prop name must be camelCase';
            }

            if (Number.isInteger(parseInt(value.charAt(0)))) {
                return 'Prop name must start with a letter';
            }

            if (props.some((prop) => prop.name === value)) {
                return 'Prop name must be unique';
            }
        },
    });

    const type = (await select({
        message: 'Type:',
        options: typeOptions,
    })) as unknown as BasicType;

    const required = await confirm({
        message: 'Is the prop required?',
    });

    const propConfig: PropConfig = propConfigs.find(
        (prop) => prop.type === type,
    )!;

    return {
        name,
        type,
        required,
        defaultValue: propConfig.defaultPropValue,
    };
}

export async function defineProps() {
    const defineProps = await confirm({
        message: 'Would you like to define props?',
    });

    let propsConfirmed = false;

    const props: Prop[] = [];

    if (defineProps) {
        while (!propsConfirmed) {
            const prop = await defineProp(props);

            props.push(prop);

            propsConfirmed = !(await confirm({
                message: 'Would you like to define another?',
            }));
        }
    }

    return props;
}
