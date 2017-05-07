'use strict';

app.controller('userCreateCtrl', function($scope, $state, NotesService) {
    $scope.addNote = function() {
	NotesService.add($scope.note, function() {
	    // Popup note ajoutée
	    $state.go('user.dashboard');
	});
    };
});
