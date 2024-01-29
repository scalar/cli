import { describe, expect, it } from 'vitest'
import { ScalarCli } from '../../../tests/invoke-cli'
import { version } from '../../../package.json'

describe('--version', () => {
  it('outputs the version from package.json', () => {
    const [exitCode, logs] = ScalarCli().setCwd('../').invoke(['--version'])

    logs.should.contain(version)
    expect(exitCode).toBe(0)
  })
})
