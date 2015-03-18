'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VehiculosCtrl
 * @description
 * # VehiculosCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('VehiculosCtrl', function ($scope) {
    $scope.vehiculos = [{marca:'Izusu', modelo:'DMax', fecha:'2014', placa:'L523533', chasis:'DKL32345233423'}];
  });
