import { useState } from 'react'
import './App.css'
import Context from './context/Context'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'

function App() {
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  return (
    <Context.Provider value ={{ username, setUsername, userId, setUserId }}>
      <Routes>
        <Route path='/' element= { <Navigate to="/login" /> }/>
        <Route path='/login' element= { <Login setUserId={setUserId} /> }/>
        <Route path='/chat' element= { <Chat /> }/>
      </Routes>
      
    </Context.Provider>
  )
}

export default App
