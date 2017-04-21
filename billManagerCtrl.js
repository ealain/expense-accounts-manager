app.config(function($routeProvider) {
    $routeProvider
	.when("/note", {
	    templateUrl : "edit.html"
	})
	.otherwise({
	    templateUrl : "dashboard.html"
	});
})
