app.controller('billManagerCtrl', function($scope, notesData) {
    $scope.notes= ["Note 1", "Note 2", "Note 3"];
    notesData.set($scope.notes);
    $scope.notesData = notesData;
});
