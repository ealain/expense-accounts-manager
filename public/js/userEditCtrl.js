'use strict';

app.controller('userEditCtrl', function($scope, $state, $stateParams, $http, NotesService) {

    $scope.note = NotesService.getOne($stateParams.note_id);

    $scope.update = function() {
	NotesService.update($scope.note, function() {
	    // Popup note modifiée
	    $state.go('user.dashboard');
	});
    };

    $scope.del = function() {
	NotesService.del($scope.note, function() {
	    // Popup note supprimée
	    $state.go('user.dashboard');
	});
    }
});
