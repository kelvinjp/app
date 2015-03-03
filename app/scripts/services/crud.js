'use strict';

/**
 * @ngdoc service
 * @name appApp.crud
 * @description
 * # crud
 * Service in the appApp.
 */
angular.module('appApp')
  .factory('TareasResourse', function ($resource) {
  var factory = {

    iniciar: $resource('https://alertapp-kelvinjp.c9.io/login',{},{
      sesion: {method: 'POST', params:{
        username:'@username',
        password:'@password'}
      }
    }),
    getAlert: $resource('http://alertapp-kelvinjp.c9.io/getAlert',{},{
      all: {method: 'GET',isArray:true}
    }),


    /**************************************************************
     *
     * Viejo
     *
     **********************************************************/
    obtenerTareas: $resource('http://104.131.121.228:8080/API4-0.1.2/menu',{},{
      todas: {method: 'GET', isArray: true}
    }),
    obtenerTiposdemedidas: $resource('http://104.131.121.228:8080/API4-0.1.2/tiposdecomida',{},{
      todas: {method: 'GET', isArray: true}
    }),
    agregar: $resource('http://104.131.121.228:8080/API4-0.1.2/agregarItem',{},{
      nuevaTarea: {method: 'GET', params:{
        nombre:'@nombre',
        descripcion:'@descripcion',
        precio:'@precio',
        tipo:'@tipo'}

      }
    }),
    agregartipodecomida: $resource('http://104.131.121.228:8080/API4-0.1.2/agregartiposdecomida',{},{
      tdc: {method: 'GET', params:{
        text:'@text'}
      }
    }),
    actualizar: $resource('http://104.131.121.228:8080/API4-0.1.2/editarItem',{},{
      tarea: {method: 'GET', params:{id:'@id', nombre:'@nombre', descripcion:'@descripcion', precio:'@precio', tipo:'@tipo'}
      }
    }),
    actualizartipodecomida: $resource('http://104.131.121.228:8080/API4-0.1.2/editartiposdecomida',{},{
      tdc: {method: 'GET', params:{
        value:'@value',
        text:'@text'}
      }
    }),
    eliminar: $resource('http://104.131.121.228:8080/API4-0.1.2/eliminarItem',{},{
      tarea: {method: 'GET', params:{
        id:'@id'}}

    }),
    eliminartipodecomida: $resource('http://104.131.121.228:8080/API4-0.1.2/eliminartiposdecomida',{},{
      tdc: {method: 'GET', params:{
        value:'@value'}}

    }),

    getCliente: $resource('http://104.131.121.228:8080/API4-0.1.2/getCliente',{},{
      bycorreo: {method: 'GET', params:{
        correo:'@correo'
      }, isArray: false
      }
    }),
    addCliente: $resource('http://104.131.121.228:8080/API4-0.1.2/addCliente',{},{
      nuevoCliente: {method: 'GET', params:{
        nombre:'@nombre',
        apellido:'@apellido',
        correo:'@correo',
        direccion:'@direccion',
        telefono:'@telefono'}

      }
    }),

    obtenerPedidos: $resource('http://104.131.121.228:8080/API4-0.1.2/pedidos',{},{
      todos: {method: 'GET', isArray: true}
    }),
    obtenerHorario: $resource('http://104.131.121.228:8080/API4-0.1.2/horario',{},{
      actual: {method: 'GET', isArray: false}
    }),

    disponible: $resource('http://104.131.121.228:8080/API4-0.1.2/horarioDisponible',{},{
      ahora: {method: 'GET', isArray: false}
    }),


    addPedido: $resource('http://104.131.121.228:8080/API4-0.1.2/rest/emp/create',{},{
      nuevoPedido: {method: 'POST', params:{
        orden:'@orden'

      }
      }
    })




  };
  return factory;

});

