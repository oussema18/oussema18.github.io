export function DataQualityCockpit() {
  return (
    <figure className="mt-10 overflow-hidden rounded-2xl border border-[#deded8] bg-[#f4f3ef]">
      <video
        className="block h-auto w-full"
        src={`${import.meta.env.BASE_URL}images/data-quality-cockpit-loop.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Animated preview of the Data Quality Cockpit dashboard"
      />
    </figure>
  )
}
