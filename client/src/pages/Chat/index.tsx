import { useContext, useEffect, useState } from "react"
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { ChatProps, MessagesType } from "../../types";

function Chat({ socket }: ChatProps) {
  const navigate = useNavigate()
  const context = useContext(Context);
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessagesType[]>([])
  
  useEffect(() => {
    if (!context.username) navigate('/login')

    socket?.on('receive_message', (data: MessagesType) => {
      console.log('recebi coisa aqui')
      setMessages((current) => [...current, data])
    })
    console.log('messages', messages)

    return () => { socket?.off('receive_message') }
  }, [socket])

  const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault()

    if (!message) return;
    
    socket?.emit('message', message)
    clearInput()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const clearInput = () => {
    setMessage('');
  }

  const getEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter')
      sendMessage()
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <h2>Chat</h2>
        <input type="text" onKeyDown={(e)=>getEnterKey(e)} value={message} onChange={handleChange} placeholder=""/>
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{`${message.author}: ${message.content}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Chat