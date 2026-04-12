import React, { useMemo } from 'react'

/** Fixed layout — no Math.random (stable paint) + fewer nodes for smoother scroll */
const BUBBLE_PRESET = [
  { size: 14, left: 8, top: 12, dur: 18, delay: 0 },
  { size: 10, left: 72, top: 8, dur: 22, delay: 4 },
  { size: 18, left: 45, top: 55, dur: 20, delay: 2 },
  { size: 8, left: 88, top: 38, dur: 24, delay: 8 },
  { size: 12, left: 22, top: 72, dur: 19, delay: 6 },
  { size: 16, left: 58, top: 22, dur: 21, delay: 1 },
]

export default function Bubbles() {
  const bubbles = useMemo(() => BUBBLE_PRESET.map((b, i) => ({ ...b, id: i })), [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: 'layout style' }}
      aria-hidden
    >
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bubble-float"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            top: `${b.top}%`,
            '--dur': `${b.dur}s`,
            '--delay': `${b.delay}s`,
            background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), transparent 60%)',
            border: '1px solid rgba(125,211,252,0.28)',
          }}
        />
      ))}
    </div>
  )
}
