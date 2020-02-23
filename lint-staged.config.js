/* eslint-env node */

module.exports = {
  "**/*.js": ["eslint --fix", "git add"],

  "app/styles/**/*.{scss,css}": ["stylelint --fix", "git add"],

  "app/templates/**/*.hbs": "ember-template-lint"
};
