const server = require('./api/server')
const port = 5000;

server.listen(port, () => {
    console.log('server listening on 5000')
})