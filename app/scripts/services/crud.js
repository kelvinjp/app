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
    getTipos: $resource('http://alertapp-kelvinjp.c9.io/getTiposAlert',{},{
      all: {method: 'GET',isArray:true}
    }),
    getEstados: $resource('http://alertapp-kelvinjp.c9.io/getEstados',{},{
      all: {method: 'GET',isArray:true}
    }),

    addCliente: $resource('http://alertapp-kelvinjp.c9.io/addUser',{},{
      nuevoCliente: {method: 'POST', params:{
        nombres:'@nombres',
        apellidos:'@apellidos',
        username:'@username',
        password:'@password',
        telefono:'@telefono',
        direccion:'@direccion',
        cedula:'@cedula',
        idtipouser:'@idtipouser',
        email:'@email'

      }
      }
    }),
    editar: $resource('http://alertapp-kelvinjp.c9.io/editUser',{},{
      cliente: {method: 'POST', params:{
        nombres:'@nombres',
        apellidos:'@apellidos',
        username:'@username',
        password:'@password',
        telefono:'@telefono',
        direccion:'@direccion',
        cedula:'@cedula',
        idtipouser:'@idtipouser',
        email:'@email'
      }
      }
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


