const router = require('express').Router()
const authenticas = require('../authenticas')

router.post('/register', (req, res) => {
    // TODO: Add google not a robot support
    return authenticas.user.add(req.body).then(user => {

    }).catch(error => {

    })
})

module.exports = router