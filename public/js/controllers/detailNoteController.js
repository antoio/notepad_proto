import {restClient as client} from '../services/restClient.js';

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

  saveNote.click(() => {
    const title = $("#message_title").val();
    const message = $("#message_text").val();
    const createdDate = $("#message_date").val();

    client.createNote(new Note(title, message, createdDate, "5")).done( () => {
      console.log("Note sent! :)");
    });
  });

});