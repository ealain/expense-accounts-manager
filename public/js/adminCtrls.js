app.controller('adminDashCtrl', function($scope, AdminService) {
    $scope.users = AdminService.getUsers();
});

app.controller('adminAddUserCtrl', function($scope, $state, AdminService) {
    $scope.user = {
	admin: false,
	manager: false
    };
    $scope.r = true;
    $scope.send = function() {
	AdminService.addUser($scope.user, function() {
	    $scope.r = true;
	    $state.go('admin.users');
	}, function() {
	    $scope.r = false;
	});
    };
});

