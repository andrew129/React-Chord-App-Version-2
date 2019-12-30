const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/', (req, res) => {
    console.log('the req.body', req.body)
    db.Chord.create(req.body)
        .then(dbChord => {
            console.log('the db', dbChord)
            res.send(dbChord)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

router.get('/', (req, res) => {
    db.Chord.find({})
        .then(dbChord => {
            console.log(dbChord)
            res.send(dbChord)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router