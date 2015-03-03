'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, md5) {
    var inicioSesion = $q.defer();
    $scope.errormsj =false;

    inicioSesion.promise.then(usrASesion);
    //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
    function usrASesion(usr){
      if(usr.nombre != 'wrong'){
        $scope.usrConectado.nombre = usr.nombres;
        $scope.usrConectado.user = usr.username;
        $scope.usrConectado.estaConectado = true;

        $log.info($scope.usrConectado);

        $cookieStore.put('estaConectado',true);
        $cookieStore.put('user',usr);

        $location.path('/menu');
      }else{
        $scope.errormsj= true;
      }


    };

    $scope.iniciarSesion = function(){
      //Enciptamos el passowrd
      //var crypt = md5.createHash($scope.usuario.txtpass);

      var usr =   TareasResourse.iniciar.sesion({username:$scope.usuario.txtuser, password:$scope.usuario.txtpass})
        .$promise.then(function(usr){
          inicioSesion.resolve(usr);
        });

    };
  });

