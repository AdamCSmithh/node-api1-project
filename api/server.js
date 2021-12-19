// BUILD YOUR SERVER HERE
const express = require('express');
const users = require('./users/model');
const server = express();

server.use(express.json())

server.get('/hello', (req, res) => {
    res.json({message: "heello"})
})

server.get('/api/users', (req, res) => {
    users.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "something bad happened"})
    })
})

server.post('/api/users', (req, res) => {
    users.insert(req.body)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({ message: "something bad happened" })
    })
})

server.put('/api/users/:id', (req, res) => {
    users.update(req.body)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({message: "something bad happened" })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
