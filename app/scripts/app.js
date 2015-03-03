'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'xeditable',
    'ui.bootstrap',
    'google-maps'

  ])

  .run(function(editableOptions, $rootScope, $location, $cookieStore){
    editableOptions.theme = 'bs3';

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      //Si esta desconectado y intenta entrar a menu lo enviamos a login
      if($cookieStore.get('estaConectado')== false || $cookieStore.get('estaConectado') == null) {
        if(next.templateUrl == 'views/menu.html' || next.templateUrl == 'views/peidodos.html'||next.templateUrl == 'views/horario.html'
          ||next.templateUrl == 'views/tiposdecomida.html'){
          $location.path('/login');
        }
      }
      else{
        var usuario = $cookieStore.get('user');
        //SI esta conectado y intenta entrar al login lo enviamos a menu
        if(next.templateUrl == 'views/login.html'){
          $location.path('/menu')
        }
      }
    });
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/alertas', {
        templateUrl: 'views/alertas.html',
        controller: 'AlertasCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
