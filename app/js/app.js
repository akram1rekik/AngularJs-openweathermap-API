'use strict';

var weatherApp = angular.module('weatherApp', [
  'ngRoute',
  'weatherControllers'
]);

weatherApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/cities', {
        templateUrl: 'partials/city-list.html',
        controller: 'CityListCtrl'
      }).
      when('/cities/:id', {
        templateUrl: 'partials/city-detail.html',
        controller: 'CityDetailCtrl'
      }).
      otherwise({
        redirectTo: '/cities'
      });
  }]);