'use strict'

app.controller('loginCtrl', function($scope, $http) {

    $scope.send = function() {
	$http.post('/login', angular.toJson($scope.user))
	    .then(function() {},
		  function() {console.error('Error submitting login')})
    };

});
