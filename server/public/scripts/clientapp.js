var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  //partials;
  $routeProvider.
    when('/animals', {
      templateUrl: '/public/views/partials/animals.html',
      controller: 'animalController'
    }).
    when('/favorites', {
      templateUrl: '/public/views/partials/favorites.html',
      controller: 'favoritesController'
    }).
    when('/home', {
      templateUrl: '/public/views/partials/home.html',
      controller: 'homeController'
    }).
    otherwise({
      redirectTo: "/home"
    });
}]);
