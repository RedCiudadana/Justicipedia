import Route from '@ember/routing/route';
import config from '../../config/environment';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    if(model.profile._internalModel.modelName === 'institution') {
      controller.set('campos',{
        horario: 'Horario de atención',
        diasAtencion: 'Días de atención'
      });
    }

    if(model.profile._internalModel.modelName === 'profile') {
      controller.set('campos',
        {
          puesto: 'Puesto',
          profesion: 'Profesión',
          nocolegiado: 'No. Colegiado',
          estado: 'Estado'
        });
    }

    if(model.profile._internalModel.modelName === 'election') {
      controller.set('campos',
        {
          fechaEleccion: 'Fecha a realizarse la elección',
          fechaEleccionProyectada: 'Fecha proyectada de Comision de Postulacion',
          descripcion: 'Descripción'
        }
      );
    }

    controller.setProperties(model);
    controller.setProperties({
      disqusShortname: config.disqus.shortname,
      years: true,
      charge: true
    });
  }
});
