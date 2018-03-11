const express = require('express')
const fullMiddleWare = require('../controllers/full')
const authenticas = require('../authenticas')

let app = express()

app.use('/auth', fullMiddleWare)

app.get('/protected', authenticas.authenticate('jwt'), (req, res) => {
    res.send(req.user)
})

module.exports = app