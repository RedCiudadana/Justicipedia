import Route from '@ember/routing/route';

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
    page: { refreshModel: false },
    size: { refreshModel: false }
  },

  model({ model, sector }) {
    this.set('modelName', model);

    let modelName = this.resolver[model];
    if(sector) {
      return this.store.query(modelName, {
        sector: sector
      });
    }
    return this.store.findAll(modelName, { reload: true });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('allProfiles', model.toArray());
    controller.set('config', model.firstObject);
    controller.set('slider', slider[this.get('modelName')]);
  }
});
