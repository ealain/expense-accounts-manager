var isoStringToDate = function(d) {
    var b = d.split(/\D/);
    return new Date(b[0], --b[1], b[2], b[3]||0, b[4]||0, b[5]||0, b[6]||0);
};

app.controller('managerCtrl', function($state) {
    $state.go('manager.mdashboard');
});

app.controller('managerDashCtrl', function($scope, $state, managerService) {
    $scope.view = function(n) {
        $state.go('manager.mnotesdetails', {note_id: n._id});
    };
    managerService.getUserList().$promise.then(function(usersList) {
        $scope.users = [];
        $scope.notes = {};
        usersList.forEach(function(u_id) {
            managerService.getUser(u_id).$promise.then(function(u) {
                $scope.users.push(u);
            });

            managerService.getUserNotes(u_id).$promise.then(function(notes) {
                for(let n of notes) {
                    n.day = isoStringToDate(n.date).getDate();
                    n.month = isoStringToDate(n.date).getMonth() + 1;
                    n.year = isoStringToDate(n.date).getFullYear();
                }
                $scope.notes[u_id] = notes;
            });
        });
    });
});

app.controller('managerNotesCtrl', function($scope, $state, managerService) {
    $scope.view = function(n) {
        $state.go('manager.mnotesdetails', {note_id: n._id});
    };
    managerService.getUserList().$promise.then(function(usersList) {
        $scope.users = [];
        $scope.notes = {};
        usersList.forEach(function(u_id) {
            managerService.getUser(u_id).$promise.then(function(u) {
                $scope.users.push(u);
            });

            managerService.getUserNotes(u_id).$promise.then(function(notes) {
                for(let n of notes) {
                    n.day = isoStringToDate(n.date).getDate();
                    n.month = isoStringToDate(n.date).getMonth() + 1;
                    n.year = isoStringToDate(n.date).getFullYear();
                }
                $scope.notes[u_id] = notes;
            });
        });
        $scope.unlock = function(note) {
            managerService.approveUserNote(note);
            $state.go('manager.mdashboard');
        };
    });
});

app.controller('managerNotesDetailsCtrl', function($scope, $state, $stateParams, managerService) {
    managerService.getNoteDetails($stateParams.note_id).$promise.then(function(n) {
        n.day = isoStringToDate(n.date).getDate();
        n.month = isoStringToDate(n.date).getMonth() + 1;
        n.year = isoStringToDate(n.date).getFullYear();
        $scope.note = n;
    });
    $scope.approve = function() {
        managerService.approveUserNote($scope.note);
        $state.go('manager.mdashboard');
    }
});
