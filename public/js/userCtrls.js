'use strict';

app.controller('userCtrl', function($state) {
    $state.go('user.udashboard');
});

app.controller('userDashCtrl', function($scope, NotesService) {
    $scope.notes = NotesService.get();

    $scope.edit = function(note) {
	$state.go('user.edit', {note_id: note.id});
    }
});

app.controller('userCreateCtrl', function($scope, $state, NotesService) {
    $scope.addNote = function() {
	NotesService.add($scope.note, function() {
	    // Popup note ajoutée
	    $state.go('user.udashboard');
	});
    };
});

app.controller('userEditCtrl', function($scope, $state, $stateParams, $http, NotesService) {

    NotesService.getOne($stateParams.note_id, function(n) {
	$scope.note = n;
    });

    $scope.update = function() {
	NotesService.update($scope.note, function() {
	    // Popup note modifiée
	    $state.go('user.udashboard');
	});
    };

    $scope.del = function() {
	NotesService.del($scope.note, function() {
	    // Popup note supprimée
	    $state.go('user.udashboard');
	});
    }
});
