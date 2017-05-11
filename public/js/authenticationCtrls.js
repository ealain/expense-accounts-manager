'use strict'

app.controller('loginCtrl', function($scope, $http, AuthService) {
    $scope.setwrongpwd = function setwrongpwd() {
	$scope.wrongpwd = true;
    };
    $scope.login = AuthService.login;
    $scope.wrongpwd = false;
});

app.controller('logoutCtrl', function(AuthService) {
    AuthService.logout();
});

app.controller('signupCtrl', function($scope, AuthService) {
    $scope.send = AuthService.signup;
});
