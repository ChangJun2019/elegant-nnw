import { defineConfig } from 'bumpp'

export default defineConfig({
  // https://github.com/antfu/bumpp/blob/main/src/types/version-bump-options.ts
  files: ['package.json', 'package-lock.json', 'README.md'],
  push: false,
  commit: false,
  tag: false,
})
