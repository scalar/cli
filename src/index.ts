import { Command } from 'commander'
import fs from 'node:fs'
import { Validator } from '@seriousme/openapi-schema-validator'
import { format } from 'prettier'
import meta from '../package.json'
import kleur from 'kleur'
import prettyjson from 'prettyjson'

function readFile(file: string) {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch (err) {
    console.error(err)
  }
}

const program = new Command()

program
  .name('@scalar/cli')
  .description('CLI to work with your OpenAPI files')
  .version('0.8.0')

program
  .option('--version')
  .description('Version of the CLI')
  .action(() => {
    console.log(meta.version)
  })

program
  .command('format')
  .description('Format an OpenAPI file')
  .argument('<file>', 'file to format')
  .action(async (file: string) => {
    const startTime = performance.now()

    const fileContent = readFile(file)

    if (!fileContent) {
      console.error(kleur.red('Couldn’t read file.'))
      process.exit(1)
    }

    const newContent = await format(fileContent, {
      semi: false,
      parser: 'json',
    })

    // Replace file content with newContent
    fs.writeFileSync(file, newContent, 'utf8')

    const endTime = performance.now()

    console.log(
      kleur.green(`File formatted`),
      kleur.grey(
        `in ${kleur.white(`${kleur.bold(`${Math.round(endTime - startTime)}`)} ms`)}`,
      ),
    )
  })

program
  .command('validate')
  .description('Validate an OpenAPI file')
  .argument('<file>', 'file to validate')
  .action(async (file: string) => {
    const startTime = performance.now()

    const validator = new Validator()
    const result = await validator.validate(file)
    if (result.valid) {
      console.log(
        kleur.green(
          `Matches the OpenAPI specification${kleur.white(` (OpenAPI ${kleur.bold(validator.version)})`)}`,
        ),
      )

      const endTime = performance.now()

      console.log()
      console.log(
        kleur.green(`File validated`),
        kleur.grey(
          `in ${kleur.white(`${kleur.bold(`${Math.round(endTime - startTime)}`)} ms`)}`,
        ),
      )
    } else {
      console.log(prettyjson.render(result.errors))
      console.log()
      console.error(kleur.red(`File doesn’t match the OpenAPI specification.`))
      console.log()
      console.error(
        kleur.red(
          `${kleur.bold(`${result.errors?.length} error${result.errors && result.errors.length > 1 ? 's' : ''}`)} found.`,
        ),
      )
      console.log()

      process.exit(1)
    }
  })

program
  .command('share')
  .description('Share an OpenAPI file')
  .argument('<file>', 'file to share')
  .action(async (file: string) => {
    fetch('https://sandbox.scalar.com/api/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: readFile(file),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { id } = data

        console.log('OpenAPI file shared.')
        console.log()
        console.log(
          `➜  OpenAPI JSON: https://sandbox.scalar.com/files/${id}/openapi.json`,
        )
        console.log()
        console.log(`➜  Edit:         https://sandbox.scalar.com/e/${id}`)
        console.log(`➜  Preview:      https://sandbox.scalar.com/v/${id}`)
        console.log()
      })
      .catch((error) => {
        console.error('Failed to share the file.')
        console.log()
        console.error('Error:', error)
        console.log()
        process.exit(1)
      })
  })

program.parse()
