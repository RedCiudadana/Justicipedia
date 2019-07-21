import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

/**
 * Serializa los modelos y obtiene profiles, config, navbarLinks, a traves del servicio: spreadsheets.
 *
 * @class Route.Application
 */
export default Route.extend({

  /**
   * Servicio para obtener datos, ya sea desde 'static-files' o las hojas de datos públicadas.
   *
   * @property spreadsheets
   * @type Service
   */
  spreadsheets: service(),

  /**
   * Datos principales de la aplicación.
   *
   * @method model
   * @return {Object} profiles, config, navbarLinks.
   */
  model() {
    return hash({
      presidents: this.store.findAll('president'),
      vicepresidents: this.store.findAll('vicepresident'),
      listados: this.store.findAll('listado'),
      distritos: this.store.findAll('distrito'),
      parlacens: this.store.findAll('parlacen'),
      mayors: this.store.findAll('mayor'),
      parties: this.store.findAll('partido')
    });
  },

  /**
   * Acciones: selectPerfil.
   * @property actions
   * @type {Object}
   */
  actions: {
    // Utilizado para seleccionar un perfil en la caja de busqueda.
    selectPerfil(profile) {
      // Agrega el id del perfil a la transición
      this.transitionTo('perfil', profile.get('id'));
    }
  }

});
