app.service('AuthService', function($http, $state) {
    this.login = function(user) {
	$http.post('/login', angular.toJson(user))
	    .then(function(res) {
		if(res.data.success === true) {
		    if(res.data.admin)
			$state.go('admin').then(function() {
			    console.log('State is now admin: ' + $state.is('admin'));
			}, function(err) {
			    console.log(err);
			});
		    else if(res.data.admin)
			$state.go('manager').then(function() {
			    console.log('State is now manager: ' + $state.is('manager'));
			}, function(err) {
			    console.log(err);
			});
		    $state.go('user').then(function() {
			console.log('State is now user: ' + $state.is('user'));
		    }, function(err) {
			console.log(err);
		    });

		}
		console.log(res.data);
	    }, function() {
		console.error('Error submitting login')
	    });
    };
});
