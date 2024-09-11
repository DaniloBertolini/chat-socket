import app from './app.js'
import http from 'http'
import { Server } from 'socket.io';
import { MAX_MESSAGES, sanitize } from './utils.js';

const PORT = 3001;
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: "*"}});

const messages = [];

io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.emit('previous_messages', messages);

  io.emit('userCount', io.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log(`${socket.data.username || 'Usuário'} desconectado!`)
    io.emit('userCount', io.engine.clientsCount);
  })

  socket.on('set_username', username => {
    socket.data.username = sanitize(username)
  })

  socket.on('message', content => {
    try {
      const message = {
        content: sanitize(content),
        author: socket.data.username || 'Anônimo',
        authorId: socket.id,
      }

      if (messages.length > MAX_MESSAGES) {
        messages.shift();
      }
  
      messages.push(message);
      io.emit('receive_message', message)

    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  })
})

server.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`)
})