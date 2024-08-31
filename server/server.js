import app from './app.js'
import http from 'http'
import { Server } from 'socket.io';

const PORT = 3001;
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: 'http://localhost:5173'}});

io.on('connection', socket => {
  console.log(socket.id)
})

server.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`)
})