import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

// Social icons as inline SVGs (lucide-react removed these brand icons)
const FacebookIcon = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>)
const TwitterIcon = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.5 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>)
const YoutubeIcon = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>)
const InstagramIcon = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>)
import { useState } from 'react'

const footerLinks = {
  'Foundation': [
    { name: 'About Us', href: '/about' },
    { name: 'Our Legacy', href: '/legacy' },
    { name: 'Leadership', href: '/about#leadership' },
    { name: 'Annual Reports', href: '/reports' },
  ],
  'Programs': [
    { name: 'Scholarship Program', href: '/programs/scholarship-program' },
    { name: "Children's Home", href: '/programs/childrens-home-project' },
    { name: 'Healthcare Services', href: '/programs/healthcare-services' },
    { name: 'All Programs', href: '/programs' },
  ],
  'Resources': [
    { name: 'News & Updates', href: '/news' },
    { name: 'Publications', href: '/publications' },
    { name: 'Support Us', href: '/support' },
    { name: 'Contact', href: '/contact' },
  ],
}

const socialLinks = [
  { icon: FacebookIcon, href: 'https://facebook.com/mmlf', label: 'Facebook' },
  { icon: TwitterIcon, href: 'https://twitter.com/mmlf', label: 'Twitter' },
  { icon: YoutubeIcon, href: 'https://youtube.com/mmlf', label: 'YouTube' },
  { icon: InstagramIcon, href: 'https://instagram.com/mmlf', label: 'Instagram' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-dark-900 text-white">
      {/* Newsletter Strip */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700">
        <div className="container-custom py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white">Stay Connected with MMLF</h3>
              <p className="text-white/80 text-sm mt-1">Get updates on our programs, impact, and upcoming events.</p>
            </div>
            {subscribed ? (
              <div className="text-secondary-300 font-semibold flex items-center gap-2">
                <Heart size={16} className="fill-current" /> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-lg text-dark bg-white flex-1 md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-400"
                />
                <button type="submit" id="newsletter-submit" className="btn-secondary text-sm py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-4 mb-6 group">
              <div className="w-16 h-16 bg-white rounded-full p-1 shadow-lg shrink-0 overflow-hidden transition-transform group-hover:scale-110">
                <img
                  src="/logo.png"
                  alt="Michael Makuei Lueth Foundation Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">Michael Makuei Lueth</div>
                <div className="text-secondary-400 text-xs">Foundation</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering South Sudanese communities through education, healthcare, and transformative development programs.
            </p>
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="mailto:info@mmlf.org" className="flex items-center gap-3 text-white/60 hover:text-secondary-400 transition-colors">
                <Mail size={14} className="shrink-0" /> info@mmlf.org
              </a>
              <a href="tel:+211912345678" className="flex items-center gap-3 text-white/60 hover:text-secondary-400 transition-colors">
                <Phone size={14} className="shrink-0" /> +211 912 345 678
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                <span>Plot 15, Ministries Road,<br />Juba, South Sudan</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary-700 hover:text-dark flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-secondary-400 text-xs uppercase tracking-widest mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Michael Makuei Lueth Foundation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white/80 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
