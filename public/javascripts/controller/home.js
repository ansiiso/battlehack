angular.module('app').controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
  'use strict';

  $(document).ready(function(){
      $('.bxslider').bxSlider({
	  auto: true,
	  autoControls: true,
	  pause: 3000,
	  slideMargin: 20
      });
  });
  
}]);
