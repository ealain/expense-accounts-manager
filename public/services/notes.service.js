app.service('NotesService', function($resource) {
    var Notes = $resource('/notes/:id', {id:'@_id'});

    var isoStringToDate = function(d) {
	var b = d.split(/\D/);
	return new Date(b[0], --b[1], b[2], b[3]||0, b[4]||0, b[5]||0, b[6]||0);
    };

    this.get = function() {
	return Notes.query();
    };

    this.getOne = function(note_id, next) {
	Notes.get({id:note_id}).$promise.then(function(n) {
	    var date = String(n.date);
	    n.day = isoStringToDate(n.date).getDate();
	    n.month = isoStringToDate(n.date).getMonth() + 1;
	    n.year = isoStringToDate(n.date).getFullYear();
	    next(n);
	});
    }

    this.del = function(note, callback) {
	console.log('Id for note ' + note._id);
	note.$remove().then(function success() {
	    callback();
	});
    };

    this.update = function(note, callback) {
	note.date = new Date(parseInt(note.year),
			     parseInt(note.month)-1,
			     parseInt(note.day)+1).toISOString();
	note.$save().then(function success(res) {
	    console.log('Post successful: ' + res.success);
	    callback();
	}, function error(res) {
	    console.log('Error happened posting data');
	});
    }

    this.add = function(note, callback) {
	var n = new Notes({
	    date: new Date(parseInt(note.year),
			   parseInt(note.month)-1,
			   parseInt(note.day)+1).toISOString(),
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
