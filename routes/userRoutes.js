const express = require('express')
const router = express.Router()
const passport = require('../passport/index')
const db = require('../models')

router.post("/login",  function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
}, passport.authenticate("local", { successRedirect: '/' }), (req, res) => {
    console.log("line 11", req)
});

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
    if (req.user) {
        db.User.findOne(
            {
                _id: req.user.id
            }
        ).then(dbUser => {
            res.json(dbUser)
        })
    }
})

router.put('/addChord/:id', function(req, res) {
    db.Chord.findOne(
        {
            _id: req.params.id
        } 
    ).then(dbChord => {
        console.log(dbChord)
    })
})

module.exports = router;