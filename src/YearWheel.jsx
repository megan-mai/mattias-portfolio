import { useEffect, useRef } from 'react'

function YearWheel({ selectedYear, setSelectedYear}) {
  const years = Array.from({ length: 13 }, (_, i) => 2026 - i)
  const repeated = [...years, ...years, ...years]
  const selectedIndexRef = useRef(years.length) // start in middle repeat
  const listRef = useRef(null)
  const pickerRef = useRef(null)
  const itemHeight = 24 // match your leading-[1.5] line height

  function render() {
    const list = listRef.current
    const picker = pickerRef.current
    if (!list || !picker) return

    const offset = -selectedIndexRef.current * itemHeight + (picker.offsetHeight / 2) - (itemHeight / 2)
    list.style.transform = `translateY(${offset}px)`

    const actualIndex = selectedIndexRef.current % years.length
    setSelectedYear(years[actualIndex])

    // silently reset to middle repeat
    if (selectedIndexRef.current < years.length / 2) {
      selectedIndexRef.current += years.length
    } else if (selectedIndexRef.current > years.length * 2.5) {
      selectedIndexRef.current -= years.length
    }

    // update bold
    list.querySelectorAll('.wheel-item').forEach((el, i) => {
      el.classList.toggle('text-black', i === selectedIndexRef.current)
      el.classList.toggle('text-zinc-300', i !== selectedIndexRef.current)
    })
  }

  useEffect(() => {
    render()
  }, [])

  useEffect(() => {
  const actualIndex = years.indexOf(selectedYear)
  const currentBase = Math.floor(selectedIndexRef.current / years.length) * years.length
  selectedIndexRef.current = currentBase + actualIndex
  render()
}, [selectedYear])

  return (
    <div ref={pickerRef} className="overflow-hidden googl" style={{ height: itemHeight * 13 }}>
      <div ref={listRef} className="relative">
        {repeated.map((year, i) => (
          <div
            key={i}
            className="wheel-item text-zinc-300"
            style={{ height: itemHeight, lineHeight: `${itemHeight}px`, textAlign: 'right' }}
           
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  )
}

export default YearWheel