import { useState } from 'react'
import './App.css'
import { LogInPage } from './pages/LogInPage'
import { CoolAppBar } from './components/CoolAppBar'
import { AuthenticatedHomePage } from './pages/AuthenticatedHomePage'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const userLoggedIn = () => {
    setLoggedIn(true)
  }

  return (
    <>
      <CoolAppBar />
      {loggedIn ? (
        <AuthenticatedHomePage />
      ) : (
        <LogInPage userLoggedIn={userLoggedIn} />
      )}
    </>
  )
}

export default App
