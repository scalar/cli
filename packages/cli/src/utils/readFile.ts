import fs from 'node:fs'

export function readFile(file: string) {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch (err) {
    console.error(err)
  }
}
