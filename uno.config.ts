import fs from 'node:fs'
import { defineConfig } from 'unocss'
import { DIRECTORY_NAME } from './constant'

function getMainCss() {
  const env = process.env.NODE_ENV
  const input = fs.readFileSync('main.css', 'utf8')
  if (env === 'development')
    return input
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const CleanCSS = require('clean-css')
  return new CleanCSS().minify(input).styles
}

export default defineConfig({
  cli: {
    entry: {
      patterns: [`${DIRECTORY_NAME}/template.html`],
      outFile: `${DIRECTORY_NAME}/stylesheet.css`,
    },
  },

  preflights: [
    {
      layer: 'my-style',
      getCSS: () => getMainCss(),
    },
  ],
})
