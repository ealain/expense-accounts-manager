'use strict'

app.controller('loginCtrl', function($scope, $http, AuthService) {
    $scope.login = AuthService.login;
});
