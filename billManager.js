'use strict';

var app = angular.module("billManager", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
	.when("/note", {
	    templateUrl : "edit.html"
	})
	.otherwise({
	    templateUrl : "dashboard.html"
	});
})
