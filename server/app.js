const path = require('path')
const http = require('http')
const express = require('express')
const publicPath = path.join(__dirname + '/../public')
// console.log(publicPath)
var app = express()
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
	console.log('New Connection')
	// socket.emit('Hello There!',{num:1})
});

server.listen(4000,()=>console.log('App running on port 4000'))