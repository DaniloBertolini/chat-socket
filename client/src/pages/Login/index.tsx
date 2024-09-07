import { io } from 'socket.io-client'
import { useContext } from "react";
import Context from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../../types';
import styles from './Login.module.css'

function Login({ setSocket, setUserId }: LoginProps) {
  const context = useContext(Context);
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setUsername(event.target.value)
  }

  const sanitizeUsername = (username: string) => {
    return username.replace(/[^\w\s]/gi, '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let userNameValue = context.username?.trim();
    if (userNameValue && userNameValue.length > 0) {
      userNameValue = sanitizeUsername(userNameValue)
      const socket = io('http://localhost:3001');
      
      socket.off('connect');
      socket.on('connect', () => {
        const userId = socket.id;
        socket.emit('set_username', userNameValue)
        setUserId(userId!);
      });

      setSocket(socket)
      navigate('/chat')
    } else {
      alert("Por favor, insira um nome válido.");
    }
  }

  return (
    <div className={ styles.container }>
      <form className={ styles.form } onSubmit={handleSubmit}>
        <h2 className={ styles.title }>Login</h2>
        <input className={ styles.input } type="text" onChange={handleChange} placeholder="Digite seu nome"/>
        <button className={ styles.button } type="submit" disabled={!context.username || context.username.trim() === ''}>Login</button>
      </form>
    </div>
  )
}

export default Login;