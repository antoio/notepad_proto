//const client = require('../services/restClient');
const jquery = require('jquery');
//const handlebars = require('handlebars');

$(function() {
	const btnCreateNote = $("#testbutton");
	//const noteRenderer = handlebars.compile( $("#handle-sample").html() );

	btnCreateNote.click(function(event) {
		alert("Ok you clicked the button! Yay 🎉")
	});

});