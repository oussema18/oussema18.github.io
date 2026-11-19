import { useEffect, useState } from 'react'

type ScoreDonutProps = {
  score: number
  label?: string
  className?: string
}

const SIZE = 220
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2 - 6
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const DURATION_MS = 1600

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ScoreDonut({ score, label = 'Data quality score', className = '' }: ScoreDonutProps) {
  const target = Math.min(Math.max(score, 0), 100)
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  const filled = (value / 100) * CIRCUMFERENCE
  const center = SIZE / 2

  return (
    <figure
      className={`@container relative aspect-square w-[clamp(8.5rem,40vw,13.75rem)] shrink-0 ${className}`}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`${label}: ${target.toFixed(2)}%`}
        className="h-full w-full -rotate-90"
      >
        <circle cx={center} cy={center} r={RADIUS + 12} fill="none" stroke="#deded8" strokeWidth={1} />
        <circle cx={center} cy={center} r={RADIUS} fill="none" stroke="#e4e6df" strokeWidth={STROKE} />
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          stroke="#3d8b5f"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
        />
      </svg>
      <figcaption
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <span className="mb-[3.5cqw] flex items-center gap-[2.5cqw] text-[4.5cqw] font-semibold uppercase tracking-[0.14em] text-[#3d8b5f]">
          <span className="h-[2.7cqw] w-[2.7cqw] rounded-full bg-[#3d8b5f]" />
          Average
        </span>
        <span className="text-[16cqw] font-semibold leading-none tabular-nums tracking-[-0.05em] text-[#1d1f1c]">
          {value.toFixed(2)}%
        </span>
        <span className="mt-[3.5cqw] max-w-[60cqw] text-[4.5cqw] font-semibold uppercase leading-snug tracking-[0.14em] text-[#666b65]">
          {label}
        </span>
      </figcaption>
    </figure>
  )
}
