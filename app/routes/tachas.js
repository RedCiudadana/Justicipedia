import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    comission: {
      refreshModel: true
    }
  },

  model(params = {}) {
    return this.store.query('tacha', params);
  },
});
