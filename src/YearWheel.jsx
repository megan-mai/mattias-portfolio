const RANGE = 13   // 2014 – 2026
const COUNT = RANGE
const HALF  = Math.floor(COUNT / 2)  // 6

function YearWheel({ selectedYear }) {
  const rows = Array.from({ length: COUNT }, (_, i) => {
    const offset   = HALF - i
    const baseIdx  = selectedYear - 2014
    const idx      = ((baseIdx + offset) % RANGE + RANGE) % RANGE
    return 2014 + idx
  })

  return (
    <div className="text-right" style={{ minWidth: '4ch' }}>
      <div className="flex flex-col">
        {rows.map((year, i) => (
          <div key={i} className={`leading-normal ${i === HALF ? 'text-black' : 'text-zinc-300'}`}>
            {year}
          </div>
        ))}
      </div>
    </div>
  )
}

export default YearWheel
