'use strict';

app.controller('userEditCtrl', function($scope, $http) {

    $scope.addNote = function() {
        $http({
	    method: 'POST',
	    data: angular.toJson($scope.note),
	    url: '/notes'
	}).then(function success(res) {
	    console.log('Post successful: ' + res.data.success);
	}, function error(res) {
	    console.log('Error happened posting data');
	});
    };
});
