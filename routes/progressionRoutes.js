const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/', (req, res) => {
    console.log(req.body)
    db.Progression.create(req.body)
        .then(dbProgression => {
            res.send(dbProgression)
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/', (req, res) => {
    db.Progression.find({})
        .then(dbProgression => {
            res.send(dbProgression)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;