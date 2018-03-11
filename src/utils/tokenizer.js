const jwt = require('jsonwebtoken')

module.exports = {
    decode (token) {
        return new Promise(resolve => {
            jwt.verify(token, process.env.AUTHENTICAS_SECRET, (err, decoded) => {
                if (err) {
                    throw new Error()
                }
                resolve(decoded)
            })
        })
    }
}