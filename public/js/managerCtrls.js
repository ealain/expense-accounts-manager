app.controller('managerCtrl', function($state) {
    $state.go('manager.mdashboard');
});

app.controller('managerDashCtrl', function($scope, $state, managerService) {
    managerService.getUserList().$promise.then(function(usersList) {
        $scope.users = [];
        $scope.notes = {};
        usersList.forEach(function(u_id) {
            managerService.getUser(u_id).$promise.then(function(u) {
                $scope.users.push(u);
            });

            managerService.getUserNotes(u_id).$promise.then(function(n) {
                $scope.notes[u_id] = n;
            });
            $scope.approve = function(uid, nindex) {
                console.log($scope.notes[uid][nindex]);
                managerService.approveUserNote($scope.notes[uid][nindex]);
            }
        });
    });
});
