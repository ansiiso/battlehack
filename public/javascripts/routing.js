angular.module('app', [])

// Module loading
// --------------
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  'use strict';

    var DEFAULT_PATH = "/";

    $routeProvider.when('/', {

      templateUrl: '/javascripts/tmpl/home.html',
      controller : 'homeCtrl',

    })

    .when('/404', {
      templateUrl: '/javascripts/tmpl/404.html',
      controller : 'missingPageCtrl',
    })

    .when('/home', {
      templateUrl: '/javascripts/tmpl/home.html',
      controller : 'homeCtrl',
    })

    .when('/profile', {
      templateUrl: '/javascripts/tmpl/profile.html',
      controller : 'profileCtrl',
    })

    .when('/blog', {
      templateUrl: '/javascripts/tmpl/blog.html',
      controller : 'blogPageCtrl',
    })


    .otherwise({
      redirectTo : DEFAULT_PATH,
    });

}]);