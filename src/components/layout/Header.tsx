export function Header() {
  return (
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
  )
}
