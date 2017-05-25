app.service('managerService', function($resource) {
    var Users = $resource('/users/:userId');
    var UsersList = $resource('/manager/ulist');
    var Notes = $resource('/notes');

    this.getUserList = function() {
        return UsersList.query()
    };

    this.getUser = function(u_id) {
        return Users.get({userId: u_id});
    };

    this.getUserNotes = function(u_id) {
        return Notes.query({user: u_id});
    };
});
