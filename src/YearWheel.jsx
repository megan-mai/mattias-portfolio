function YearWheel({ selectedYear }) {
  const years = Array.from({ length: 13 }, (_, i) => 2026 - i)

  return (
    <div className="flex flex-col text-right">
      {years.map(year => (
        <div
          key={year}
          className={`leading-normal ${year === selectedYear ? ' text-black' : 'text-zinc-300'}`}
        >
          {year}
        </div>
      ))}
    </div>
  )
}

export default YearWheel
