angular.module('app').controller('profileCtrl', ['$scope', function ($scope) {
  'use strict';


  $scope.user = {
  	title: "Tell us your story",
  	firstName: "Randy",
  	lastName: "Stone",
  	email: "pparker@gmail.com",
		status: "Veteran",
  };



	$scope.submitForm = function () {
			console.log($scope.user);
	    console.info("Here I should implement the logic to send a request to the server.");
	}

	/*

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

	*/
}]);
