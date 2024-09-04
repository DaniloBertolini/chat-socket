import { useRef, useState } from 'react'
import './App.css'
import Context from './context/Context'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'

function App() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <Context.Provider value ={{ username: usernameRef, userId }}>
      <Routes>
        <Route path='/' element= { <Navigate to="/login" /> }/>
        <Route path='/login' element= { <Login setUserId={setUserId} /> }/>
        <Route path='/chat' element= { <Chat /> }/>
      </Routes>
      
    </Context.Provider>
  )
}

export default App
