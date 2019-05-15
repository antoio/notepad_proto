import {restClient as client} from '../services/restClient.js';
import {styleService as style} from '../services/styleService.js';

function getUrlVars() {
  let variables = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    variables[key] = value;
  });

  return variables;
}

$(function() {
  const saveNote = $("#saveNote");
  const cancelNote = $("#cancelNote");

  class Note {
    constructor(title, message, finished, rating, finished_date) {
      this.title = title;
      this.message = message;
      this.finished_date = finished_date;
      this.created_date = Date.now();
      this.finished = finished;
      this.rating = rating;
      this.state = "OK";
    }
  }  

  // output currently selected message
  let id = getUrlVars()["id"];
  if(id) {
    client.getNote(id).done( (note) => {
      $("#message_title").val(note.title);
      $("#message_text").val(note.message);
      $("#message_isFinished").val(note.finished);
      $("#message_priority").val(note.rating);
      $("#message_date").val(note.finished_date);
     });
  }

  saveNote.click(() => {
    const title = $("#message_title").val();
    const message = $("#message_text").val();
    const isFinished = $("#message_isFinished").is(":checked") ? "checked": "";
    const priority = $("#message_priority").val();
    const finished_date = $("#message_date").val();

    if(id) {
      
      client.updateNote(id, new Note(title, message, isFinished, priority, finished_date)).done( () => {
        location.href = `./index.html`;
      });

    } else {
    
      client.createNote(new Note(title, message, isFinished, priority, finished_date)).done( () => {
        location.href = `./index.html`;
      });

    }
  });

  cancelNote.click(() => {
    location.href = `./index.html`;
  });

  function setStyle(cssUrl) {
		$('link').replaceWith( $('<link rel="stylesheet" type="text/css" />').attr('href', cssUrl) );
  }
  
  if(style.isStyleActivated()) {
    setStyle(style.getStyle());
	}

});