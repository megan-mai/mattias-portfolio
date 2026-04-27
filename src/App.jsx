import './App.css'
import { useState, useEffect, useRef } from 'react'
import DesktopLayout from './Desktoplayout.jsx';
import MobileLayout from './Mobilelayout.jsx';
import { timeline } from './data.js'

function App() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [showPrompt, setShowPrompt] = useState(true)
  const selectedYearRef = useRef(selectedYear)
  const showPromptRef = useRef(true)
  const promptStartTime = useRef(Date.now())

  useEffect(() => { selectedYearRef.current = selectedYear }, [selectedYear])
  useEffect(() => { showPromptRef.current = showPrompt }, [showPrompt])

  useEffect(() => {
    let lastScroll = 0
    let touchStartY = 0

    const handleScroll = (e) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScroll < 200) return
      lastScroll = now
      if (Date.now() - promptStartTime.current >= 2000) setShowPrompt(false)

      if (e.deltaY > 0) {
        setSelectedYear(prev => Math.max(prev - 1, 2014))
      } else {
        setSelectedYear(prev => Math.min(prev + 1, 2026))
      }
    }

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const diff = touchStartY - e.touches[0].clientY
      if (Math.abs(diff) < 30) return
      touchStartY = e.touches[0].clientY
      if (Date.now() - promptStartTime.current >= 2000) setShowPrompt(false)
      if (diff > 0) {
        setSelectedYear(prev => Math.max(prev - 1, 2014))
      } else {
        setSelectedYear(prev => Math.min(prev + 1, 2026))
      }
    }

    const handleClick = (e) => {
      if (showPromptRef.current) {
        if (Date.now() - promptStartTime.current < 2000) return
        setShowPrompt(false)
        return
      }
      if (e.target.closest('a')) return
      const year = selectedYearRef.current
      const activeItem = timeline.find(item =>
        year >= item.startYear &&
        (year <= item.endYear || item.endYear === null) &&
        item.url
      )
      if (activeItem) window.open(activeItem.url, '_blank', 'noopener,noreferrer')
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('click', handleClick)
    }
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
      <div className={showPrompt ? 'onboarding-overlay' : 'onboarding-overlay onboarding-overlay-out'}>
        <p className="onboarding-text leading-snug">
          <span className="flex items-center justify-center gap-[5px]">SCROLL <span className="inline-block w-[5px] h-[5px] bg-black rounded-full" /> to explore</span>
          <span className="flex items-center justify-center gap-[4px]">CLICK <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinejoin="miter" strokeLinecap="square" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg> to visit</span>
        </p>
      </div>
    </>
  )
}

export default App
