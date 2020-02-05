const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const chords = require('./routes/chordRoutes')
const progressions = require('./routes/progressionRoutes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.promise = Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chord-storage", { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/chords', chords)
app.use('/api/progressions', progressions)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
