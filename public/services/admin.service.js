app.service('AdminService', function($resource) {
    var Users = $resource('/users');

    this.getUsers = function() {
	console.log('Done');
	return Users.query();
    };
});
