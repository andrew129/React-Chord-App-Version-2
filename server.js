const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const chords = require('./routes/chordRoutes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.promise = Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chord-storage", { useNewUrlParser: true });

app.use('/api/chords', chords)

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
