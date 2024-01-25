import { Command } from 'commander'
import fs from 'node:fs'
import { Validator } from '@seriousme/openapi-schema-validator'
import { format } from 'prettier'
import meta from '../package.json'
import kleur from 'kleur'
import prettyjson from 'prettyjson'
import toml from 'toml-js'
import prompts from 'prompts'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import type { OpenAPI } from 'openapi-types'
import { getExampleFromSchema } from '@scalar/api-reference'

function readFile(file: string) {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch (err) {
    console.error(err)
  }
}

async function getOpenApiFile(file: string) {
  const validator = new Validator()
  const result = await validator.validate(file)

  if (!result.valid) {
    console.warn(
      kleur.bold().yellow('[WARN]'),
      kleur.yellow(`File doesn’t match the OpenAPI specification.`),
    )
    console.log()
  }

  return validator.resolveRefs() as Promise<OpenAPI.Document>
}

function getMethodColor(method: string) {
  const colors = {
    get: 'green',
    post: 'cyan',
    put: 'yellow',
    delete: 'red',
    patch: 'magenta',
  }

  return colors[method.toLowerCase()] ?? 'grey'
}

function getFileFromConfiguration(file?: string) {
  // If file is empty, throw an exception
  if (file) {
    return file
  }

  // Try to load the configuration
  try {
    const configuration = toml.parse(fs.readFileSync('scalar.toml', 'utf8'))

    if (configuration?.reference?.file) {
      return configuration.reference.file
    }
  } catch {}

  console.error(kleur.red('No file provided.'))
  console.log()
  console.log(
    kleur.white(
      'Try `scalar init` or add the file as an argument. Read `scalar --help` for more information.',
    ),
  )
  console.log()

  process.exit(1)
}

const program = new Command()

program
  .name('@scalar/cli')
  .description('CLI to work with your OpenAPI files')
  .version('0.8.0')

program
  .option('-v, --version')
  .description('Version of the CLI')
  .action(() => {
    if (program.opts().version) {
      console.log(meta.version)
    }
  })

program
  .command('init')
  .description('Create a new `scalar.toml` file')
  .option('-f, --file [file]', 'your OpenAPI file')
  .action(async ({ file }) => {
    // Check if `scalar.toml` already exists
    if (fs.existsSync('scalar.toml')) {
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
    console.log(kleur.bold().white(`    scalar.toml`))
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
    fs.writeFileSync('scalar.toml', content)

    console.log(kleur.green(`Created a new project configuration.`))
    console.log(
      kleur.white(
        `Run ${kleur.grey().bold('scalar --help')} to see all available commands.`,
      ),
    )
    console.log()
  })

program
  .command('format')
  .description('Format an OpenAPI file')
  .argument('[file]', 'file to format')
  .action(async (fileArgument: string) => {
    const startTime = performance.now()

    const file = getFileFromConfiguration(fileArgument)

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
    console.log()
  })

program
  .command('validate')
  .description('Validate an OpenAPI file')
  .argument('[file]', 'file to validate')
  .action(async (fileArgument: string) => {
    const startTime = performance.now()

    const file = getFileFromConfiguration(fileArgument)

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
      console.log()
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
  .argument('[file]', 'file to share')
  .action(async (fileArgument: string) => {
    const file = getFileFromConfiguration(fileArgument)

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

        console.log(kleur.bold().green('Your OpenAPI file is public.'))
        console.log()
        console.log(
          `${kleur.green('➜')}  ${kleur.bold().white('Preview:')}      ${kleur.cyan(`https://sandbox.scalar.com/p/${id}`)}`,
        )
        console.log(
          `${kleur.grey('➜')}  ${kleur.bold().grey('Edit:')}         ${kleur.cyan(`https://sandbox.scalar.com/e/${id}`)}`,
        )
        console.log()
        console.log(
          `${kleur.grey('➜')}  ${kleur.bold().grey('OpenAPI JSON:')} ${kleur.cyan(`https://sandbox.scalar.com/files/${id}/openapi.json`)}`,
        )
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

program
  .command('mock')
  .description('Mock an API from an OpenAPI file')
  .argument('[file]', 'OpenAPI file to mock the server for')
  .option('-w, --watch', 'watch the file for changes')
  .option('-p, --port <port>', 'set the HTTP port for the mock server')
  .action(
    async (
      fileArgument: string,
      { watch, port }: { watch?: boolean; port?: number },
    ) => {
      const file = getFileFromConfiguration(fileArgument)

      let schema = await getOpenApiFile(file)

      // watch file for changes
      if (watch) {
        fs.watchFile(file, async () => {
          console.log(
            kleur.bold().white('[INFO]'),
            kleur.grey('Mock Server was updated.'),
          )
          schema = await getOpenApiFile(file)
        })
      }

      console.log(kleur.bold().white('Available Paths'))
      console.log()

      if (
        schema?.paths === undefined ||
        Object.keys(schema?.paths).length === 0
      ) {
        console.log(
          kleur.bold().yellow('[WARN]'),
          kleur.grey('Couldn’t find any paths in the OpenAPI file.'),
        )
      }

      // loop through all paths
      for (const path in schema?.paths ?? []) {
        // loop through all methods
        for (const method in schema.paths?.[path]) {
          console.log(
            `${kleur.bold()[getMethodColor(method)](method.toUpperCase().padEnd(6))} ${kleur.grey(`${path}`)}`,
          )
        }
      }

      console.log()

      const app = new Hono()

      app.all('/*', (c) => {
        const { method, path } = c.req

        console.log(
          `${kleur.bold()[getMethodColor(method)](method.toUpperCase().padEnd(6))} ${kleur.grey(`${path}`)}`,
        )

        if (!schema.paths?.[path]) {
          return c.text('Not found', 404)
        }

        const operation = schema.paths[path]?.[method.toLowerCase()]

        if (!operation) {
          return c.text('Method not allowed', 405)
        }

        const jsonResponseConfiguration =
          operation.responses['200'].content['application/json']

        const response = jsonResponseConfiguration.example
          ? jsonResponseConfiguration.example
          : jsonResponseConfiguration.schema
            ? getExampleFromSchema(jsonResponseConfiguration.schema, {
                emptyString: '…',
              })
            : null

        return c.json(response)
      })

      serve(
        {
          fetch: app.fetch,
          port: port ?? 3000,
        },
        (info) => {
          console.log(
            `${kleur.bold().green('➜ Mock Server')} ${kleur.white('listening on')} ${kleur.cyan(`http://localhost:${info.port}`)}`,
          )
          console.log()
        },
      )
    },
  )

program.parse()
