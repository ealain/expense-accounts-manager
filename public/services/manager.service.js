app.service('managerService', function($resource) {
    var Users = $resource('/users/:userId');
    var UsersList = $resource('/manager/ulist');
    var Notes = $resource('/notes/:noteId', {},
        {approve: {method: 'POST', url: '/notes/approve', params: {id: '@_id'}}});

    this.getUserList = function(id) {
        if(id)
            return UsersList.query({managerid: id});
        return UsersList.query();
    };

    this.getNoteDetails = function(note_id) {
        return Notes.get({noteId: note_id});
    };

    this.getUser = function(u_id) {
        return Users.get({userId: u_id});
    };

    this.getUserNotes = function(u_id) {
        return Notes.query({user: u_id});
    };

    this.approveUserNote = function(n) {
        n.$approve();
    };
});
