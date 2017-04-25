app.factory('notesData', function() {
    var data = [];
    function get() {
	return data;
    }
    function set(local_data) {
	data = local_data;
    }
    function add(value) {
	data.push(value);
    }

    return {get: get,
	    set: set,
	    add: add}
});
