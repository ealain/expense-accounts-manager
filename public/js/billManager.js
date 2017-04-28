'use strict';

var app = angular.module("billManager", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
	.when("/note", {
	    templateUrl : "views/edit.html"
	})
	.otherwise({
	    templateUrl : "views/dashboard.html"
	});
})
