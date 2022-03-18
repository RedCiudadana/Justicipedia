import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  queryParams: {
    comission: {
      refreshModel: true
    }
  },

  model(params = {}) {
    return RSVP.hash({
      tachas: this.store.query('tacha', params),
      gradacion: this.store.query('gradacion', params).then((gradacion) => {
        let conceptos = gradacion.uniqBy('concepto').mapBy('concepto');
        let perfilesId = gradacion.uniqBy('profile.id').mapBy('profile.id');
        let perfiles = perfilesId.map(function(perfil) {
          let _dataPerfil = gradacion.filterBy('profile.id', perfil);
          let _data = {
            perfil: gradacion.findBy('profile.id', perfil),
          };

          let total = 0;
          conceptos.forEach((concepto) => {
            let conceptoData = _dataPerfil.findBy('concepto', concepto);
            _data[concepto] = conceptoData.puntuacion;
            total = total + parseFloat(conceptoData.puntuacion);
          });

          _data['total'] = total;

          return _data;
        });

        console.log(perfiles); 
        return {
          perfiles,
          conceptos
        };
      }),
    });
  },
});
