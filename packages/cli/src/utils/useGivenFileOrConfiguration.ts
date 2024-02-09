import kleur from 'kleur'

import { readFile } from './'

export const CONFIG_FILE = 'scalar.config.json'

export function useGivenFileOrConfiguration(file?: string) {
  // If a specific file is given, use it.
  if (file) {
    return file
  }

  // Try to load the configuration
  try {
    const configuration = JSON.parse(readFile(CONFIG_FILE))

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
