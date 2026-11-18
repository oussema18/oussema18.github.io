import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="flex h-24 items-center justify-between border-b border-[#deded8]">
      <Link to="/#top" aria-label="Oussama Masmoudi, back to top" className="text-xl font-semibold tracking-[-0.08em]">
        Oussama Masmoudi<span className="text-[#3458c6]">.</span>
      </Link>
      <nav aria-label="Main navigation" className="flex items-center gap-5 text-[12px] font-medium sm:gap-9 sm:text-sm">
        <Link className="transition-colors hover:text-[#3458c6]" to="/#work">Work</Link>
        <Link className="transition-colors hover:text-[#3458c6]" to="/#about">About</Link>
        <Link className="transition-colors hover:text-[#3458c6]" to="/#contact">Contact</Link>
      </nav>
    </header>
  )
}
