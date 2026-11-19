import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Milliseconds since mount, capped at `endMs`. Returns `endMs` straight away when inactive. */
export function useTimeline(active: boolean, endMs: number) {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const id = window.setInterval(() => {
      const t = performance.now() - start
      setElapsed(Math.min(t, endMs))
      if (t >= endMs) window.clearInterval(id)
    }, 50)
    return () => window.clearInterval(id)
  }, [active, endMs])
  return active ? elapsed : endMs
}

/** Index that advances every `stepMs`, wrapping at `count`. */
export function useCycle(count: number, stepMs: number, active: boolean) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), stepMs)
    return () => window.clearInterval(id)
  }, [count, stepMs, active])
  return index
}

export const FADE_UP = 'animate-[dqc-fade-up_0.5s_ease-out_both]'
