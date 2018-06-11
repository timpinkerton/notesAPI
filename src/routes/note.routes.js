module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    //CREATE a new note
    app.post('/notes', notes.create);

    //READ all notes
    app.get('/notes', notes.findAll);

    //READ a single note w/ the noteID
    app.get('/notes/:noteID', notes.findOne);

    //UPDATE a note w/ the noteID
    app.put('/notes/:noteID', notes.update);

    //DELETE a note w/ the noteID
    app.delete('/notes/:noteID', notes.delete);
}