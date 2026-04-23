function YearWheel({ selectedYear, setSelectedYear, setShowPrompt, loaded }) {
  const years = Array.from({ length: 13 }, (_, i) => 2026 - i)

  return (
    <div className="flex flex-col text-right">
      {years.map(year => (
        <div
          key={year}
          className={`cursor-pointer leading-snug ${year === selectedYear ? ' text-black' : 'text-zinc-300'}`}
          onMouseEnter={loaded ? () => { setSelectedYear(year); setShowPrompt(false) } : undefined}
        >
          {year}
        </div>
      ))}
    </div>
  )
}

export default YearWheel
