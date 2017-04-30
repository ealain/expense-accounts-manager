'use strict'

app.controller('signupCtrl', function($scope, $http) {
    $scope.send = function() {
	$http.post('/signup', angular.toJson($scope.user))
	    .then(function() {
	    }, function() {
		console.error('Error submitting sign up information')
	    });
    };
});
