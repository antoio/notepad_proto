const express = require('express');
const router = express.Router();
const notesController = require('../controller/notesController');

router.get('/', notesController.NotesController.showIndex.bind(notesController));
router.get('/notes', notesController.NotesController.showAll.bind(notesController));
router.post('/notes', notesController.NotesController.createNote.bind(notesController));
router.put('/notes/:id', notesController.NotesController.updateNote.bind(notesController));
router.get('/notes/:id', notesController.NotesController.showNote.bind(notesController));
router.delete('/notes/:id', notesController.NotesController.deleteNote.bind(notesController));

module.exports = router;
