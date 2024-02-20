/*
  Thinking of using the new eslint v9 flat config format?
  You're going to need to check if support has been added to vite-plugin-eslint.
  At the time of project setup, it was not supported. See https://github.com/gxmari007/vite-plugin-eslint/pull/82
  What about using ESM config? Nope, that's not supported with eslint when you specify type:module in package.json.
*/
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
};
