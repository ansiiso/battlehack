angular.module('app').controller('blogPageCtrl', ['$scope', '$http', function ($scope, $http) {
  'use strict';

  $scope.title = "Apply For Your VA Health Benefits or Update Your Information";

  $http.get('/recording').success(function(data) {
    if(data){
      $scope.recordings = data;
    }
  });
  
}]);
