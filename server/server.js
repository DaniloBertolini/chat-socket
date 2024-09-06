import app from './app.js'
import http from 'http'
import { Server } from 'socket.io';

const PORT = 3001;
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: ['http://localhost:5173', 'http://192.168.0.104:5173', 'http://172.18.0.1:5173']}});

const messages = [];

io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.emit('previous_messages', messages);

  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id)
  })

  socket.on('set_username', username => {
    socket.data.username = username
  })

  socket.on('message', content => {
    const message = {
      content,
      author: socket.data.username,
      authorId: socket.id,
    }

    messages.push(message);
    io.emit('receive_message', message)
  })
})

server.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`)
})