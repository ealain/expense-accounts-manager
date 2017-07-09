app.service('NotesService', function($resource, $http) {
    var Notes = $resource('/notes/:id', {id:'@_id'});

    var isoStringToDate = function(d) {
	var b = d.split(/\D/);
	return new Date(b[0], --b[1], b[2], b[3]||0, b[4]||0, b[5]||0, b[6]||0);
    };

    this.get = function() {
	return Notes.query(function() {}, function(err) {console.log('Error getting array');});
    };

    this.getOne = function(note_id, next) {
	Notes.get({id:note_id}).$promise.then(function(n) {
	    var date = String(n.date);
	    n.day = isoStringToDate(n.date).getDate();
	    n.month = isoStringToDate(n.date).getMonth() + 1;
	    n.year = isoStringToDate(n.date).getFullYear();
	    next(n);
	});
    };

    this.del = function(note, callback) {
	note.$remove().then(function success() {
	    callback();
	});
    };

    this.remove = function(note, filename, callback) {
        note.$remove({file: filename}).then(function success(note) {
            var date = String(note.date);
            note.day = isoStringToDate(note.date).getDate();
            note.month = isoStringToDate(note.date).getMonth() + 1;
            note.year = isoStringToDate(note.date).getFullYear();
            callback(note);
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
    };

    this.add = function(note, callback) {
        var n = new Notes({
            date: new Date(parseInt(note.year),
                parseInt(note.month)-1,
                parseInt(note.day)+1).toISOString(),
            title: note.title,
            amount: note.amount,
            currency: note.currency,
            comment: note.comment,
            files: note.files
        });
        n.$save().then(function success(res) {
            console.log('Post successful: ' + res.success);
            callback(res.noteid);
        }, function error(res) {
            console.log('Error happened posting data');
        });
    };

    this.attach = function(file, noteId, callback) {
        $http.post('uploads/' + noteId, file, {params: {name: file.name}, headers: {'Content-type': undefined}}).then(function() {
            console.log('Upload successful');
            callback();
        }, function() {
            console.log('Upload unsuccessful');
        });
    };

});
