import app from './app.js'
import http from 'http'
import { Server } from 'socket.io';

const PORT = 3001;
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: 'http://localhost:5173'}});

io.on('connection', socket => {
  console.log(socket.id)

  socket.on('set_username', username => {
    socket.data.username = username
    console.log('socket.data.username', socket.data.username)
  })

  socket.on('message', text => {
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username
    })
  })
})

server.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`)
})