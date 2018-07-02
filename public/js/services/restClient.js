import { ajaxUtil } from '../utils/ajaxUtil.js';
import { valueStorage } from './valueStorage.js';

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

	test() {
		let tstr = "this is a test";
		console.log(tstr);
		return tstr;
	}
}

export const restClient = new RestClient();