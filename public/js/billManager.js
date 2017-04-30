'use strict';

var app = angular.module('billManager', ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
	.when('/dashboard', {
	    controller: 'userDashCtrl',
	    templateUrl: 'views/dashboard.html'
	})
	.when('/note', {
	    controller: 'userEdit',
	    templateUrl: 'views/edit.html'
	})
	.when('/signup', {
	    controller: 'signupCtrl',
	    templateUrl: 'views/signup.html'
	})
	.otherwise({
	    controller: 'loginCtrl',
	    templateUrl: 'views/login.html'
	});

    $locationProvider.html5Mode(true);
})
