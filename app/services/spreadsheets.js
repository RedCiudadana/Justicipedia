import Service from '@ember/service';
// import Tabletop from 'tabletop';
import config from '../config/environment';
import fetch from 'fetch';
import { Promise } from 'rsvp';
import { isNone } from '@ember/utils';

/**
 * Servicios para obtener datos desde /static-files/ or Google's spreadsheets, según la configuración en 'environment'.
 * Para generar los archivos ejecutar 'node build-data.js'. Antes revisar la documentación en la carpeta 'Documentation'.
 * Preferiblemente usar 'static-files' porque el 'live-mode' es muy lento por la forma que obtiene los datos.
 *
 * @class Service.Spreadsheets
 * @example
 * import { inject as service } from '@ember/service';
 * spreadsheets: service()
 */
export default Service.extend({

  /**
   * URL de la hoja de datos (perfiles, partidos, etc). Luego se obtiene de 'environment'
   *
   * @property dataSpreadsheetUrl
   * @type String
   * @default null
   */
  dataSpreadsheetUrl: null,

  /**
   * URL de la hoja de configuraciones (aspecto de la pagina, campos de perfiles, etc). Luego se obtiene de 'environment'
   *
   * @property configSpreadsheetUrl
   * @type String
   * @default null
   */
  configSpreadsheetUrl: null,

  // flashMessages: service(),

  /**
   * Obtiene datos de una hoja especifica.
   *
   * @method fetch
   * @param {string} worksheetName - Nombre de la hoja.
   * @param {string} [spreadsheetKey='data'] - Puede ser 'data' o 'config' especifica la dirrección (archivo de google's spredsheet publicado) para obtener datos. Útil solamente cuando no se usa 'static-files'.
   */
  fetch(worksheetName/* , spreadsheetKey = 'data' */) {

    /**
     *
     *  MODO ESTÁTICO
     *
     */
    // Si config.APP.staticFilesUrl está definido, obtener la data de allí, independiente
    // del spreadsheetKey
    if (!isNone(config.APP.staticFilesUrl)) {
      return fetch(config.APP.staticFilesUrl + worksheetName + '.json')
        .then((response) => {
          return new Promise((resolve) => {
            resolve(response.json());
          });

        })
        .catch(() => {/* AJAX muestra un error */});
    }

    /**
     *
     *  MODO 'LIVE'
     *
     */
    // return new Promise((resolve) => {

    //   let spreadsheetUrl = this.dataSpreadsheetUrl;

    //   if ('config' === spreadsheetKey) {
    //     spreadsheetUrl = this.configSpreadsheetUrl;
    //   }

    //   Tabletop.init({
    //     key: spreadsheetUrl,
    //     callback: (data) => {
    //       if (isNone(data[worksheetName])) {
    //         this.log(worksheetName + "is empty or not found.");
    //         return resolve();
    //       }

    //       if (isNone(data[worksheetName].elements)) {
    //         this.log(worksheetName + "is empty or not found.");
    //         return resolve();
    //       }

    //       resolve(data[worksheetName].elements);
    //     }
    //   });
    // });
  },

  /**
   * Wrap de fetch que tiene 'spreadsheetKey' como 'config'.
   *
   * @method fetchConfig
   * @param  {string} worksheetName Nombre de la hoja.
   * @return {Promise<string[], MyError>} Promesa con los datos.
   */
  fetchConfig(worksheetName) {
    return this.fetch(worksheetName, 'config');
  }
});
