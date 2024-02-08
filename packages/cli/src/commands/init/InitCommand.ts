import { Command } from 'commander'
import kleur from 'kleur'
import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import toml from 'toml-js'

export function InitCommand() {
  const cmd = new Command('init')

  cmd.description('Create a new `scalar.toml` file')
  cmd.option('-f, --file [file]', 'your OpenAPI file')
  cmd.action(async ({ file }) => {
    // Path to `scalar.toml` file
    const configFile = path.resolve('scalar.toml')

    // Check if `scalar.toml` already exists
    if (fs.existsSync(configFile)) {
      console.warn(kleur.yellow('A `scalar.toml` file already exists.'))
      console.log()

      const { overwrite } = await prompts({
        type: 'toggle',
        name: 'overwrite',
        message: 'Do you want to override the file?',
        initial: false,
        active: 'yes',
        inactive: 'no',
      })

      if (overwrite === false) {
        console.log()
        process.exit(1)
      }
    }

    // Ask for the OpenAPI file
    const configuration = {
      reference: { file: '' },
    }

    const { input } = file
      ? {
          input: file,
        }
      : await prompts({
          type: 'text',
          name: 'input',
          message: 'Where is your OpenAPI file?',
          initial: './openapi.json',
          validate: (input: string) => {
            return fs.existsSync(input) ? true : 'File doesn’t exist.'
          },
        })

    configuration.reference.file = input

    const content = toml.dump(configuration)

    console.log()
    console.log(kleur.bold().white('    scalar.toml'))
    console.log()
    console.log(
      content
        .trim()
        .split('\n')
        .map((line) => kleur.grey(`    ${line}`))
        .join('\n'),
    )
    console.log()

    // Create `scalar.toml` file
    fs.writeFileSync(configFile, content)

    console.log(kleur.green('Created a new project configuration.'))
    console.log(
      kleur.white(
        `Run ${kleur
          .grey()
          .bold('scalar --help')} to see all available commands.`,
      ),
    )
    console.log()
  })

  return cmd
}
