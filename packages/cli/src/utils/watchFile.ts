import fs from 'node:fs'

/**
 * Watch a file for changes and call a callback when it does.
 */
export async function watchFile(
  file: string,
  callback: () => void,
  options?: { immediate?: boolean },
) {
  console.log(`[INFO] Watch ${file}`)

  // Check if file exists
  if (!fs.existsSync(file)) {
    throw new Error(`File ${file} does not exist`)
  }

  // Watch the file for changes
  fs.watchFile(file, async () => {
    // Call the callback
    callback()
  })

  // Call the callback immediately
  if (options?.immediate) {
    callback()
  }
}
