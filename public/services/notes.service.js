app.service('NotesService', function($resource) {
    var Notes = $resource('/notes/:id', {id:'@_id'});

    this.get = function() {
	return Notes.query();
    };
    
    this.del = function(note, callback) {
	note.$remove();
	callback();
    };
});
