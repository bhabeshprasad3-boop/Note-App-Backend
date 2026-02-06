const express = require('express');
const noteController = require('../controllers/note.controller');
const router = express.Router();


router.post('/add-notes',noteController.uploadNote)

router.get('/show-notes',noteController.getNotes)

router.delete('/delete-note/:noteId',noteController.deleteNote)

router.patch('/update-note/:noteId',noteController.updateNote)


module.exports = router;