// import restClient module
import {restClient as client} from '../services/restClient.js';


$(function() {

	const noteContainer = $("#note-view");
	const showFinished = $("#filter_finished");
	const sortByImportance = $("#sort_importance");
	let toggle_finished = false;

	const noteRenderer = Handlebars.compile($("#handle-notes").html());

	// jquery style switcher
	$("#switcher").change( () => {
		let base = "../stylesheets/";
		let url = $("#switcher").val() == "Fruity" ? base + "index.css" : base + "style.css";
		
		$('link').replaceWith( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
	});
	
	function renderNotes(filter, order) {
		client.getNotes().done( (notes) => {
			if(filter) {
				notes = notes.filter((note) => note.finished );
			}
			
			if(order) {
				notes = notes.sort(order);
			}

			noteContainer.html( noteRenderer({notes}) );
		});
	}

	sortByImportance.click(() => {
		renderNotes(toggle_finished, (note1, note2) =>{ return note2.rating - note1.rating });
	});
	
	showFinished.click(() => {
		toggle_finished = !toggle_finished;
		renderNotes(toggle_finished);
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