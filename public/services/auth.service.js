app.service('AuthService', function($http) {
    this.login = function(user) {
	$http.post('/login', angular.toJson(user))
	    .then(function() {},
		  function() {console.error('Error submitting login')})
    };
});
