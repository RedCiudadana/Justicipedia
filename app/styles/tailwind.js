/* eslint-env node */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        'tapa': '#737372',
        'spindle': '#b0cee7',
        'brandy': '#e0b59c',
        'mygray': '#e7eaef',
        'sidecar': '#f3e1be',
        'light': '#f1f1f1'
      },
      fontFamily: {
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ]
      },
      textColor: {
        primary: '#747473'
      }
    }
  }
}
