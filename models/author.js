const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, default: null},
    age: {type: Number, default: 0}
}, {timestamps: true});

const Author = mongoose.model("Author", schema);

module.exports = {Author}
