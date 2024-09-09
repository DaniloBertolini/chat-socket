import { useContext, useEffect, useRef, useState } from "react";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { ChatProps, Message } from "../../types";
import styles from './Chat.module.css';
import send from '/send.svg';

function Chat({ socket }: ChatProps) {
  const navigate = useNavigate();
  const context = useContext(Context);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    if (!context.username || !socket) {
      navigate('/login');
      return;
    }

    socket?.on('previous_messages', (data: Message[]) => {
      setMessages(data);
      scrollToBottom();
    })

    socket?.on('receive_message', (data: Message) => {
      setMessages((current) => [...current, data]);
      scrollToBottom(true);
    })

    return () => {
      socket?.off('previous_messages');
      socket?.off('receive_message');
    }
  }, [socket, context.username])

  const scrollToBottom = (forceScroll: boolean = false) => {
    const messagesContainer = messagesContainerRef.current;

    if (messagesContainer) {
      const scrollHeight = messagesContainer.scrollHeight;
      const clientHeight = messagesContainer.clientHeight;
      const scrollTop = messagesContainer.scrollTop;

      if (forceScroll || scrollHeight - (scrollTop + clientHeight) <= 100) {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    if (!message) return;
    
    socket?.emit('message', message)
    clearInput();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  const clearInput = () => {
    setMessage('');
  }

  const getEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    } 
  }

  return (
    <div className={ styles.container }>
      <form className={ styles.form } onSubmit={sendMessage}>
        <ul className={ styles.ul} ref={messagesContainerRef}>
          {messages.map((message, index) => (
            <li className={ `${styles.li} ${
              context.userId === message.authorId ? styles.own : ''
            }` } key={index}>{
              context.userId !== message.authorId ? 
                `${message.author}: ${message.content}` :
                `${message.content}`
              }</li>
          ))}
          <div ref={endOfMessagesRef}></div>
        </ul>
        <div className={ styles.divInput }>
          <input className={ styles.input } type="text" onKeyDown={(e)=>getEnterKey(e)} value={message} onChange={handleChange} placeholder="Digite sua mensagem..."/>
          <span className={ styles.span } />
          <button className={ styles.button } type="submit" disabled={!message.trim()}><img src={send}></img></button>
        </div>
      </form>
    </div>
  )
}

export default Chat