const axios = require('axios')
const rtj = require('request-to-json')

module.exports = {
    request (req) {
        let payload = rtj(req)
        payload.user = req.user
        payload.jwt = req.jwt
        return axios({
            url: process.env.AUTHENTICAS_URL + '/logs',
            method: 'post',
            data: {
                type: 'request',
                payload: payload
            },
            headers: {
                Authorization: 'Bearer ' + process.env.AUTHENTICAS_CLIENT_ID + '|' + process.env.AUTHENTICAS_CLIENT_SECRET
            }
        }).then(response => {
            return response
        }).catch(error => {
            console.log(error)
        })
    }
}