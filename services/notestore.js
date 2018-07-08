const Datastore = require('nedb-promise');

class Note {
	constructor(noteObj) {
		this.title = noteObj.title;
        this.message = noteObj.message;
        this.finished_date = noteObj.finished_date;
        this.finished = noteObj.finished;
        this.date_description = noteObj.date_description;
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

    async update(id, note) {
        await this.db.update({_id: id}, note, {});
        return await this.get(id);
    }

    async delete(id) {
        return await this.db.remove({_id: id}, {});
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }
}

module.exports.NoteStore = new NoteStore();