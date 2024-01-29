import { Validator } from '@seriousme/openapi-schema-validator'
import kleur from 'kleur'
import type { OpenAPI } from 'openapi-types'

export async function loadOpenApiFile(file: string) {
  const validator = new Validator()
  const result = await validator.validate(file)

  if (result.valid) {
    const schema = validator.resolveRefs() as OpenAPI.Document

    console.log(
      kleur.bold().white('[INFO]'),
      kleur.bold().white(schema.info.title),
      kleur.grey(`(OpenAPI v${validator.version})`),
    )
    // Stats
    const pathsCount = Object.keys(schema.paths).length

    let operationsCount = 0
    for (const path in schema.paths) {
      for (const method in schema.paths[path]) {
        operationsCount++
      }
    }

    console.log(
      kleur.bold().white('[INFO]'),
      kleur.grey(`${pathsCount} paths, ${operationsCount} operations`),
    )

    console.log()
  } else {
    console.warn(
      kleur.bold().yellow('[WARN]'),
      kleur.yellow('File doesn’t match the OpenAPI specification.'),
    )
    console.log()
  }

  return validator
}
