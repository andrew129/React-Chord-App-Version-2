const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressionSchema = new Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    currentChords: {type: Array, required: true},
    genre: {type: String, required: true} 
});

const Progression = mongoose.model("Progression", ProgressionSchema);

module.exports = Progression;