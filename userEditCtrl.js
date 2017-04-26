'use strict';

app.controller('userEdit', function($scope, notesData) {
    $scope.addItem = function() {
	notesData.add($scope.addMe);
    };
});
