import { ajaxUtil } from '../utils/ajaxUtil.js';
import { valueStorage } from './valueStorage.js';

class RestClient {

	createNote(note) {
		return ajaxUtil.ajax("POST", "/notes/", note);
	}

	updateNote(id, note) {
		return ajaxUtil.ajax("PUT", `/notes/${id}`, note);
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

export const restClient = new RestClient();