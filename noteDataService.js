'use strict';

app.factory('notesData', function() {
    var data = [];
    function get() {
	return data;
    };
    function set(local_data) {
	data = local_data;
    };
    function add(value) {
	data.push(value);
    };
    function del(note) {
	console.log(data);
	var i = data.indexOf(note);
	if(i !== -1) {
	    data.splice(i, 1);
	}
    };

    return {get: get,
	    set: set,
	    add: add,
	    del: del}
});
