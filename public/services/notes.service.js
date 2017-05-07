app.service('NotesService', function($resource) {
    var Notes = $resource('/notes/:id', {id:'@_id'});

    this.get = function() {
	return Notes.query();
    };

    this.getOne = function(note_id) {
	return Notes.get({id:note_id});
    }
    
    this.del = function(note, callback) {
	note.$remove().then(function success() {
	    callback();
	});
    };

    this.update = function(note, callback) {
	note.$save().then(function success(res) {
	    console.log('Post successful: ' + res.success);
	    callback();
	}, function error(res) {
	    console.log('Error happened posting data');
	});
    }

    this.add = function(note, callback) {
	var n = new Notes({
	    date: note.date,
	    title: note.title,
	    amount: note.amount,
	    currency: note.currency,
	    comment: note.comment,
	});
	n.$save().then(function success(res) {
	    console.log('Post successful: ' + res.success);
	    callback();
	}, function error(res) {
	    console.log('Error happened posting data');
	});
    }
});
