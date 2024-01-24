import { Command } from 'commander'
import fs from 'node:fs'
import { Validator } from '@seriousme/openapi-schema-validator'
import { format } from 'prettier'
import meta from '../package.json'

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
    var startTime = performance.now()

    const fileContent = readFile(file)

    if (!fileContent) {
      console.error('Couldn’t read file.')
      return
    }

    const newContent = await format(fileContent, {
      semi: false,
      parser: 'json',
    })

    // Replace file content with newContent
    fs.writeFileSync(file, newContent, 'utf8')

    var endTime = performance.now()

    console.log(`File formatted in ${Math.round(endTime - startTime)} ms.`)
  })

program
  .command('validate')
  .description('Validate an OpenAPI file')
  .argument('<file>', 'file to validate')
  .action(async (file: string) => {
    // console.log(Validator.supportedVersions.has('3.1'))
    // prints true

    const validator = new Validator()
    const res = await validator.validate(file)
    // const specification = validator.specification
    // specification now contains a Javascript object containing the specification
    if (res.valid) {
      console.log(
        `Matches the OpenAPI specification (Version ${validator.version}).`,
      )

      const schema = validator.resolveRefs()
      // schema now contains a Javascript object containing the dereferenced schema
    } else {
      console.error('File doesn’t match the OpenAPI specification.')
      console.log()
      console.error(res.errors)
    }
  })

program
  .command('share')
  .description('Share an OpenAPI file')
  .argument('<file>', 'file to share')
  .action(async (file: string) => {
    fetch('https://sandbox.scalar.com/api/sahare', {
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
      })
  })

program.parse()
