'use strict';

app.controller('userEdit', function($scope, $http, notesData) {
    $scope.addNote = function() {
        $http({
	    method: 'POST',
	    data: angular.toJson($scope.note),
	    url: '/note'
	}).then(function success(res) {
	    console.log('Posted ' + angular.toJson($scope.note));
	}, function error(res) {
	    console.log('Error');
	});
    };
});
