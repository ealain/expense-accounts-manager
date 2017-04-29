'use strict';

var app = angular.module('billManager', ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
	.when("/note", {
	    templateUrl : "views/edit.html"
	})
	.otherwise({
	    templateUrl : "views/dashboard.html"
	});

    $locationProvider.html5Mode(true);
})
