'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('NavCtrl', function ($scope, $cookieStore, $location) {

    var usuario = $cookieStore.get('user');
    $scope.estaConectado=$cookieStore.get('estaConectado');

    if(typeof usuario === 'undefined'){
      $scope.usrConectado = {nombre:"", user:'', admin: '', cliente:'', estaConectado:false};

      //Si Se encontro algo en las cookies
    }else{
      var adm = false;
      var clt = false;

      if(usuario.idtiposusuario == 0 ){
        adm = true;
      }else{
        clt = true;
      }

      $scope.usrConectado = {
        nombre: usuario.nombre,
        user: usuario.user,
        admin: adm,
        cliente: clt,
        estaConectado:true
      };
    }


    $scope.salir = function(){
      $scope.usrConectado = {nombre:"", user:'', admin: '', cliente:'', estaConectado:false};
      $cookieStore.remove('estaConectado');
      $cookieStore.remove('user');
      $location.path('/login');
      $route.reload();
    };
    $scope.cambiarIdioma = function(idioma){
      $translate.use(idioma);
    }
  });
