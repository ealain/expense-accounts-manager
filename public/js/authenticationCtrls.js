'use strict'

app.controller('loginCtrl', function($scope, $http, AuthService) {
    $scope.login = AuthService.login;
});

app.controller('logoutCtrl', function(AuthService) {
    AuthService.logout();
});

app.controller('signupCtrl', function($scope, AuthService) {
    $scope.send = AuthService.signup;
});
