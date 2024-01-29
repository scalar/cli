import { describe, expect, it } from 'vitest'
import { ScalarCli } from '../../../tests/invoke-cli'
import path from 'node:path'
import fs from 'node:fs'

describe('format', () => {
  it('formats the given file', () => {
    const wellFormattedJson = '{ "foo": "bar" }\n'
    const notWellFormattedJson = '{"foo":    "bar"}'

    // Create JSON file
    const jsonFile = './src/commands/format/temp.json'
    fs.writeFileSync(jsonFile, notWellFormattedJson)

    // Format
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['format', './src/commands/format/temp.json'])

    // Output
    logs.should.contain('File formatted')
    expect(exitCode).toBe(0)

    // Check if file content is formatted
    const jsonFileContentFormatted = fs.readFileSync(jsonFile, 'utf8')
    expect(jsonFileContentFormatted).toBe(wellFormattedJson)
  })
})
