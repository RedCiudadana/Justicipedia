import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  profile: belongsTo('profile'),
  nombre: attr('string'),
  concepto: attr('string'),
  puntuacion: attr('string'),
  puntuacion_total: attr('string')
});
