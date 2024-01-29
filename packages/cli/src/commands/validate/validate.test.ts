import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { ScalarCli } from '../../../tests/invoke-cli'

describe('validate', () => {
  it('validates the given file', () => {
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['validate', './src/commands/validate/valid.json'])

    logs.should.contain('OpenAPI 3.1')
    expect(exitCode).toBe(0)
  })

  it('shows errors for invalid file', () => {
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['validate', './src/commands/validate/invalid.json'])

    logs.should.contain('Cannot find supported swagger/openapi version')
    logs.should.not.contain('OpenAPI 3.1')
    expect(exitCode).toBe(1)
  })
})
