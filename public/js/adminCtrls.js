app.controller('adminCtrl', function($state) {
    $state.go('admin.ausers');
});

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
	    $state.go('admin.ausers');
	}, function() {
	    $scope.r = false;
	});
    };
    $scope.showHideUsers = function() {
        if($scope.user.manager)
	    $state.go('admin.adduser.manager');
        else
            $state.go('admin.adduser');
    };
});

app.controller('adminAddManagerCtrl', function($scope, $state, AdminService) {
    AdminService.getUsers().$promise.then(function(usersList) {
	$scope.usersList = usersList;
	$scope.selection = new Array($scope.usersList.length);
	for(i = 0; i < $scope.selection.length; i++)
	    $scope.selection[i] = false;
	$scope.send = function() {
	    AdminService.addUser($scope.user, function() {
		if($scope.user.manager) {
		    var selected = new Array();
		    for(i = 0; i < $scope.selection.length; i++)
			if($scope.selection[i]) {
			    console.log(usersList[i]._id);
			    selected.push(usersList[i]._id);
			    console.log(selected);
			}
		    AdminService.addUsersList($scope.user.login, selected);
		}
		$scope.r = true;
		$state.go('admin.ausers');
	    }, function() {
		$scope.r = false;
	    });
	};
    });
});
