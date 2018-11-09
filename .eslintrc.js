module.exports = {
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['html'],
  globals: {
    VhallChat: true
  },
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  globals: {
    initNECaptcha: true,
    VhallChat: true,
    WxLogin: true,
    _log: true,
    Vhall_User_Actions: true
  },
  rules: {
    'no-extend-native': 'off',
    'no-new': 'off',
    'no-alert': 0,
    'no-spaced-func': 2,
    'no-var': 0,
    'no-debugger': 0,
    'no-useless-constructor': 0
  }
}
