const express = require('express')
const router = express.Router()
const passport = require('../passport/index')
const db = require('../models')

router.post("/login",  function (req, res, next) {
    next()
}, passport.authenticate("local", { successRedirect: '/' }), (req, res) => {
});

router.get('/', function(req, res) {
    db.User.find({})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err))
})

router.post('/signup', function(req, res) {
    db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    })
    .then(function(dbUser) {
        console.log(dbUser)
        res.redirect(307, '/api/users/login')
    })
    .catch(function(err) {
        res.json(err);
    });
})

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get('/info', function(req, res) {
    console.log(req.user)
    if (req.user) {
        db.User.findOne(
            {
                _id: req.user._id
            }
        ).then(dbUser => {
            console.log(dbUser)
            res.json(dbUser)
        })
    }
})

router.get('/info/:id', function(req, res) {
    db.User.findOne({_id: req.params.id})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err))
})

router.put('/addChord/:id', function(req, res) {
    db.Chord.findOne(
        {
            _id: req.params.id
        } 
    ).then(dbChord => {
        db.User.findOneAndUpdate({ _id: req.user.id }, { $push: { savedChords: dbChord }}, { new: true })
        .then(dbUser => {
            res.json(dbUser)
        })
    })
})

router.put('/removeChord/:id', function(req, res) {
    db.Chord.findOne(
        {
            _id: req.params.id
        }
    ).then(dbChord => {
        db.User.findOneAndUpdate({ _id: req.user.id }, { $pull: { savedChords: dbChord } })
        .then(dbUser => {
            console.log(dbUser)
            res.json(dbUser)
        })
    })

})

module.exports = router;