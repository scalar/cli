import { getExampleFromSchema } from '@scalar/api-reference'
import { OpenAPI, parse } from '@scalar/openapi-parser'
import { type Context, Hono } from 'hono'

import { normalize, routeFromPath } from '../utils'

/**
 * Create a mock server instance
 */
export async function createMockServer(options?: {
  openapi: string | Record<string, any>
  onRequest?: (data: { context: Context; operation: OpenAPI.Operation }) => void
}) {
  const app = new Hono()

  // Normalize input
  options.openapi = normalize(options.openapi)
  // TODO: The parser should work with objects *and* string, but the typing seems to be wrong. :)
  // @ts-expect-error
  const specification = await parse(options.openapi)

  // OpenAPI file
  app.get('/openapi.json', (c) => {
    if (!options?.openapi) {
      return c.text('Not found', 404)
    }

    return c.json(options.openapi)
  })

  // Paths
  Object.keys(specification.document.paths ?? {}).forEach((path) => {
    // Request methods
    Object.keys(specification.document.paths[path]).forEach((method) => {
      const route = routeFromPath(path)

      // Route
      app[method](route, (c: Context) => {
        // Call onRequest callback
        if (options?.onRequest) {
          options.onRequest({
            context: c,
            operation: specification.document.paths[path][method],
          })
        }

        // Response
        const operation = specification.document.paths[path][method]

        const jsonResponseConfiguration =
          operation.responses?.['200']?.content['application/json']

        const response = jsonResponseConfiguration?.example
          ? jsonResponseConfiguration.example
          : jsonResponseConfiguration?.schema
            ? getExampleFromSchema(jsonResponseConfiguration.schema, {
                emptyString: '…',
              })
            : null

        return c.json(response)
      })
    })
  })

  return app
}
