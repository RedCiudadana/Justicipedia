import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';


const resolver = {
  instituciones: 'institution',
  elecciones: 'election',
  perfiles: 'profile'
};

const slider = {
  instituciones: {
    title: 'Sector Justicia',
    img: '/img/iconos/justicia-circle.png'
  },
  elecciones: {
    title: 'Comisiones de Postulación',
    img: '/img/iconos/personas-color-alt-circle.png'
  },
  perfiles: {
    title: 'Perfiles',
    img: '/img/iconos/personas-color-circle.png'
  },
};

export default Route.extend({
  resolver: resolver,
  queryParams: {
    sector: {
      refreshModel: true
    },
    candidatos: {
      refreshModel: true
    },
    comisionados: {
      refreshModel: true
    },
    comisiones: {
      refreshModel: true
    },
    estado: {
      refreshModel: true
    },
    page: { refreshModel: false },
    size: { refreshModel: false }
  },

  spreadsheets: service(),

  model({ model, sector, candidatos, comisionados, comisiones, estado }) {
    let controllerApplication = this.controllerFor('application');
    this.set('controllerApplication', controllerApplication);

    this.set('modelName', model);

    let modelName = this.resolver[model];

    this.slider = slider[this.get('modelName')];

    if(sector) {
      return this.store.query(modelName, {
        sector: sector
      });
    }

    if (comisionados) {
      this.set('slider.title', 'Comisionados');
      return this.store.query('election', {
        institution: comisionados
      }).then((elecciones) => {
        elecciones = elecciones.mapBy('id');
        return this.spreadsheets.fetch(modelName).then((perfiles) => {
          perfiles = perfiles.filter((perfil) => {
            if (isBlank(perfil.fotoURL)) {
              if (perfil.sexo && perfil.sexo.toLowerCase() === 'masculino') {
                perfil.photo = 'mi-guatemala/img/candidato.png';
              }

              if (perfil.sexo && perfil.sexo.toLowerCase() === 'femenino') {
                perfil.photo = 'mi-guatemala/img/candidata.png';
              }

              if (isBlank(perfil.sexo)) {
                perfil.photo = 'mi-guatemala/img/candidata.png';
              }
            } else {
              perfil.photo = perfil.fotoURL;
            }

            return elecciones.includes(perfil.comission);
          });

          return perfiles;
        })
      });
    }

    if(candidatos) {
      this.set('slider.title', 'Aspirantes');
      return this.store.query('election', {
        institution: candidatos
      }).then((elecciones) => {
        elecciones = elecciones.mapBy('id');
        return this.spreadsheets.fetch(modelName).then((perfiles) => {
          perfiles = perfiles.filter((perfil) => {
            if (isBlank(perfil.fotoURL)) {
              if (perfil.sexo && perfil.sexo.toLowerCase() === 'masculino') {
                perfil.photo = 'mi-guatemala/img/candidato.png';
              }

              if (perfil.sexo && perfil.sexo.toLowerCase() === 'femenino') {
                perfil.photo = 'mi-guatemala/img/candidata.png';
              }

              if (isBlank(perfil.sexo)) {
                perfil.photo = 'mi-guatemala/img/candidata.png';
              }
            } else {
              perfil.photo = perfil.fotoURL;
            }

            if (estado && estado !== perfil.estado) {
              return false;
            }

            return elecciones.includes(perfil.election);
          });

          return perfiles;
        })
      });
    }

    if (comisiones) {
      this.set('slider.title', 'Comisiones de Postulación');
      return this.store.query('election', {
        institution: comisiones
      }).then((elecciones) => {
        return elecciones;
      });
    }

    return this.store.findAll(modelName, { reload: true });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('allProfiles', model.toArray());
    controller.set('config', model.firstObject);
    controller.set('slider', this.slider);
    controller.set('modelName', this.modelName);
    controller.set('embed', this.controllerApplication.embed);
  }
});
