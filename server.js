const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const chords = require('./routes/chordRoutes')
const users = require('./routes/userRoutes')
const progressions = require('./routes/progressionRoutes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require("express-session");
const passport = require("./passport/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.promise = Promise
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/chord-storage',
	{
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	  useCreateIndex: true,
	  useFindAndModify: false
	}
);

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		resave: false, //required
		saveUninitialized: false //required
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use( (req, res, next) => {
	return next();
});

app.use('/api/chords', chords)
app.use('/api/progressions', progressions)
app.use('/api/users', users)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
