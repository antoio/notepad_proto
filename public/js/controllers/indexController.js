// import restClient module
import {restClient as client} from '../services/restClient.js';


$(function() {

	const createNote = $("#new_note");
	const noteContainer = $("#note-view");
	const showFinished = $("#filter_finished");

	const noteRenderer = Handlebars.compile($("#handle-notes").html());

	const note1 = {
		title: "Hello, World since 1995!",
		message: "I've come here to chew bubble gum and kick ass!",
		finished: "",
		finished_date: "Nächsten Mittwoch CAS FEE",
		rating: 4
	}

	// jquery style switcher
	$("#switcher").change( () => {
		let base = "../stylesheets/";
		let url = $("#switcher").val() == "Fruity" ? base + "index.css" : base + "style.css";
		
		$('link').replaceWith( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
	});
	
	function renderNotes(filter) {
		client.getNotes().done( (notes) => {
			if(filter) {
				notes = notes.filter((note) => note.finished );
			}
			
			noteContainer.html( noteRenderer({notes}) );
		});
	}
	
	showFinished.click(() => {
		renderNotes(true);
	});

	noteContainer.on("click", "#edit", (event) => {
		let id = $(event.currentTarget).data("id");
		location.href = `./newNote.html?id=${id}`;
	});

	noteContainer.on("click", "#delete", (event) => {
		client.deleteNote($(event.currentTarget).data("id")).done(() => {
			console.log("Note deleted 🤙");
			
			renderNotes();
		});
	});

	renderNotes();

});