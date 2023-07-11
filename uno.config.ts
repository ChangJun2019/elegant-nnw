import fs from 'node:fs'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { fontFamily } from '@unocss/preset-mini/dist/theme'
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
    {
      'text-secondary': 'text-$c-text-secondary',
    },
  ],

  theme: {
    fontFamily: {
      sans: [
        ...fontFamily.sans.split(','),
      ],
      mono: [
        ...fontFamily.mono.split(','),
      ],
    },
  },

  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'text-bottom',
        'min-width': '1.2em',
      },
    }),
    presetTypography({
      cssExtend: {
        'h1': {
          color: 'var(--c-text-base)',
        },
        'a': {
          'color': 'var(--c-prose-links)',
          'text-decoration': 'none',
          'border-bottom': '1px dashed currentColor',
          'padding-bottom': '2px',
          'font-weight': '500',
        },
        'a:hover': {
          'color': 'var(--c-prose-primary)',
          'border-bottom': '1px solid currentColor',
        },
        'blockquote': {
          'font-style': 'none',
          'color': 'var(--c-blockquote)',
          'border-left': '.2em solid var(--c-prose-borders)',
        },
        'hr': {
          'width': '48px',
          'height': '2px',
          'background': 'var(--c-prose-hr)',
          'border-radius': '24px',
          'margin': '2em auto',
          'border': 'none',
          'opacity': '0.5',
        },

        'code': {
          'color': 'var(--c-prose-code)',
          'font-size': '.875em',
          'font-family': 'var(--un-prose-font-mono)',
          'background': 'var(--c-prose-inline-bg-color) !important',
          'padding': '0.2rem 0.375rem',
          'border-radius': '0.25rem',
          'font-weight': 400,
        },

        'pre,code': {
          background: 'var(--c-prose-pre-bg)',
        },

        'pre > code': {
          background: 'transparent !important',
        },

        'pre': {
          border: '1px solid var(--c-prose-pre-border)',
          background: 'var(--c-prose-pre-bg)',
        },

        ':not(pre) > code::before,:not(pre) > code::after': {
          content: '',
        },

        'figcaption': {
          'color': 'var(--c-blockquote)',
          'font-size': '.875em',
          'margin-top': '.8em',
        },

        'img,video': {
          'max-width': '100%',
          'border-radius': '.6rem',
          'height': 'auto',
        },

        'figure,picture': {
          margin: '1em 0',
        },
      },
    }),
  ],

  preflights: [
    {
      layer: 'my-style',
      getCSS: () => getMainCss(),
    },
  ],

  safelist: [...Object.keys(ARTICLE_TEXT).map(i => `${i}Text`)],
})
