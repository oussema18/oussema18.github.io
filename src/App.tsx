import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Work } from './components/sections/Work'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#171717] antialiased">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10 lg:px-14">
        <Header />
        <main>
          <Hero />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
