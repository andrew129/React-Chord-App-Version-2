const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChordSchema = new Schema({
    author: {type: String, required: true},
    chordName: {type: String, required: true},
    currentNotes: {type: Array, required: true, unique: true},
    type: {type: String, required: true} 
});

const Chord = mongoose.model("Chord", ChordSchema);

module.exports = Chord;