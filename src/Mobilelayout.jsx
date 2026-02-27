import { timeline } from './data.js'

// eslint-disable-next-line
function MobileLayout({ selectedYear, setSelectedYear, showPrompt, setShowPrompt }) {
    const uniqueLocations = [...new Set(timeline.map(l => l.location))]
    const tickPosition = ((2026 - selectedYear) / (2026 - 2015)) * 100
    const roles = ["Software Engineer", "Game Dev"]
  return (
     <div className="h-screen m-0 flex flex-col items-center justify-center">
      <div className="flex w-fit m-auto gap-[2em]">
         <div className="relative flex flex-col h-full">
          <div className="flex-[25%] border-r-1 border-solid"></div>
          <div className="flex-[25%] border-r-1 border-dashed"></div>
          <div className="flex-[50%] border-r-1 border-dotted"></div>
          <div 
            className="absolute w-[5px] h-[5px] bg-black rounded-full -right-[2px] transition-all duration-200"
            style={{ top: `${tickPosition}%` }}
          />    
        </div>

        <div className="flex flex-col gap-y-4 justify-center">

         {/* Name + Profession */}
          <div className="text-zinc-300">
            <p className="text-black fade-in" style={{ animationDelay: '0ms'}}>Mattias /mɑːˈtiːɑːs/ </p>
            {roles.map((role, index) => {
              const isActive = timeline.some(r =>
                r.skill === role &&
                selectedYear >= r.startYear &&
                (selectedYear <= r.endYear || r.endYear === null)
              )
              return (
                <p className={isActive ? "text-black fade-in" : "text-zinc-300 fade-in"} style={{ animationDelay: `${(index * 100) +100}ms`}} key={index}>{role}</p>
              )
            })}

          </div>

          {/* ROLES */}
          <div className="w-64">
          {timeline.map((item, index) => (
            <p className={selectedYear >= item.startYear && (selectedYear <= item.endYear || item.endYear == null) ? "text-black flex fade-in" : "text-zinc-300 flex fade-in"} 
                style={{ animationDelay: `${(index * 100) + 300}ms` }} key={index}>
              {item.role}, {item.company}           
            </p>
          ))}
          </div>

          
          {/* LOCATIONS */}
          <div className="text-zinc-300">
          {uniqueLocations.map((location, index) => {
              const isActive = timeline.some(l => 
                l.location === location && 
                selectedYear >= l.startYear && 
                (selectedYear <= l.endYear || l.endYear === null)
              )
              return (
                <p className={isActive ? "text-black fade-in" : "text-zinc-300 fade-in"} style={{animationDelay: `${(index*100) + 900}ms` }} key={index}>
                  {location}
                </p>
              )
        })}
          </div>

          <a href="mailto:mattiasl380@gmail.com" className="flex flew-row items-center cursor-pointer fade-in hover:underline" style={{ animationDelay: '1200ms'}}>
            mattiasl380@gmail.com 
            <svg className='mx-[2px] mt-[2px]' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
          </a>
        </div>
      </div>

      {showPrompt ? (
              <p className={showPrompt ? "prompt-pulse fixed bottom-10 left-1/2 -translate-x-1/2 italic" : "prompt-fadeout fixed bottom-10 left-1/2 -translate-x-1/2 italic"}>
  Scroll to explore
</p>
        ) : <p className="fixed bottom-10 left-1/2 -translate-x-1/2 text-black italic">{selectedYear}</p>}
  </div>
  )
}

export default MobileLayout