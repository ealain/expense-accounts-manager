app.controller('managerCtrl', function($state) {
    $state.go('manager.mdashboard');
});

app.controller('managerDashCtrl', function($scope, $state, managerService) {
    managerService.getUserList().$promise.then(function(usersList) {
        $scope.users = [];
        usersList.forEach(function(u_id) {
            console.log(u_id);
            managerService.getUser(u_id).$promise.then(function(u) {
                $scope.users.push(u);
            });
        });
    });
});
