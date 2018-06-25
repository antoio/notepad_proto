const notestore = require('../services/notestore')

class NotesController {
	showIndex(req, res) {
			res.json("allnotes");
	};

	async createNote(req, res) {
			await res.json(await notestore.NoteStore.add(req.body));
	};

	async showNote(req, res) {
			await res.json(await notestore.NoteStore.get(req.params.id));
	};

	async deleteNote(req, res) {
			await res.json(await notestore.NoteStore.delete(req.params.id));
	};

	async showAll(req, res) {
			res.json( (await notestore.NoteStore.all() || []) );
	};

}

module.exports.NotesController = new NotesController();