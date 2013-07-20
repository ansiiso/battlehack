angular.module('app', [])

// Module loading
// --------------
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  'use strict';

    var DEFAULT_PATH = "404";

    $routeProvider.when('/home', {

      templateUrl: '/javascripts/tmpl/home.html',
      controller : 'homeCtrl',

    }).when('/404', {
      templateUrl: '/javascripts/tmpl/404.html',
      controller : 'missingPageCtrl',
    })


    .otherwise({
      redirectTo : DEFAULT_PATH,
    });

}]);