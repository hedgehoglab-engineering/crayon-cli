import { confirm, select, text } from '../../../prompts'
import { camelCase } from 'scule'

type BasicType = 'string' | 'string[]' | 'boolean' | '{}[]' | '{}'

export interface Prop {
  name: string
  type: BasicType
  required: boolean
}

const typeOptions = [
  {
    label: 'String',
    value: 'string',
  },
  {
    label: 'Array of strings',
    value: 'string[]',
  },
  {
    label: 'Boolean',
    value: 'boolean',
  },
  {
    label: 'Object',
    value: '{}',
  },
  {
    label: 'Array of objects',
    value: '{}[]',
  },
  {
    label: 'Callback function',
    value: '() => void',
  },
  {
    label: 'Other',
    value: 'any',
  },
]

async function defineProp(props: Prop[]): Promise<Prop> {
  const name = await text({
    message: 'Name:',
    validate(value: string) {
      if (!value) {
        return 'Prop name is required'
      }

      if (!/^[a-z0-9]+$/i.test(value)) {
        return 'Prop name must be alphanumeric'
      }

      if (value[0] !== value.toLowerCase()[0] || value !== camelCase(value)) {
        return 'Prop name must be camelCase'
      }

      if (Number.isInteger(parseInt(value.charAt(0)))) {
        return 'Prop name must start with a letter'
      }

      if (props.some(prop => prop.name === value)) {
        return 'Prop name must be unique'
      }
    },
  })

  const type = (await select({
    message: 'Type:',
    options: typeOptions,
  })) as unknown as BasicType

  const required = await confirm({
    message: 'Is the prop required?',
  })

  return {
    name,
    type,
    required,
  }
}

export async function defineProps() {
  const defineProps = await confirm({
    message: 'Would you like to define props?',
  })

  let propsConfirmed = false

  const props: Prop[] = []

  if (defineProps) {
    while (!propsConfirmed) {
      const prop = await defineProp(props)

      props.push(prop)

      propsConfirmed = !(await confirm({
        message: 'Would you like to define another?',
      }))
    }
  }

  return props
}
