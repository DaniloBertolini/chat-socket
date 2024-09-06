import { io } from 'socket.io-client'
import { useContext } from "react";
import Context from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../../types';

function Login({ setSocket, setUserId }: LoginProps) {
  const context = useContext(Context);
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setUsername(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userNameValue = context.username;
    if (userNameValue) {
        const socket = io('http://localhost:3001');
        
        socket.on('connect', () => {
          const userId = socket.id;
          socket.emit('set_username', context.username)
          setUserId(userId!);
        });

        setSocket(socket)
        navigate('/chat')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Chat Socket.io</h2>
      <input type="text" onChange={handleChange} placeholder="Digite seu nome"/>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;