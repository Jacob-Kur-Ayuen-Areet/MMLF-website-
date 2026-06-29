import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/ui/ErrorBoundary'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import AnnualReportsPage from './pages/AnnualReportsPage'
import PublicationsPage from './pages/PublicationsPage'
import LegacyPage from './pages/LegacyPage'
import SupportPage from './pages/SupportPage'
import ContactPage from './pages/ContactPage'
import DonationSuccessPage from './pages/DonationSuccessPage'
import NotFoundPage from './pages/NotFoundPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/programs" element={<Layout><ProgramsPage /></Layout>} />
            <Route path="/programs/:slug" element={<Layout><ProgramDetailPage /></Layout>} />
            <Route path="/news" element={<Layout><NewsPage /></Layout>} />
            <Route path="/news/:slug" element={<Layout><NewsDetailPage /></Layout>} />
            <Route path="/reports" element={<Layout><AnnualReportsPage /></Layout>} />
            <Route path="/publications" element={<Layout><PublicationsPage /></Layout>} />
            <Route path="/legacy" element={<Layout><LegacyPage /></Layout>} />
            <Route path="/support" element={<Layout><SupportPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/donation/success" element={<Layout><DonationSuccessPage /></Layout>} />
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  )
}
