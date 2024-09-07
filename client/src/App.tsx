import { useEffect, useState } from 'react'
import './App.css'
import Context from './context/Context'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import { Socket } from 'socket.io-client'

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null)


  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <Context.Provider value ={{ username, setUsername, userId, setUserId }}>
      <Routes>
        <Route path='/' element= { <Navigate to="/login" /> }/>
        <Route path='/login' element= { <Login setSocket={setSocket} setUserId={setUserId} /> }/>
        <Route path='/chat' element= { <Chat socket={socket} /> }/>
      </Routes>
    </Context.Provider>
  )
}

export default App
