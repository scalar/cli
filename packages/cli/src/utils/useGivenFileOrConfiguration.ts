import kleur from 'kleur'
import toml from 'toml-js'

import { readFile } from './'

export function useGivenFileOrConfiguration(file?: string) {
  // If a specific file is given, use it.
  if (file) {
    return file
  }

  // Try to load the configuration
  try {
    const configuration = toml.parse(readFile('scalar.toml'))

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
