import { useRef, useState } from 'react'
import './App.css'
import Context from './context/Context'
import Login from './pages/Login'

function App() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <Context.Provider value ={{ username: usernameRef, userId }}>
      <Login setUserId={setUserId} />
    </Context.Provider>
  )
}

export default App
