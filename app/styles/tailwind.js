/* eslint-env node */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        'tapa': '#737372',
        'spindle': '#B0CEE7',
        'brandy': '#E0B59C',
        'mygray': '#E7EAEF',
        'sidecar': '#F3E1BE'
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
