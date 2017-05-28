app.controller('adminCtrl', function($state) {
    $state.go('admin.ausers');
});

app.controller('adminDashCtrl', function($scope, $state, AdminService) {
    $scope.users = AdminService.getUsers();
    $scope.edit = function(u) {
        $state.go('admin.aedit', {user_id: u._id});
    };
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

app.controller('adminEditUserCtrl', function($scope, $state, $stateParams, AdminService) {
    AdminService.get($stateParams.user_id).$promise.then(function(u) {
        $scope.user = u;
        if(u.manager)
            $state.go('admin.aedit.emanager');
    });
    $scope.r = true;
    $scope.send = function() {
        AdminService.updateUser($scope.user, function() {
            $scope.r = true;
            $state.go('admin.ausers');
        }, function() {
            $scope.r = false;
        });
    };
    $scope.showHideUsers = function() {
        if($scope.user.manager)
            $state.go('admin.aedit.emanager');
        else
            $state.go('admin.aedit');
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
                        if($scope.selection[i])
                            selected.push(usersList[i]._id);
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

app.controller('adminEditManagerCtrl', function($scope, $state, AdminService, managerService) {
    managerService.getUserList($scope.user._id).$promise.then(function(l) {
        $scope.pre_selected = l;
        AdminService.getUsers().$promise.then(function(usersList) {
            $scope.usersList = usersList;
            $scope.selection = new Array($scope.usersList.length);
            for(i = 0; i < $scope.selection.length; i++) {
                if(l.includes(usersList[i]._id))
                    $scope.selection[i] = true;
                else
                    $scope.selection[i] = false;
            }
            $scope.send = function() {
                AdminService.removeUserList($scope.user._id, function() {
                    var selected = new Array();
                    for(i = 0; i < $scope.selection.length; i++)
                        if($scope.selection[i])
                            selected.push(usersList[i]._id);
                    AdminService.addUsersList($scope.user.login, selected);
                });
                AdminService.updateUser($scope.user, function() {
                    $scope.r = true;
                    $state.go('admin.ausers');
                }, function() {
                    $scope.r = false;
                });
            };
        });
    });
});
