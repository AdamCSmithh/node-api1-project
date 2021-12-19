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
    const { id } = req.params
    const { body } = req
    users.update(id, body)
    .then(user => {
        if(!user) {
            res.status(404).json({
                message: `user by id ${id} does not exist`
            })
        } else {
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({message: "something bad happened" })
    })
})

server.delete('/api/users/:id', (req, res) => {
    users.remove()
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
