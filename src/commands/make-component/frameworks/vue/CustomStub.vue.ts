import type { TemplateData } from '../../types';

export default (value: TemplateData): string => `<template>
    <div class="${value.component.name.kebab}">
        ${value.component.name.pascal}
    </div>
</template>

<script lang="ts" setup>
    type ${value.component.name.pascal}Props = {
        ${value.component.props
            .map(
                ({ name, type, required }) =>
                    `${name}${required ? '' : '?'}: ${type}`,
            )
            .join(';\n        ')}
    }

    const props = defineProps<${value.component.name.pascal}Props>();
</script>

<style lang="scss" scoped>
    .${value.component.name.kebab} {

    }
</style>
`;
