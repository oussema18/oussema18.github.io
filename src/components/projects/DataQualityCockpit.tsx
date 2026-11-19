export function DataQualityCockpit() {
  return (
    <section aria-labelledby="cockpit-preview" className="mt-12">
      <h2 id="cockpit-preview" className="text-sm font-semibold tracking-tight text-[#585d59]">
        Cockpit preview
      </h2>
      <figure className="mt-3 overflow-hidden rounded-2xl border border-[#deded8] bg-[#f4f3ef]">
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
    </section>
  )
}
