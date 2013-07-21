angular.module('app').controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
  'use strict';

  $(document).ready(function(){
      $('.bxslider').bxSlider({
	  auto: true,
	  autoControls: true,
	  pause: 7000,
	  slideMargin: 20
      });
  });
  
}]);
