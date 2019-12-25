const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ChordSchema = new Schema({
    author: {type: String, required: true},
    chordName: {type: String, required: true},
    currentNotes: {type: Array, required: true, unique: true} 
});

ChordSchema.plugin(uniqueValidator);

const Chord = mongoose.model("Chord", ChordSchema);

module.exports = Chord;