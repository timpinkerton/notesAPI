const Note = require('../models/note.model.js');

//Create and Save a new note
exports.create = (req, res) => {
    //to validate the request
    if(!req.body.content) {
        return res.status(404).send({
            message: "Note content cannot be empty"
        });
    }

    //Creating a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    //Saving the note to the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the note."
        });
    });

};


//Retrieve and return all notes from the database
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving the notes."
        });
    });
};


//Find a single not w/ noteID
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found."
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};


//Update a note by the noteID in the request
exports.update = (req, res) => {
    //validating the request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    //Find a note and update it w/ the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found."
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found."
            })
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};


//Delete a note w/ the noteID in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found."
            });
        }
        res.send({ message: "Note successfully deleted" });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found."
            });
        }
        return res.status(500).send({
            message: "Could not delete not with id " + req.params.noteId
        });
    });
};