import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'

const templateFile = readFileSync(`${__dirname}/README.md`, 'utf8')
const outputFile = `${__dirname}/../../README.md`

;(() => {
  // Run the command and get the output
  try {
    execSync('NO_COLOR=1 yarn play', {
      cwd: process.cwd(),
      encoding: 'utf-8',
    })
  } catch (e) {
    if (e instanceof Error && 'stdout' in e && typeof e.stdout === 'string') {
      // Replace it in our readme template
      const commandOutput = e.stdout.split('\n').slice(1, -5).join('\n')

      const output = templateFile.replace('{{CRAYON_OUTPUT}}', commandOutput)

      // Write the file
      writeFileSync(outputFile, output)

      return
    }

    console.log(e)
  }
})()
