import {restClient as client} from '../services/restClient.js';
import {styleService as style} from '../services/styleService.js';


$(function() {

	const noteContainer = $("#note-view");
	const showFinished = $("#filter_finished");
	const sortByImportance = $("#sort_importance");
	const sortByCreationDate = $("#sort_created");
	const sortByFinishedDate = $("#sort_finished");
	const switcher = $("#switcher");
	let toggle_finished = false;

	const noteRenderer = Handlebars.compile($("#handle-notes").html());

	function setStyle(cssUrl) {
		$('link').replaceWith( $('<link rel="stylesheet" type="text/css" />').attr('href', cssUrl) );
	}

	// jquery style switcher
	switcher.change( () => {
		const cssUrl = style.saveStyle(switcher.val());
		setStyle(cssUrl);
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

	sortByCreationDate.click(() => {
		renderNotes(toggle_finished, (note1, note2) =>{ return note1.created_date - note2.created_date });
	});

	sortByFinishedDate.click(() => {
		renderNotes(toggle_finished, (note1, note2) =>{ return new Date(note1.finished_date) - new Date(note2.finished_date) });
	});

	noteContainer.on("click", "#edit", (event) => {
		let id = $(event.currentTarget).data("id");
		location.href = `./detailNote.html?id=${id}`;
	});

	noteContainer.on("click", "#delete", (event) => {
		client.deleteNote($(event.currentTarget).data("id")).done(() => {
			
			renderNotes();
		});
	});

	renderNotes();

	if(style.isStyleActivated()) {
		setStyle(style.getStyle());
		switcher.val(style.getCurrentStyleName());
	}
	
});