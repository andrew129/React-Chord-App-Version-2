const db = require('../models')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'email' // not necessary, DEFAULT
	},
	function(email, password, done) {
    console.log(password)
		db.User.findOne({ email: email }, (err, user) => {
			if (err) {
        console.log('normal error')
				return done(err)
			}
			if (!user) {
        console.log("user doesn't exist")
				return done(null, false, { message: 'Incorrect email' })
      }
      
      if (!user.checkPassword(password)) {
        console.log('no match')
				return done(null, false, { message: 'Incorrect password' })
			}
	
      else {
        console.log('success')
        return done(null, user)
      }
		})
	}
)

module.exports = strategy