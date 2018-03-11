const axios = require('axios')
const tokenizer = require('./utils/tokenizer')
const bearerToken = require('express-bearer-token')
const logger = require('./utils/logger')

module.exports = {
    user: {
        add (user = {}) {
            return axios({
                url: process.env.AUTHENTICAS_URL + '/users',
                method: 'post',
                data: {
                    email: user.email,
                    password: user.password,
                    audience: ['my_app']
                },
                headers: {
                    Authorization: 'Bearer ' + process.env.AUTHENTICAS_CLIENT_ID + '|' + process.env.AUTHENTICAS_CLIENT_SECRET
                }
            }).then(response => {
                return response.data
            })
        }
    },
    jwtStrategy: (options) => {
        return (req, res, next) => {
            // Decode the token here
            bearerToken()(req, null, () => {
                tokenizer.decode(req.token).then(decoded => {
                    req.jwt = decoded
                    req.user = decoded.user
                    logger.request(req)
                    next()
                }).catch(error => {
                    res.status(401).send(error)
                })
            })
        }
    },
    authenticate (strategy, options) {
        switch (strategy) {
            case 'jwt':
                return this.jwtStrategy(options)
        }
    }
}