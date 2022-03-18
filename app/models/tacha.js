import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  profile: belongsTo('profile'),
  comission: belongsTo('election', {
    async: true,
    defaultValue: null
  }),
  nombre: attr('string'),
  numero: attr('string'),
  objecion: attr('string')
});
