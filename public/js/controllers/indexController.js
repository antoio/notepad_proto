// import restClient module
import {restClient as client} from '../services/restClient.js';


$(function() {

	const createNote = $("#new_note");
	const noteContainer = $("#note-view");

	const noteRenderer = Handlebars.compile($("#handle-notes").html());

	const note1 = {
		title: "Hello, World since 1995!",
		message: "I've come here to chew bubble gum and kick ass!",
		createdDate: "",
		finished: "",
		date_description: "Nächsten Mittwoch CAS FEE",
		rating: 4
	}

	// createNote.click(function() {
	// 	console.log("Ok you clicked the button! Yay 🎉");

	// 	client.createNote(note1).done( () => {
	// 		renderNotes();
	// 	}).fail( (msg) => {
	// 		//pass
	// 	});
		
	// });

	
	// jquery style switcher
	$("#switcher").change( () => {
		let base = "../stylesheets/";
		let url = $("#switcher").val() == "Black" ? base + "index.css" : base + "style.css";
		
		$('link').replaceWith( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
	});
	
	function renderNotes() {
		client.getNotes().done( (notes) => {
			noteContainer.html( noteRenderer({notes}) );
		});
	}
	
	noteContainer.on("click", "#edit", (event) => {
		client.deleteNote($(event.currentTarget).data("id")).done(renderNotes);
	});

	renderNotes();

});