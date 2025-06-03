import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { useCallback, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'

function App() {


  const [theme, setTheme] = useLocalStorage('isDark', false)

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleDarkModeClick = useCallback(() => {
    setTheme((prev) => !prev)
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <Header handleDarkModeClick={handleDarkModeClick} />
      <Body />
    </div>
  )
}

export default App
