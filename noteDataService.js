'use strict';

app.service('notesData', function() {
    var data = [];
    this.get = function() {
	return data;
    };
    this.set = function(local_data) {
	data = local_data;
	return;
    };
    this.add = function(note) {
	data.push(note);
	return;
    };
    this.del = function(note) {
	var i = data.indexOf(note);
	if(i !== -1) {
	    data.splice(i, 1);
	}
    };
    this.isEmpty = function() {
	return (data.length === 0);
    };
});
