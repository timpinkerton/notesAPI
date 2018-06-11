const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
        title: String,
        content: String
    },
    // w/ timestamp option, mongoose automatically adds createdAt and updatedAt fields to the schema.
    {
        timestamp: true
    });

module.exports = mongoose.model('Note', NoteSchema)