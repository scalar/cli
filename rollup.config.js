import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import del from 'rollup-plugin-delete'

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
      typescript({
        include: [
          'src/**/*',
          'package.json',
        ],
      }),
      del({
        targets: [
          'dist/src',
        ]
      })
    ]
  }
]

export default config