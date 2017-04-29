'use strict';

app.controller('userDashCtrl', function($scope, NotesService) {
    $scope.notes = NotesService.get();

    $scope.del = function(note) {
	NotesService.del(note, function() {
	    var i = $scope.notes.indexOf(note);
	    $scope.notes.splice(i, 1);
	});
    }
});
