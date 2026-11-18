import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Hero } from '../components/sections/Hero'
import { Work } from '../components/sections/Work'

export function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Contact />
    </>
  )
}
