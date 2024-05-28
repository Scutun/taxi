require('dotenv').config()

const express =  require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

app.use(cors())

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnested')
    })
})

server.listen(3000, () => {
    console.log('Server work')
})