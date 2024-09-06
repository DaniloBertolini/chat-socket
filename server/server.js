import app from './app.js'
import http from 'http'
import { Server } from 'socket.io';

const PORT = 3001;
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: 'http://localhost:5173'}});

io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id)
  })

  socket.on('set_username', username => {
    socket.data.username = username
    console.log('socket.data.username', socket.data.username)
  })

  socket.on('message', content => {
    console.log('content', content)
    io.emit('receive_message', {
      content,
      author: socket.data.username,
      authorId: socket.id,
    })
  })
})

server.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`)
})