const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, default: null},
    genera: {type: String, default: null},
    authorId: {type: String}
}, {timestamps: true});

const Book = mongoose.model("Book", schema);

module.exports = {Book}
