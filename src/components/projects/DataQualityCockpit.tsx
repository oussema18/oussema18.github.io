import { useEffect, useRef } from 'react'
import {
  dataQualityCockpitMarkup,
  dataQualityCockpitStyles,
  mountDataQualityCockpit,
} from '../../data/data-quality-cockpit'

export function DataQualityCockpit() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    return mountDataQualityCockpit(ref.current)
  }, [])

  return (
    <figure className="mt-10 overflow-hidden rounded-2xl border border-[#deded8]">
      <style>{dataQualityCockpitStyles}</style>
      <div ref={ref} className="dq-host" dangerouslySetInnerHTML={{ __html: dataQualityCockpitMarkup }} />
    </figure>
  )
}
