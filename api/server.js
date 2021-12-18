// BUILD YOUR SERVER HERE
const express = require('express')

const server = express();
server.get('/hello', (req, res) => {
    res.json({message: "heello"})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
