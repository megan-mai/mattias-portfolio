import { useState, useEffect } from 'react'
import { timeline } from './data.js'

// eslint-disable-next-line
function MobileLayout({ selectedYear, setSelectedYear, showPrompt, setShowPrompt }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1300)
    return () => clearTimeout(t)
  }, [])
    const uniqueLocations = [...new Set(timeline.map(l => l.location))]
    const tickPosition = ((2026 - selectedYear) / (2026 - 2014)) * 100
    const roles = ["Software Engineer", "Game Dev"]
  return (
<div className="flex flex-col items-center justify-center" style={{ height: '100dvh' }}>
      <div className="flex w-fit m-auto gap-[1em]">
         <div className="relative flex flex-col h-full">
           <div className="flex-[25%] flex-1 expand-line" style={{ borderRight: '1px solid black' }} />
          <div className="flex-[25%] flex-1 expand-line" style={{ borderRight: '1px dashed black', animationDelay: '0.2s' }} />
          <div className="flex-[50%] flex-1 expand-line" style={{ borderRight: '1px dotted black', animationDelay: '0.4s' }} />
                  <div 
            className="absolute w-[5px] h-[5px] bg-black rounded-full -right-[2px] transition-all duration-200 -translate-y-1/2"
            style={{ top: `${tickPosition}%` }}
          />  
        </div>

        <div className="flex flex-col gap-y-4 justify-center">

         {/* Name + Profession */}
          <div className="text-zinc-300 leading-snug">
            <a href="https://youtu.be/lCZlTveKg04?si=wIdCwAQwaqN7z1WA&t=6" target='_blank' className="text-black fade-in hover:no-underline" style={{ animationDelay: '0ms'}}>Mattias Lambert</a>
            {roles.map((role, index) => {
              const isActive = timeline.some(r =>
                r.skill === role &&
                selectedYear >= r.startYear &&
                (selectedYear <= r.endYear || r.endYear === null)
              )
              return (
                <p className={isActive ? "text-black fade-in" : "text-zinc-300 fade-in"} style={{ animationDelay: `${(index * 25) + 50}ms`}} key={index}>{role}</p>
              )
            })}

          </div>

          {/* ROLES */}
          <div className="w-64 overflow-visible leading-snug">
          {timeline.map((item, index) => {
            const isActive = selectedYear >= item.startYear && (selectedYear <= item.endYear || item.endYear == null)
            const className = `${isActive ? "text-black" : "text-zinc-300"} flex fade-in cursor-pointer`
            const content = <>{item.role}, {item.company}{item.url && <svg className={`mx-[2px] mt-[6px] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinejoin="miter" strokeLinecap="square" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg>}</>
            const hoverProps = loaded ? { onMouseEnter: () => { setSelectedYear(item.endYear ?? 2026); setShowPrompt(false) } } : {}
            return item.url
              ? <a href={item.url} target="_blank" rel="noopener noreferrer" className={`${className} group hover:no-underline`} style={{ animationDelay: `${(index * 25) + 75}ms` }} key={index} {...hoverProps}>{content}</a>
              : <p className={`${className} group`} style={{ animationDelay: `${(index * 25) + 75}ms` }} key={index} {...hoverProps}>{content}</p>
          })}
          </div>

          
          {/* LOCATIONS */}
          <div className="text-zinc-300 leading-snug">
          {uniqueLocations.map((location, index) => {
              const isActive = timeline.some(l => 
                l.location === location && 
                selectedYear >= l.startYear && 
                (selectedYear <= l.endYear || l.endYear === null)
              )
              return (
                <p className={isActive ? "text-black fade-in" : "text-zinc-300 fade-in"} style={{animationDelay: `${( index * 25 ) + 225}ms` }} key={index}>
                  {location}
                </p>
              )
        })}
          </div>

          <a href="mailto:mattiasl380@gmail.com" className="flex flew-row items-center cursor-pointer fade-in hover:no-underline" style={{ animationDelay: '100ms'}}>
            mattiasl380@gmail.com 
            <svg className='mx-[2px] mt-[2px]' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
          </a>
        </div>
      </div>

      {!showPrompt && <p className="fixed bottom-10 left-1/2 -translate-x-1/2 text-black italic">{selectedYear}</p>}
  </div>
  )
}

export default MobileLayout