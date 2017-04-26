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

app.service('notesData', function() {
    var data = {}
    this.get = function() {
	console.log("Hey");
	return data;
    }
    this.set = function(local_data) {
	data = local_data;
	return;
    }
});

app.controller('init', function(notesData) {
    var notes= ["Note 1", "Note 2", "Note 3"];
    notesData.set(notes);
});
