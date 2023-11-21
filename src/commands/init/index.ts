import { defineCommand } from 'citty'
import { FrameworkSelectOption } from './types'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'pathe'
import { CrayonConfig, FrameworkOption } from '../../types'
import { confirm, promptScope, select } from '../../prompts.js'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialise a crayon cli config in the current directory',
  },

  async run() {
    const rootDir = process.cwd()
    const configPath = resolve(rootDir, './.crayonrc')
    const packageJson = JSON.parse(
      readFileSync(resolve(rootDir, './package.json'), 'utf-8'),
    )

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    await promptScope(async ({ intro, outro }) => {
      intro('Creating crayon config')

      const reactDetected = Object.keys(dependencies).some(name =>
        name.includes('react'),
      )

      const frameworks: FrameworkSelectOption[] = [
        {
          label: 'React',
          value: 'react',
          hint: reactDetected ? '(detected)' : undefined,
        },
      ]

      const framework = (await select({
        message: 'Select framework:',
        options: frameworks,
        initialValue: reactDetected ? 'react' : undefined,
      })) as FrameworkOption

      const storybookDetected = Object.keys(dependencies).some(name =>
        name.includes('storybook'),
      )
      const storybook = await confirm({
        message: 'Does this project use storybook?',
        initialValue: storybookDetected,
      })

      const config: CrayonConfig = {
        framework,
        features: {
          storybook: storybook,
        },
      }

      writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')

      outro(`Config initialised at ${configPath}`)
    })
  },
})
