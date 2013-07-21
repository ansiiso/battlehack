angular.module('app').controller('blogPageCtrl', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    
    $scope.title = "Apply For Your VA Health Benefits or Update Your Information";
    
    $http.get('/recording').success(function(data) {
	if(data){
	    $scope.recordings = data;
	}
    });
    
}]);

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( $email ) ) {
	return false;
    } else {
	return true;
    }
}

function PostController($scope, $http) {
    
    $scope.postSubscriber = function() {
	
	if (!validateEmail($scope.email)) {
	    $('#subscriberEmail').addClass("error");
	    $('#subscriberEmail').removeClass("success");
	} else {
	    $('#subscriberEmail').removeClass("error");
	    $('#subscriberEmail').addClass("success");
	    $.ajax({
		type: 'POST',
		url: '/subscribe',
		data: {'email' : $scope.email},
		dataType: 'json',
		success: function() {}
	    });
	}
        // $http({
	//     method : 'POST',
	//     url : '/subscribe',
	//     data : $scope.email,
	//     dataType: 'json',
	//     success: function() {}
        //     }    
	// );
    };
    
}

// angular.module('app').controller('PostController', ['$scope', '$http', function ($scope, $http) {
//     'use strict';

//     $scope.person = {};
//     $scope.postSubscriber = function() {
//         $http(
// 	    {
// 		method : 'POST',
// 		url : '/save',
// 		data : $scope.person
//             }
// 	);
// 	console.log($scope.person);
//     };

// }]);


