require('dotenv').config()

const authenticas = require('../src/authenticas')
const faker = require('faker')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const app = require('../src/demo/app')

describe('The client should be able to manipulate users', () => {
    test('We should be able to create users', () => {
        return authenticas.user.add({
            email: faker.internet.email(),
            password: 'secret'
        }).then(response => {
            expect(response).toHaveProperty('_id')
        })
    })

    test('We should be able to authenticate users', () => {
        return (new Promise((resolve, reject) => {
            jwt.sign({
                user: {
                    _id: '123',
                    email: 'marteau.mathieu@gmail.com'
                }
            }, process.env.AUTHENTICAS_SECRET, {}, (err, token) => {
                request.agent(app).get('/protected').set('Authorization', 'Bearer ' + token).then(response => {
                    expect(response.status).toBe(200)
                    expect(response.body).toHaveProperty('email')
                    resolve()
                })
            })
        }))
    })
})