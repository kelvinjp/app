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
    'angular-md5',
    'uiGmapgoogle-maps',
    'angularUtils.directives.dirPagination'

  ])



  .run(function(editableOptions, $rootScope, $location, $cookieStore,$filter){
    editableOptions.theme = 'bs3';

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      //Si esta desconectado y intenta entrar a menu lo enviamos a login
      if($cookieStore.get('estaConectado')== false || $cookieStore.get('estaConectado') == null) {
        if(next.templateUrl == 'views/alertas.html' || next.templateUrl == 'views/pendientes.html'||next.templateUrl == 'views/registrados.html'
          ||next.templateUrl == 'views/alta2.html'||next.templateUrl == 'views/declinados.html'
          ||next.templateUrl == 'views/editarusuario.html'||next.templateUrl == 'views/addVehiculo.html'
          ||next.templateUrl == 'views/vehiculos.html'){
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

  .config(
  function ($routeProvider) {
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
      .when('/pendientes', {
        templateUrl: 'views/pendientes.html',
        controller: 'pendientesCtrl'
      })
      .when('/registrados', {
        templateUrl: 'views/registrados.html',
        controller: 'registradosCtrl'
      })
      .when('/registrar', {
        templateUrl: 'views/alta2.html',
        controller: 'Alta2Ctrl'
      })
      .when('/alta', {
        templateUrl: 'views/alta.html',
        controller: 'AltaCtrl'
      })
      .when('/declinados', {
        templateUrl: 'views/declinados.html',
        controller: 'declinadosCtrl'
      })
      .when('/registrado', {
        templateUrl: 'views/registrado.html',
        controller: 'AltaCtrl'
      })
      .when('/Estados', {
        templateUrl: 'views/EditEstado.html',
        controller: 'EditablerowCtrl'
      })
      .when('/membresias', {
        templateUrl: 'views/membresias.html',
        controller: 'membresiasCtrl'
      })
      .when('/perfil', {
        templateUrl: 'views/editarusuario.html',
        controller: 'EditarusuarioCtrl'
      })
      .when('/addVehiculo', {
        templateUrl: 'views/addVehiculo.html',
        controller: 'addVehiculoCtrl'
      })
      .when('/vehiculos', {
        templateUrl: 'views/vehiculos.html',
        controller: 'VehiculosCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
    return {
      response: function (response) {
        if (response.status === 401) {
          console.log("Response 401");
        }
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          console.log("Response Error 401", rejection);
          alert('Login Incorrecto.');
          // $location.path('/login').search('returnTo', $location.path());
        }
        return $q.reject(rejection);
      }
    }
  }])
  .config(['$httpProvider', function ($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
  }]);
