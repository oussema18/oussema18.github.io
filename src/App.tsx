import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { HomePage } from './pages/HomePage'
import { ProjectDetailPage, PageNotFound } from './pages/ProjectDetailPage'

function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) {
      target.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#171717] antialiased">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10 lg:px-14">
        <Header />
        <main>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
