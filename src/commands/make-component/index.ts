import { defineCommand } from 'citty'

import config, { ensureConfigExists } from '../../config'
import { resolve } from 'pathe'

import { fileURLToPath } from 'url'
import { eject, run } from './frameworks/react'
import { confirm, promptScope } from '../../prompts'
import { intro, log, note, outro } from '@clack/prompts'
import { defineProps, Prop } from './frameworks/props'
import { CLIError } from '../../utils'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineCommand({
  meta: {
    name: 'make:component',
    description: 'Generate a component from boilerplate',
  },

  args: {
    path: {
      type: 'positional',
      description: 'Component path i.e. ./components/MyComponent',
      required: false,
    },

    skipProps: {
      type: 'boolean',
      description: 'Skip the props prompts step',
    },

    eject: {
      type: 'boolean',
      description: 'Eject the template stubs',
    },
  },

  async run({ args }) {
    ensureConfigExists()

    if (config === null) {
      return
    }

    if (args.eject) {
      intro('make:component')

      eject()

      outro('Complete')

      return
    }

    const { path } = args

    if (!path) {
      intro('make:component')

      log.error('Missing path argument')

      outro('')

      return
    }

    const [componentName] = path.split('/').slice(-1)

    await promptScope(async ({ outro, intro }) => {
      intro(`Generating component boilerplate for ${componentName}`)

      log.info(`🧩 Framework: ${config?.framework}`)
      log.info(`📚 Stories: ${config?.features?.storybook ? 'yes' : 'no'}`)

      let props: Prop[] = []

      if (!args.skipProps) {
        props = await defineProps()
      }

      note(componentName, 'Component name:')
      note(path, 'Component path:')

      if (props.length) {
        note(
          props
            .map(
              ({ name, type, required }) =>
                `${name}${required ? '?' : ''}: ${type}`,
            )
            .join('\n'),
          'Props:',
        )
      }

      const confirmed = await confirm({
        message: 'Is the above correct?',
      })

      if (!confirmed) {
        outro('Aborted')

        return
      }

      run({
        componentName,
        path,
        props,
      })

      outro(`Component generated at ${componentName}/${componentName}.tsx`)
    })
  },
})
