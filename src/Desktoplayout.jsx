import { timeline } from './data.js'
import YearWheel from './YearWheel'

function DesktopLayout({ selectedYear }) {
  const uniqueLocations = [...new Set(timeline.map(l => l.location))]
  const roles = ["Software Engineer", "Game Dev"]

  return (
   
    <div className="h-screen m-0 flex flex-col items-center justify-center">
      <div className="flex w-fit m-auto gap-[2em] items-center">

        <YearWheel selectedYear={selectedYear} />
        
        {/* Line */}
        <div className="relative flex flex-col h-full px-4 -mx-4">
          <div className="flex-1 border-r border-dotted expand-line" />
          <div
            className="absolute bottom-0 left-0 right-4 border-r border-solid transition-all duration-200"
            style={{ height: `${((2026 - selectedYear) / (2026 - 2014)) * 100}%` }}
          />
        </div>

        <div className="flex flex-col gap-y-4 justify-center">

          {/* Name + Profession */}
          <div className="text-zinc-300 leading-snug">
            <a href="https://youtu.be/lCZlTveKg04?si=wIdCwAQwaqN7z1WA&t=6" className="text-black fade-in hover:no-underline" style={{ animationDelay: '0ms'}}>Mattias Lambert</a>
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
          <div className="w-64 leading-snug">
          {timeline.map((item, index) => {
            const isActive = selectedYear >= item.startYear && (selectedYear <= item.endYear || item.endYear == null)
            const className = `${isActive ? "text-black" : "text-zinc-300"} flex fade-in`
            const content = <>{item.role}, {item.company}{item.url && <svg className={`mx-[2px] self-center h-[1em] w-[1em] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinejoin="miter" strokeLinecap="square" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg>}</>
              return item.url
              ? <a href={item.url}  className={`${className} group hover:no-underline`} style={{ animationDelay: `${(index * 100) + 300}ms` }} key={index}>{content}</a>
              : <p className={`${className} group`} style={{ animationDelay: `${(index * 100) + 300}ms` }} key={index}>{content}</p>
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
                <p className={isActive ? "text-black fade-in" : "text-zinc-300 fade-in"} style={{animationDelay: `${(index*100) + 900}ms` }} key={index}>
                  {location}
                </p>
              )
        })}
          </div>

          <a href="mailto:mattiasl380@gmail.com" className="flex flew-row items-center cursor-pointer fade-in hover:no-underline" style={{ animationDelay: '1200ms'}}>
            mattiasl380@gmail.com
          </a>
        </div>
      </div>

  </div>
    )
}

export default DesktopLayout