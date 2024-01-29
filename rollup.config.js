import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

const config = [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      json(),
      typescript(),
    ]
  }
]

export default config