import Component from '@ember/component';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import { alias, oneWay } from '@ember/object/computed';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { gt } from '@ember/object/computed';

export default Component.extend({
  colSize: '10',
  offset: '1',
  fit: true,

  didReceiveAttrs() {
    this._super(...arguments);

    if(
      this.pagination === false
      || isBlank(this.pagination) && this.profiles.length < 50) {
      this.set('perPage', this.profiles.length);
    }
  },

  classNames: ['container-fluid'],
  classNameBindings: ['background'],

  background: computed('bg', function() {
    return `bg-${this.bg}`;
  }),

  // Pagination
  queryParams: ["page", "perPage"],

  page: 1,
  perPage: 24,

  content: pagedArray('profiles', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),

  totalPages: oneWay("pagedContent.totalPages"),
});
