const projects = [
  {
    number: '01',
    category: 'COMPUTER VISION / RESEARCH',
    title: 'Explainable image classification',
    description:
      'Exploring how neural networks can recognize and explain visual patterns in industrial components.',
    tags: ['Python', 'Deep Learning', 'XAI'],
  },
  {
    number: '02',
    category: 'APPLIED AI / NLP',
    title: 'Knowledge retrieval with AI',
    description:
      'Building approaches that connect natural-language questions with relevant information in documents.',
    tags: ['RAG', 'LLMs', 'Python'],
  },
  {
    number: '03',
    category: 'SOFTWARE / DATA',
    title: 'Reliable data workflows',
    description:
      'Designing software and data checks that help turn complex information into dependable results.',
    tags: ['TypeScript', 'Data Engineering', 'APIs'],
  },
]

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
      <path d="M5 19 19 5M8 5h11v11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
      <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#171717] antialiased">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10 lg:px-14">
        <header className="flex h-24 items-center justify-between border-b border-[#deded8]">
          <a href="#top" aria-label="Oussama Masmoudi, back to top" className="text-xl font-semibold tracking-[-0.08em]">
            Oussama Masmoudi<span className="text-[#3458c6]">.</span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-[12px] font-medium sm:gap-9 sm:text-sm">
            <a className="transition-colors hover:text-[#3458c6]" href="#work">Work</a>
            <a className="transition-colors hover:text-[#3458c6]" href="#about">About</a>
            <a className="transition-colors hover:text-[#3458c6]" href="#contact">Contact</a>
          </nav>
        </header>

        <main>
          <section
            id="top"
            aria-labelledby="hero-title"
            className="grid items-center gap-10 py-12 md:py-14 lg:grid-cols-2 lg:gap-12"
          >
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-start">
              <div className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#66706c]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#4e8b67]" />
                Building at the intersection of AI and software
              </div>

              <h1
                id="hero-title"
                className="text-[clamp(3.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.075em]"
              >
                Making ideas
                <br />
                <span className="text-[#3458c6]">intelligent.</span>
              </h1>

              <p className="mt-9 max-w-[460px] text-lg leading-relaxed text-[#585d59]">
                I'm Oussama — an AI engineer and software developer
                turning complex problems into simple, useful experiences.
              </p>

              <a
                href="#work"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3458c6]"
              >
                Explore my work <ArrowIcon />
              </a>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] overflow-hidden rounded-[2rem] bg-[#e9e9e3]">
                <img
                  src="/images/profile.png"
                  alt="Portrait of Oussama Masmoudi"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </section>

          <section id="work" aria-labelledby="work-title" className="scroll-mt-24 border-b border-[#deded8] py-24 md:py-28">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">01 / SELECTED WORK</p>
                <h2 id="work-title" className="section-title">Things I've worked on<span className="text-[#3458c6]">.</span></h2>
              </div>
              <p className="max-w-[290px] text-sm leading-relaxed text-[#777c76]">A few areas where software engineering meets applied intelligence.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <article key={project.number} className="group flex min-h-[360px] flex-col rounded-2xl border border-[#deded8] bg-[#fbfbf8] p-7 transition-colors hover:border-[#aeb5c9] hover:bg-white">
                  <div className="mb-16 flex items-center justify-between text-xs text-[#757a75]">
                    <span>{project.number} / 03</span>
                    <ArrowIcon diagonal />
                  </div>
                  <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-[#3458c6]">{project.category}</p>
                  <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-[-0.045em]">{project.title}</h3>
                  <p className="mb-7 text-sm leading-relaxed text-[#646963]">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#e1e3db] px-3 py-1 text-[11px] text-[#666b65]">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs text-[#777c76]">Selected work is described at a high level; no confidential materials are shared.</p>
          </section>

          <section id="about" aria-labelledby="about-title" className="scroll-mt-24 grid gap-9 border-b border-[#deded8] py-24 md:grid-cols-[1fr_1.35fr] md:gap-20 md:py-28">
            <div>
              <p className="eyebrow">02 / ABOUT ME</p>
              <h2 id="about-title" className="section-title">Curious by<br />design<span className="text-[#3458c6]">.</span></h2>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <p className="text-xl leading-relaxed tracking-[-0.025em] md:text-2xl">
                I enjoy building technology that feels straightforward on the surface — even when the problems underneath are anything but.
              </p>
              <p className="max-w-[590px] leading-relaxed text-[#626761]">
                With a background in Artificial Intelligence and Machine Learning at TU Darmstadt, I bring together research-minded thinking and practical software development. My interests include machine learning, explainable AI, and robust, user-focused applications.
              </p>
              <div className="flex flex-wrap gap-2 pt-3">
                {['Python', 'React', 'TypeScript', 'Machine Learning', 'Java', 'LLMs'].map((skill) => (
                  <span key={skill} className="rounded-full bg-[#e9ebe5] px-4 py-2 text-xs font-medium text-[#535a53]">{skill}</span>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-24 md:py-32">
            <p className="eyebrow">03 / LET'S CONNECT</p>
            <h2 id="contact-title" className="max-w-[900px] text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[1.04] tracking-[-0.07em]">
              Have something<br />in mind<span className="text-[#3458c6]">?</span>
            </h2>
            <p className="mt-7 max-w-[420px] text-lg text-[#626761]">I'm always interested in thoughtful ideas, good engineering, and conversations about AI.</p>
            <a href="https://github.com/oussema18" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 border-b border-[#171717] pb-2 font-semibold transition-colors hover:border-[#3458c6] hover:text-[#3458c6]">
              Find me on GitHub <ArrowIcon diagonal />
            </a>
          </section>
        </main>
        <footer className="flex flex-col gap-3 border-t border-[#deded8] py-7 text-xs text-[#777c76] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Oussama Masmoudi</span>
          <span>Designed and built with intention.</span>
          <a href="#top" className="font-medium text-[#313531] hover:text-[#3458c6]">Back to top ↑</a>
        </footer>
      </div>
    </div>
  )
}

export default App
