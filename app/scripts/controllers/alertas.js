'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AlertasCtrl
 * @description
 * # AlertasCtrl
 * Controller of the appApp AlertasCtrl
 */
angular.module('appApp')
  .factory("menuService", ["$rootScope", function($rootScope) {
    "use strict";

    return {
      menu: function() {
        $rootScope.globalMenu;
      },
      setMenu: function(menu) {
        $rootScope.globalMenu = menu;
      }
    };

  }])
  .controller('AlertasCtrl', function ($scope, menuService, $q, $filter, $http, TareasResourse, $timeout ) {
    $scope.tipos;
    $scope.estados;

    menuService.setMenu([{href:"#", label:"Dropdown",
      dropdown:[{href:"/edit", label:"Edit"}]},
      {href:'/', label:'test'}]);

    $scope.bodyText = "Some text";


    /****
     * AQUI OBTENEMOS LOS TIPOS DE ALERTAS
     *
     * */
    var inicioSesion = $q.defer();

    inicioSesion.promise.then(usrASesion);
    //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
    function usrASesion(usr){
      if(usr.nombre != 'wrong'){
        $scope.tipos = usr;
      }else{
        $scope.errormsj= true;
      }
    };

    $scope.iniciarSesion = function(){
      //Enciptamos el passowrd
      //var crypt = md5.createHash($scope.usuario.txtpass);
      var usr =   TareasResourse.getTipos.all()
        .$promise.then(function(usr){
          inicioSesion.resolve(usr);
        });

    };
    $scope.iniciarSesion();

    $scope.showTipos = function(alerta) {
      var selected = [];
      if(alerta!='undefine') {
        selected = $filter('filter')($scope.tipos, {idtiposalerta: alerta.idtiposalerta});
      }
      return selected.length ? selected[0].nombre : alerta.idtiposalerta;
    };


    /***************************************************************
     * AQUI OBTENEMOS ESTADOS POSIBLES DE LAS ALERTAS
     *
     * ************************************************************/
    var inicioEstados = $q.defer();

    inicioEstados.promise.then(usrEstado);
    //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
    function usrEstado(usr){
      if(usr.nombre != 'wrong'){
        $scope.estados = usr;
      }else{
        $scope.errormsj= true;
      }
    };

    $scope.iniciarEstado = function(){
      //Enciptamos el passowrd
      //var crypt = md5.createHash($scope.usuario.txtpass);
      var usr =   TareasResourse.getEstados.all()
        .$promise.then(function(usr){
          inicioEstados.resolve(usr);
        });

    };
    $scope.iniciarEstado();

    $scope.showEstado = function(alerta) {
      var selected = [];
      if(alerta!='undefine') {alert($scope.estados.length)
        selected = $filter('filter')($scope.estados, {idestado: alerta.estado});
      }
      return selected.length ? selected[0].nombre : alerta.idtiposalerta;
    };
/*************************************************************************************
 *
 * Editar Alerta
 *
 * ***********************************************************************************/


    $scope.alertaComentario = '';
    $scope.alertaEstado = '';
    $scope.alertaId = '';

    $scope.editarAlerta = function(alerta) {
      $scope.alt = alerta;
      $scope.alertaComentario = alerta.comentario;
      $scope.alertaEstado = alerta.tipos;
      $scope.alertaId = alerta.idalerta;
    };

    $scope.alertas = TareasResourse.getAlert.all();



    $scope.showMap = false;

    $scope.map = { center: { latitude: 18, longitude: -69 }, zoom: 8 };


    $scope.marker = {
      id: 0,
      coords: {
        latitude: 45,
        longitude: -73
      }};


    $scope.actualizar = function(alerta){
      $scope.showMap = true;

      $scope.marker.coords.latitude = alerta.latitud;
      $scope.marker.coords.longitude = alerta.longitud;
      $scope.map.center.latitude  = alerta.latitud;
      $scope.map.center.longitude  = alerta.longitud;
      $scope.map.zoom = 16;


    };


    /**************************************************************************************
     * DropDown
     * ********************************************************************/



    /**************************************************************************************
     * DropDown
     * ********************************************************************/




//ordenar
    $scope.editar = false;



    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      if(id==-1){
        TareasResourse.agregar.nuevaTarea({
          nombre:data.nombre,
          descripcion:data.descripcion,
          precio:data.precio,
          tipo:data.tipo
        });
      }else{
        TareasResourse.actualizar.tarea({
          id:id,
          nombre:data.nombre,
          descripcion:data.descripcion,
          precio:data.precio,
          tipo:data.tipo});

      }

      $scope.alertas = TareasResourse.getAlert.all();
      $scope.alertas = TareasResourse.getAlert.all();
    };
    $scope.removeUser = function(index) {
      TareasResourse.eliminar.tarea({
        id:index
      });

      $scope.alertas = TareasResourse.getAlert.all();
    };


    $scope.agregarTarea = function(){
      TareasResourse.agregar.nuevaTarea({
        nombre:$scope.txtnombre,
        descripcion:$scope.txtdescripcion,
        precio:$scope.txtprecio,
        tipo:$scope.txttipo
      });
      $scope.alertas = TareasResourse.getAlert.all();
      $scope.alertas = TareasResourse.getAlert.all();
    };

    $scope.actualizarTarea = function(){
      TareasResourse.actualizar.tarea({
        id:$scope.tareaActual.id,
        nombre:$scope.txtnombre,
        descripcion:$scope.txtdescripcion,
        precio:$scope.txtprecio,
        tipo:$scope.txttipo});

      $scope.alertas = TareasResourse.getAlert.all();
    };



    $scope.editar = function(tarea){
      // $scope.editar = true;
      // $scope.tareaActual=tarea;
      $scope.txtnombre = tarea.nombre;
      $scope.txtdescripcion = tarea.descripcion;
      $scope.txtprecio = tarea.precio;
      $scope.txttipo = tarea.tipo;
    };
    $scope.ordenarPor = function(orden) {
      $scope.ordenSeleccionado = orden;
    };
//-------------------------------------------------------------------

    $scope.addUser = function() {
      $scope.inserted = {
        id: -1,
        nombre: '',
        descripcion: '',
        precio: null,
        tipo: null
      };
      $scope.alertas.push($scope.inserted);
    };


  })


;





