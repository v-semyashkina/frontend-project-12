// import js from '@eslint/js'
// import globals from 'globals'
// import pluginReact from 'eslint-plugin-react'
// import stylistic from '@stylistic/eslint-plugin'
// import { defineConfig } from 'eslint/config'

// export default defineConfig([
//   {
//     files: ['**/*.{js,mjs,cjs,jsx}'],
//     plugins: { js, '@stylistic': stylistic },
//     extends: ['js/recommended'],
//   },
//   {
//     files: ['**/*.{js,mjs,cjs,jsx}'],
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//     languageOptions: { globals: { ...globals.browser, ...globals.node } },
//   },
//   pluginReact.configs.flat.recommended,
//   {
//     files: ['**/*.{js,mjs,cjs,jsx}'],
//     rules: {
//       'react/react-in-jsx-scope': 'off',
//       'react/jsx-uses-react': 'off',
//       'react/prop-types': 'off',
//       '@stylistic/semi': ['error', 'never'],
//       '@stylistic/arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
//       '@stylistic/brace-style': ['error', 'stroustrup'],
//       '@stylistic/indent': ['error', 2],
//       '@stylistic/operator-linebreak': ['error', 'before'],
//       '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
//       '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
//       '@stylistic/jsx-wrap-multilines': ['error', { prop: 'parens' }],
//       '@stylistic/no-trailing-spaces': 'error',
//       '@stylistic/multiline-ternary': ['error', 'always'],
//     },
//   },
// ])

import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import stylistic from '@stylistic/eslint-plugin'
import { fileURLToPath } from 'url'

const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
const eslintIgnorePath = fileURLToPath(new URL('.eslintignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitIgnorePath),
  includeIgnoreFile(eslintIgnorePath),
  stylistic.configs.recommended,
  { files: ['/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': [0],
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
      '@stylistic/indent': 'off',
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/jsx-closing-tag-location': 'off',
    },
  },
])
