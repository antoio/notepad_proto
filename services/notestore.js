const Datastore = require('nedb-promise');

class Note {
	constructor(noteObj) {
		this.title = noteObj.title;
        this.message = noteObj.message;
        this.createdDate = noteObj.createdDate;
        this.finishedDate = noteObj.finishedDate;
		this.rating = noteObj.rating;
		this.state = "OK";
	}
}

class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(noteObj) {
        let note = new Note(noteObj);
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }
}

module.exports.NoteStore = new NoteStore();