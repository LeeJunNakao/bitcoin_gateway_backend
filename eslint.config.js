import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default await tseslint.config({
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser, 
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  ignores: ['dist', 'node_modules'],
  settings: {},
  extends: [eslintConfigPrettier],
});
