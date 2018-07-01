const ajaxUtil = require('../utils/ajaxUtil');
const valueStorage = require('./valueStorage');

class RestClient {

	createNote(note) {
		return ajaxUtil.ajax("POST", "/notes/", note);
	}

	getNotes() {
		return ajaxUtil.ajax("GET", "/notes/", undefined);
	}

	getNote(id) {
		return ajaxUtil.ajax("GET", `/notes/${id}`, undefined);
	}

	deleteNote(id) {
		return ajaxUtil.ajax("DELETE", `/notes/${id}`, undefined);
	}

}

module.exports.RestClient = new RestClient();