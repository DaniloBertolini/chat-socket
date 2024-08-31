import { useRef } from 'react'
import './App.css'
import Context from './context/Context'
import Login from './pages/Login'

function App() {
  const usernameRef = useRef<HTMLInputElement>(null)

  return (
    <Context.Provider value ={{ username: usernameRef }}>
      <Login />
    </Context.Provider>
  )
}

export default App
