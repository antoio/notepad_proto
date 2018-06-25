const notestore = require('../services/notestore')

class NotesController {
	showIndex(req, res) {
			res.render("allnotes");
	};

	async createNote(req, res) {
			await res.render("succeeded", await notestore.NoteStore.add(req.body));
	};

	async showNote(req, res) {
			await res.render("shownote", await notestore.NoteStore.get(req.params.id));
	};

	async deleteNote(req, res) {
			await res.render("shownote", await notestore.NoteStore.delete(req.params.id));
	};

	async showAll(req, res) {
			const notelist = notestore.NoteStore.all();
			await res.render("overview", notelist);
	};

}

module.exports.NotesController = new NotesController();