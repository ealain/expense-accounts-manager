'use strict'

app.controller('signupCtrl', function($scope, AuthService) {
    $scope.send = AuthService.signup;
});
