'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AlertasCtrl
 * @description
 * # AlertasCtrl
 * Controller of the appApp AlertasCtrl
 */
angular.module('appApp')
  .controller('AlertasCtrl', function ($scope, $q, $filter, $http, TareasResourse, $timeout ) {
    $scope.statuses ='';

    var inicioSesion = $q.defer();

    inicioSesion.promise.then(usrASesion);
    //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
    function usrASesion(usr){
      if(usr.nombre != 'wrong'){
        $scope.statuses = usr;
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

    $scope.showStatus = function(tarea) {
      var selected = [];
      if(tarea.idtiposalerta) {
        selected = $filter('filter')($scope.statuses, {value: tarea.idtiposalerta});
      }
      return selected.length ? selected[0].nombre : tarea.idtiposalerta;
    };

    $scope.alertaComentario = '';
    $scope.alertaEstado = '';
    $scope.alertaId = '';

    $scope.verAlerta = function(tarea) {
      $scope.alertaComentario = tarea.comentario;
      $scope.alertaEstado = tarea.estado;
      $scope.alertaId = tarea.idalerta;
    };


    $scope.alertas = TareasResourse.getAlert.all();



    $scope.vehiculo = $scope.alertas[0];
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

      $scope.marker.coords.latitude = vehiculo.latitud;
      $scope.marker.coords.longitude = vehiculo.longitud;
      $scope.map.center.latitude  = vehiculo.latitud;
      $scope.map.center.longitude  = vehiculo.longitud;
      $scope.map.zoom = 16;


    };


/**
 * Mostrando estus
 * */




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


  });
