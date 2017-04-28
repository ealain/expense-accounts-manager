'use strict';

app.controller('userEdit', function($scope, notesData) {
    $scope.addNote = function() {
	notesData.add($scope.note);
    };
});
