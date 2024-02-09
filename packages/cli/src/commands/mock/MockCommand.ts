import { serve } from '@hono/node-server'
import { getExampleFromSchema } from '@scalar/api-reference'
import { Command } from 'commander'
import { Hono } from 'hono'
import kleur from 'kleur'
import type { OpenAPI } from 'openapi-types'

import {
  getMethodColor,
  getOperationByMethodAndPath,
  loadOpenApiFile,
  useGivenFileOrConfiguration,
  watchFile,
} from '../../utils'

export function MockCommand() {
  const cmd = new Command('mock')

  cmd.description('Mock an API from an OpenAPI file')
  cmd.argument('[file]', 'OpenAPI file to mock the server for')
  cmd.option('-w, --watch', 'watch the file for changes')
  cmd.option('-p, --port <port>', 'set the HTTP port for the mock server')
  cmd.action(
    async (
      fileArgument: string,
      { watch, port }: { watch?: boolean; port?: number },
    ) => {
      const file = useGivenFileOrConfiguration(fileArgument)

      let schema = (await loadOpenApiFile(file))
        .specification as OpenAPI.Document

      // watch file for changes
      if (watch) {
        await watchFile(file, async () => {
          console.log(
            kleur.bold().white('[INFO]'),
            kleur.grey('Mock Server was updated.'),
          )
          schema = (await loadOpenApiFile(file))
            .specification as OpenAPI.Document
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
            `${kleur
              .bold()
              [
                getMethodColor(method)
              ](method.toUpperCase().padEnd(6))} ${kleur.grey(`${path}`)}`,
          )
        }
      }

      console.log()

      const app = new Hono()

      app.all('/*', (c) => {
        const { method, path } = c.req

        const operation = getOperationByMethodAndPath(schema, method, path)

        console.log(
          `${kleur
            .bold()
            [
              getMethodColor(method)
            ](method.toUpperCase().padEnd(6))} ${kleur.grey(`${path}`)}`,
          `${kleur.grey('→')} ${
            operation?.operationId
              ? kleur.white(operation.operationId)
              : kleur.red('[ERROR] 404 Not Found')
          }`,
        )

        if (!operation) {
          return c.text('Not found', 404)
        }

        // if (!operation) {
        //   return c.text('Method not allowed', 405)
        // }

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
            `${kleur.bold().green('➜ Mock Server')} ${kleur.white(
              'listening on',
            )} ${kleur.cyan(`http://localhost:${info.port}`)}`,
          )
          console.log()
        },
      )
    },
  )

  return cmd
}
