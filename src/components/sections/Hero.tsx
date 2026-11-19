import { useState } from 'react'
import { ArrowIcon } from '../ui/ArrowIcon'

type Portrait = 'default' | 'smile' | 'point'

const portraitSources: Record<Portrait, string> = {
  default: `${import.meta.env.BASE_URL}images/profile.png`,
  smile: `${import.meta.env.BASE_URL}images/profile-smile.png`,
  point: `${import.meta.env.BASE_URL}images/profile-down.png`,
}

export function Hero() {
  const [isPortraitHovered, setIsPortraitHovered] = useState(false)
  const [isExploreHovered, setIsExploreHovered] = useState(false)

  // Button hover takes priority if both interactions are active.
  const activePortrait: Portrait = isExploreHovered
    ? 'point'
    : isPortraitHovered
      ? 'smile'
      : 'default'

  return (
    <section id="top" aria-labelledby="hero-title" className="grid items-center gap-10 py-12 md:py-14 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col items-start">
        <div className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#66706c]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#4e8b67]" />
          SOFTWARE ENGINEERING x ARTIFICIAL INTELLIGENCE
        </div>

        <h1 id="hero-title" className="text-[clamp(3.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.075em]">
          Beyond what's<br />
          <span className="text-[#3458c6]">possible.</span>
        </h1>

        <p className="mt-9 max-w-[460px] text-lg leading-relaxed text-[#585d59]">
          I'm Oussama — an AI engineer drawn to challenging problems and creative applications of AI. I believe real innovation isn't just about what 
          technology can do, but what we imagine doing with it.
        </p>

        <a
          href="#work"
          onMouseEnter={() => setIsExploreHovered(true)}
          onMouseLeave={() => setIsExploreHovered(false)}
          onFocus={() => setIsExploreHovered(true)}
          onBlur={() => setIsExploreHovered(false)}
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3458c6]"
        >
          Explore my work <ArrowIcon />
        </a>
      </div>

      <div
        className="relative w-full max-w-[400px] overflow-hidden rounded-[2rem] bg-[#e9e9e3]"
        onMouseEnter={() => setIsPortraitHovered(true)}
        onMouseLeave={() => setIsPortraitHovered(false)}
      >
        {/* Render all images so transitions are smooth and hover does not require a new image fetch. */}
        <img
          src={portraitSources.default}
          alt="Portrait of Oussama Masmoudi"
          className="h-[360px] w-full object-cover object-top sm:h-[420px] lg:h-[460px]"
        />
        {(['smile', 'point'] as const).map((pose) => (
          <img
            key={pose}
            src={portraitSources[pose]}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 motion-reduce:transition-none ${activePortrait === pose ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </section>
  )
}
