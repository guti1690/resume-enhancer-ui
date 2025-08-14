import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'
import vueEslintParser from 'vue-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    files: ['**/*.vue'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      quotes: ['error', 'single'],
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      quotes: ['error', 'single'],
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
]
