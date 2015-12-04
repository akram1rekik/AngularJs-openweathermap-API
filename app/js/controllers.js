
var weatherControllers = angular.module('weatherControllers', []);

weatherControllers.run(function($rootScope){
  $rootScope.cities=[];
});

weatherControllers.controller('CityListCtrl', ['$rootScope', '$scope', '$http', '$location',
  function($rootScope, $scope, $http, $location) {
    // Get cities for add city list
    $http.get('data/cities.json').success(function(data) {
        $scope.all_cities = data;
    });

    // Add city
    $scope.add_city = function(id){
      var dup = false;
      $rootScope.cities.forEach(function(city){
        if (city.id==id) {
          dup = true;
        }
      });
      if (!dup){
        var url = 'http://api.openweathermap.org/data/2.5/weather?id=' + id + '&units=metric&APPID=2de143494c0b295cca9337e1e96b00e0'
        $http.get(url).success( function(data){
          $rootScope.cities.push(data);
        });
      }
    };

    //Remove city
    $scope.remove_city = function(index){
      $rootScope.cities.splice(index, 1);
    };
  }]);

weatherControllers.controller('CityDetailCtrl', ['$scope', '$routeParams', '$http', 
  function($scope, $routeParams, $http) {
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + $routeParams.id + '&cnt=6&units=metric&APPID=2de143494c0b295cca9337e1e96b00e0'
    $http.get(url).success( function(data){
      $scope.forecast = data;
      // Add day of week info to forecast
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var today = new Date();
      for (var i=0; i<$scope.forecast.list.length; i++) {
        $scope.forecast.list[i].day = days[(today.getDay()+i+1)%7];
      };
    });
  }]);