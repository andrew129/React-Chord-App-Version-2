const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/', (req, res) => {
    db.Chord.create(req.body)
        .then(dbChord => {
            res.send(dbChord)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

router.get('/', (req, res) => {
    db.Chord.find({})
        .then(dbChord => {
            res.send(dbChord)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

module.exports = router