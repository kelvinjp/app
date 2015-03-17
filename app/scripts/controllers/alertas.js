'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AlertasCtrl
 * @description
 * # AlertasCtrl
 * Controller of the appApp AlertasCtrl
 */
angular.module('appApp')
  .controller('AlertasCtrl', function ($scope, $filter, $http, TareasResourse, $timeout ) {
    $scope.alertas = TareasResourse.getAlert.all();

    $scope.alerta = $scope.alertas[0];
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
