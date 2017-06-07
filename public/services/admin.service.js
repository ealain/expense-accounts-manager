app.service('AdminService', function($resource) {
    var Users = $resource('/users/:uid');
    var UsersLists = $resource('/users/lists');

    this.get = function(u_id) {
        return Users.get({uid: u_id});
    };

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

    this.updateUser = function(u, callback, error) {
        if(!u.manager)
            this.removeUserList(u._id);
	u.$save().then(function success(res) {
	    if(res.success) {
		callback();
            }
	    else
		error();
	}, function error(res) {
	    console.log('Error happenned updating user');
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

    this.removeUserList = function(u_id, callback) {
        UsersLists.remove({uid: u_id}).$promise.then(callback);
    };
});
