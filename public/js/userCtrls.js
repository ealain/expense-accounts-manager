'use strict';

app.controller('userCtrl', function($state) {
    $state.go('user.udashboard');
});

app.controller('userDashCtrl', function($scope, NotesService) {
    $scope.notes = NotesService.get();

    $scope.edit = function(note) {
	$state.go('user.uedit', {note_id: note.id});
    }
});

app.directive('fileModel', function() {
    return {
        link: function(scope, element, attrbs) {
            element.bind('change', function(changeEvent) {
                scope.$apply(function() {
                    scope.file = changeEvent.target.files[0];
                })
            })
        }
    }
});

app.controller('userCreateCtrl', function($scope, $state, NotesService) {
    $scope.addNote = function() {
        NotesService.add($scope.note, $scope.file, function() {
            // Popup note ajoutée
            $state.go('user.udashboard');
        });
    };
});

app.controller('userEditCtrl', function($scope, $state, $stateParams, NotesService) {

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
    };

    $scope.remove = function(note, filename) {
        NotesService.remove(note, filename, function(note) {
            $scope.note = note;
        });
    };
});
