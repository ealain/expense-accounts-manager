'use strict';

app.controller('userDashCtrl', function($scope, $http, notesData) {
    $http({
	method: 'GET',
	url: '/notes'
    }).then(function success(res) {
	$scope.notes = res.data;
    }, function error(res) {
	console.log('Error GET');
    });

    $scope.del = function(noteId) {
	console.log('Entering');
	$http({
	    method: 'DELETE',
	    url: '/notes/' + noteId
	}).then(function success(res) {
	    console.log("Deleted: " + noteId);
	}, function error(res) {
	    console.log('Error DELETE');
	});
    }
});
