import { describe, it, expect } from 'vitest'
import { getOperationByMethodAndPath } from './getOperationByMethodAndPath'
import type { OpenAPI } from 'openapi-types'

describe('getOperationByMethodAndPath', () => {
  it('matches plain strings', () => {
    const schema = {
      paths: {
        '/foo': {
          get: {
            operationId: 'getFoo',
          },
        },
      },
    }
    expect(
      getOperationByMethodAndPath(
        schema as unknown as OpenAPI.Document,
        'get',
        '/foo',
      ),
    ).toMatchObject({
      operationId: 'getFoo',
    })
  })

  it('matches paths with variables', () => {
    const schema = {
      paths: {
        '/foo/{id}': {
          get: {
            operationId: 'getFooById',
          },
        },
      },
    }
    expect(
      getOperationByMethodAndPath(
        schema as unknown as OpenAPI.Document,
        'get',
        '/foo/123',
      ),
    ).toMatchObject({
      operationId: 'getFooById',
    })
  })
})
