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
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "something bad happened"})
    })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.findById(id)
    .then(user => { 
        if(!id){
        res.status(404).json({message: "the user with the specified ID does not exist"})
        }else{
        res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({message: "The user information could not be retrieved"})
    })
})

server.post('/api/users', (req, res) => {
    users.insert(req.body)
    .then(user => {
        if(!req.body.name || !req.body.bio){
            res.status(400).json({message: "Please provide name and bio for the user"})
        }
        else {
            res.status(201).json(user)
        }
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
                message: `The user with the specified ID does not exist`
            })
        } else if (!req.body.name || !req.body.bio){
            res.status(400).json({message: "Please provide name and bio for the user"})            
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({message: "something bad happened" })
    })
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    users.remove(id)
    .then(deletedUser => {
        if(!deletedUser) {
            res.status(404).json({
                message: `The user with the specified ID does not exist`
            })
        } else {
            res.status(200).json(deletedUser)
        }
    }) 
    .catch(err => {
        res.status(500).json({
            message: 'The user could not be removed',
            error: err.message
        })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
