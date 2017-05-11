app.service('AuthService', function($http, $state) {
    this.login = function(user, setwrongpwd) {
	$http.post('/login', angular.toJson(user))
	    .then(function(res) {
		if(res.data.success === true) {
		    if(res.data.admin)
			$state.go('admin.users').then(function() {
			}, function(err) {
			    console.log(err);
			});
		    else if(res.data.admin)
			$state.go('manager').then(function() {
			}, function(err) {
			    console.log(err);
			});
		    else
			$state.go('user.dashboard').then(function() {
			}, function(err) {
			    console.log(err);
			});
		}
		else
		    setwrongpwd();
	    }, function() {
		console.error('Error submitting login')
	    });
    };

    this.logout = function() {
	$http.post('/logout')
	    .then(function(res) {
		if(res.data.success === true) {
		    $state.go('home').then(function() {
			console.log('Logged out !');
		    }, function(err) {
			console.log(err.detail);
		    });
		}
	    }, function() {
		console.error('Error logging out')
	    });
    };

    this.signup = function(user) {
	$http.post('/signup', angular.toJson(user))
	    .then(function() {
		$state.go('home');
	    }, function() {
		console.error('Error submitting sign up information')
	    });
    };
});
