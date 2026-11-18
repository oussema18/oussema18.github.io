import { skills } from '../../data/skills'

export function About() {
  return (
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
          {skills.map((skill) => (
            <span key={skill} className="rounded-full bg-[#e9ebe5] px-4 py-2 text-xs font-medium text-[#535a53]">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
