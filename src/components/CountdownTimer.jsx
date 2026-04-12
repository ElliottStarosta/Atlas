import React, { useState, useEffect } from 'react'

/** May 2, 2026 · 8:00 AM Eastern (Earl of March, Kanata) */
const TARGET = new Date('2026-05-02T08:00:00-04:00')

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  function getTimeLeft() {
    const diff = TARGET.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days', value: pad(time.days) },
    { label: 'Hours', value: pad(time.hours) },
    { label: 'Minutes', value: pad(time.minutes) },
    { label: 'Seconds', value: pad(time.seconds) },
  ]

  return (
    <div
      className="flex flex-nowrap items-start justify-center gap-1 sm:gap-2"
      role="timer"
      aria-live="polite"
      aria-label="Time until hackathon start"
    >
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          <div className="countdown-digit flex flex-col items-center justify-center px-3 py-3 sm:px-4 sm:py-3 min-w-[64px] sm:min-w-[72px]">
            <span className="font-nature text-4xl sm:text-5xl text-gradient-ocean leading-none tabular-nums">
              {u.value}
            </span>
            <span className="text-aqua-light/70 text-[10px] sm:text-xs uppercase tracking-widest mt-1.5 font-body">
              {u.label}
            </span>
          </div>
          {i < 3 && (
            <span
              className="countdown-colon text-aqua-mid font-light opacity-70 select-none shrink-0 mt-4 sm:mt-5"
              aria-hidden
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}