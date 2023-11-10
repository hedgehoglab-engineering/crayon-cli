/**
 * Available prop types and their corresponding default values.
 *
 * @type {{Array: {component: string, arg: string}, Function: {component: string, arg: string}, Number: {component:
 *     string, arg: string}, Object: {component: string, arg: string}, String: {component: string, arg: string},
 *     Boolean: {component: string, arg: string}}}
 */
export const propTypes = {
    String: {
        component: '\'\'',
        arg: '\'\'',
    },
    Number: {
        component: 'null',
        arg: '1',
    },
    Boolean: {
        component: 'false',
        arg: 'false',
    },
    Object: {
        component: '() => ({})',
        arg: '{}',
    },
    Array: {
        component: '() => ([])',
        arg: '[]',
    },
    Function: {
        component: '() => {}',
        arg: '() => {}',
    },
};

export const tsTypes = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Object: 'object',
    Array: 'Array<any>',
    Function: 'Function',
};
