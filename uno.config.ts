import fs from 'node:fs'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { ARTICLE_TEXT, DIRECTORY_NAME } from './constant'

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

  shortcuts: [
    [/^(.*)Text$/, ([,c]) => `text-${ARTICLE_TEXT[c]}`],
  ],

  theme: {
    maxWidth: {
      prose: '80ch',
    },
  },

  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],

  preflights: [
    {
      layer: 'my-style',
      getCSS: () => getMainCss(),
    },
  ],

  safelist: [...Object.keys(ARTICLE_TEXT).map(i => `${i}Text`)],
})
