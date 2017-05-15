app.service('AdminService', function($resource) {
    var Users = $resource('/users');
    var UsersLists = $resource('/users/lists');

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

    this.addUsersList = function(managerLogin, list) {
	var l = new UsersLists({
	    managerlogin: managerLogin,
	    users: list
	});

	l.$save().then(function success(res) {
	}, function error(res) {
	    console.log('Error happenned posting users list');
	});
    };
});
