angular.module('app').controller('profileCtrl', ['$scope', function ($scope) {
  'use strict';

  	$scope.title = "Tell us your story";
  	$scope.user.name = "Randy";

	$scope.user.email = 'pparker@gmail.com';
	$scope.submitForm = function () {
	    console.info("Here I should implement the logic to send a request to the server.");
	}

	function form-controller($scope) {
		$scope.master = {};

		$scope.update = function(user) {
			$scope.master = angular.copy(user);
		};

		$scope.reset = function() {
			$scope.user = angular.copy($scope.master);
		};

		$scope.reset();
	}
}]);
