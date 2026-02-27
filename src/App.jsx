import './App.css'
import { useState, useEffect } from 'react'
import DesktopLayout from './Desktoplayout.jsx';
import MobileLayout from './Mobilelayout.jsx';

function App() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [showPrompt, setShowPrompt] = useState(true)


 useEffect(() => {
  let lastScroll = 0

  const handleScroll = (e) => {
    e.preventDefault()
    const now = Date.now()
    if (now - lastScroll < 200) return
    lastScroll = now
    setShowPrompt(false) //for the prompt

    if (e.deltaY > 0) {
      setSelectedYear(prev => Math.max(prev - 1, 2015))
    } else {
      setSelectedYear(prev => Math.min(prev + 1, 2026))
    }
  }

  window.addEventListener('wheel', handleScroll, { passive: false })
  return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  const props = { selectedYear, setSelectedYear, showPrompt, setShowPrompt }

  return (
     <>
      <div className="hidden md:block">
        <DesktopLayout {...props} />
      </div>
      <div className="block md:hidden">
        <MobileLayout {...props} />
      </div>
    </>
  )
}

export default App
