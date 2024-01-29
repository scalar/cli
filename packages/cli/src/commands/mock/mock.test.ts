import { describe, expect, it } from 'vitest'
import { ScalarCli } from '../../../tests/invoke-cli'
import path from 'node:path'

// TODO: Long running process
describe.skip('mock', () => {
  it('starts a mock server for the given OpenAPI file', () => {
    // Start the mock server
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['mock', './src/commands/mock/dummy.json'])

    // Output
    logs.should.contain('/hello')
  })
})
