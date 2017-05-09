app.service('AdminService', function($resource) {
    var Users = $resource('/users');

    this.getUsers = function() {
	return Users.query();
    };

    this.addUser = function(user, callback, error) {
	var u = new Users({
	    login: user.login,
	    password: user.password,
	    admin: user.admin,
	    manager: user.manager
	});

	u.$save().then(function success(res) {
	    if(res.success)
		callback();
	    else
		error();
	}, function error(res) {
	    console.log('Error happenned posting user');
	    error();
	});
    };
});
