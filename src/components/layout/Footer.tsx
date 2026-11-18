export function Footer() {
  return (
    <footer className="flex flex-col gap-3 border-t border-[#deded8] py-7 text-xs text-[#777c76] sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} Oussama Masmoudi</span>
      <span>Designed and built with intention.</span>
      <a href="#top" className="font-medium text-[#313531] hover:text-[#3458c6]">Back to top ↑</a>
    </footer>
  )
}
