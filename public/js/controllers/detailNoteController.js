import {restClient as client} from '../services/restClient.js';

function getUrlVars() {
  let variables = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    variables[key] = value;
  });

  return variables;
}

$(function() {
  const saveNote = $("#saveNote");

  class Note {
    constructor(title, message, finished_date, rating) {
      this.title = title;
      this.message = message;
      this.finished_date = finished_date;
      //this.finished = finished;
      //this.date_description = date_description;
      this.rating = rating;
      this.state = "OK";
    }
  }  

  let id = getUrlVars()["id"];
  if(id) {
    console.log(`id is ${id}`);
    client.getNote(id).done( (note) => {
      $("#message_title").val(note.title);
      $("#message_text").val(note.message);
      $("#message_date").val(note.finished_date);

      console.table(note);

    });
  }

  saveNote.click(() => {
    const title = $("#message_title").val();
    const message = $("#message_text").val();
    const finished_date = $("#message_date").val();

    if(id) {
      
      client.updateNote(id, new Note(title, message, finished_date)).done( () => {
        console.log("Note updated! :)");
        location.href = `./index.html`;
      });

    } else {
    
      client.createNote(new Note(title, message, finished_date, "5")).done( () => {
        console.log("Note sent! :)");
        location.href = `./index.html`;
      });

    }
  });

});