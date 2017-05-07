app.controller('adminCtrl', function($scope, AdminService) {
    $scope.users = AdminService.getUsers();
});
