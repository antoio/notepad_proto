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
    constructor(title, message, createdDate, rating) {
      this.title = title;
      this.message = message;
      this.createdDate = createdDate;
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
      
      console.table(note);

    });
  }

  saveNote.click(() => {
    const title = $("#message_title").val();
    const message = $("#message_text").val();
    const createdDate = $("#message_date").val();

    client.createNote(new Note(title, message, createdDate, "5")).done( () => {
      console.log("Note sent! :)");
    });
  });

});