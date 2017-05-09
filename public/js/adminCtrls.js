app.controller('adminDashCtrl', function($scope, AdminService) {
    $scope.users = AdminService.getUsers();
});

app.controller('adminAddUserCtrl', function($scope) {
});

