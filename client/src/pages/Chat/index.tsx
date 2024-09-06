import { useContext, useEffect, useState } from "react"
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate()
  const context = useContext(Context);
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')
  
  const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault()

    if (!message) return;

    setMessages([...messages, message])
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

  useEffect(() => {
    if (!context.username) navigate('/login')
  }, [])


  return (
    <div>
      <form onSubmit={sendMessage}>
        <h2>Chat</h2>
        <input type="text" onKeyDown={(e)=>getEnterKey(e)} value={message} onChange={handleChange} placeholder=""/>
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{`${context.username}: ${message}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Chat