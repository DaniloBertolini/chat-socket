import { io } from 'socket.io-client'
import { useContext } from "react";
import Context from "../../context/Context";
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  setUserId: (id: string) => void;
}

function Login({ setUserId }: LoginProps) {
  const context = useContext(Context);
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (context.username && context.username.current) {
      const userNameValue = context.username.current.value;
      if (userNameValue !== '') {
        const socket = io('http://localhost:3001');
  
        socket.on('connect', () => {
          const userId = socket.id;
          setUserId(userId!);
        });

        navigate('/chat')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Chat Socket.io</h2>
      <input type="text" ref={context.username} placeholder="Digite seu nome"/>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;