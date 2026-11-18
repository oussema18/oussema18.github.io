import { ArrowIcon } from '../ui/ArrowIcon'

export function Contact() {
  return (
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
  )
}
