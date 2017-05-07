'use strict';

app.controller('userDashCtrl', function($scope, NotesService) {
    $scope.notes = NotesService.get();

    $scope.edit = function(note) {
	$state.go('user.edit', {note_id: note.id});
    }
});
