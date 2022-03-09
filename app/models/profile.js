import Model, { belongsTo, attr } from '@ember-data/model';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

/**
 * Base model for people
 */
export default Model.extend({
  // Attributes
  nombre: attr('string'),
  sexo: attr('string'),
  puesto: attr('string'),
  dependencia: attr('string'),
  departamento: attr('string'),
  institucion: attr('string'),
  fechalaboral: attr('string'),
  nocolegiado: attr('string'),
  estadocivil: attr('string'),
  profesion: attr('string'),
  anosexperiencia: attr('string'),
  experienciaProfesional: attr('string'),
  experienciaAcademica: attr('string'),
  proyeccionHumana: attr('string'),
  publicaciones: attr('string'),
  fotoURL: attr('string'),
  correo: attr('string'),
  tw: attr('string'),
  fb: attr('string'),
  fuenteTexto: attr('string'),
  fuenteURL: attr('string'),

  // Documentos
  cv: attr('string'),
  expediente: attr('string'),
  resumen: attr('string'),

  // Relationships
  institution: belongsTo('institution', { async: true, defaultValue: null }),
  comission: belongsTo('election', {
    inverse: 'committee',
    async: true,
    defaultValue: null
  }),
  election: belongsTo('election', {
    inverse: 'candidates',
    async: true,
    defaultValue: null
  }),

  // Computed properties

  /**
   * This computed property set a default image if fotoURL is blank.
   */
  photo: computed('fotoURL', 'sexo', function() {
    if (!isBlank(this.fotoURL)) {
      return this.fotoURL;
    }

    if (this.sexo === 'Masculino') {
      return 'mi-guatemala/img/candidato.png';
    }

    if (this.sexo === 'Femenino') {
      return 'mi-guatemala/img/candidata.png';
    }

    return 'mi-guatemala/img/candidata.png';
  })
});

