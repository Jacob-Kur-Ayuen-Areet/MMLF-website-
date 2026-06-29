import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Heart } from 'lucide-react'

const programs = [
  { name: 'Scholarship Program', href: '/programs/scholarship-program', icon: '🎓' },
  { name: "Children's Home Project", href: '/programs/childrens-home-project', icon: '🏠' },
  { name: 'Healthcare Services', href: '/programs/healthcare-services', icon: '🏥' },
]

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs', hasDropdown: true },
  { name: 'News', href: '/news' },
  { name: 'Reports', href: '/reports' },
  { name: 'Publications', href: '/publications' },
  { name: 'Legacy', href: '/legacy' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setProgramsOpen(false)
  }, [location])

  const navBg = 'bg-dark-900 shadow-lg'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${navBg}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 shrink-0 group">
            <img 
              src="/logo.png" 
              alt="Michael Makuei Lueth Foundation Logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="text-white font-display font-bold text-xs sm:text-sm md:text-base leading-tight">
              Michael Makuei Lueth<br /><span className="text-primary-400">Foundation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative" onMouseLeave={() => setProgramsOpen(false)}>
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-white/90 hover:text-secondary-400 font-medium text-sm transition-colors rounded-lg hover:bg-white/10"
                    onMouseEnter={() => setProgramsOpen(true)}
                    onClick={() => setProgramsOpen(!programsOpen)}
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Mega Menu */}
                  {programsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                      <div className="p-2">
                        <Link to="/programs" className="flex items-center gap-3 px-4 py-2 text-sm text-primary-900 font-semibold hover:bg-primary-50 rounded-lg transition-colors mb-1">
                          All Programs →
                        </Link>
                        <div className="border-t border-gray-100 pt-2">
                          {programs.map((prog) => (
                            <Link
                              key={prog.href}
                              to={prog.href}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors group"
                            >
                              <span className="text-xl">{prog.icon}</span>
                              <span className="text-sm text-gray-700 group-hover:text-primary-800 font-medium">{prog.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-secondary-400 bg-white/10'
                        : 'text-white/90 hover:text-secondary-400 hover:bg-white/10'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/support"
              id="navbar-donate-btn"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary-700 text-dark font-semibold text-sm rounded-full hover:bg-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Heart size={14} className="fill-current" />
              Donate
            </Link>
            <button
              id="navbar-mobile-toggle"
              className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-dark-800 border-t border-white/10 pb-6 animate-fade-in">
            <div className="pt-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors ${
                        isActive
                          ? 'text-secondary-400 bg-white/10'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                  {link.hasDropdown && (
                    <div className="ml-6 mt-1 space-y-1">
                      {programs.map((prog) => (
                        <Link
                          key={prog.href}
                          to={prog.href}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-white/60 hover:text-secondary-400 rounded-lg mx-2 transition-colors"
                        >
                          <span>{prog.icon}</span> {prog.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4">
                <Link to="/support" className="btn-secondary w-full justify-center text-sm py-3">
                  <Heart size={14} className="fill-current" /> Donate Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
