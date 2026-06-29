import { useState } from 'react'
import SEOHead from '../components/ui/SEOHead'
import { submitContact } from '../api/contact'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

// Inline SVGs for brand icons removed from lucide-react
const FacebookIcon = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>)
const TwitterIcon  = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.5 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>)
const YoutubeIcon  = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>)
const InstagramIcon= () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>)

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      await submitContact(form)
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setErrors({ general: err.userMessage || 'Failed to send. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead title="Contact Us" description="Get in touch with the Michael Makuei Lueth Foundation. We'd love to hear from you." />

      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">Get In Touch</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">Contact Us</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">We'd love to hear from you. Send us a message and we'll respond within 24–48 hours.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              {success ? (
                <div className="text-center py-16">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                  <h2 className="font-display font-bold text-2xl text-dark mb-3">Message Sent!</h2>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. We will get back to you within 24–48 hours.</p>
                  <button onClick={() => setSuccess(false)} className="btn-primary">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-2xl text-dark mb-6">Send a Message</h2>
                  {errors.general && <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">{errors.general}</div>}
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange}
                          className={`input-field ${errors.name ? 'border-red-400' : ''}`} placeholder="Your name" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                          className={`input-field ${errors.email ? 'border-red-400' : ''}`} placeholder="your@email.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
                        <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="input-field" placeholder="+1 234 567 890" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                        <input id="contact-subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                          className={`input-field ${errors.subject ? 'border-red-400' : ''}`} placeholder="How can we help?" />
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea id="contact-message" name="message" rows={6} value={form.message} onChange={handleChange}
                        className={`input-field ${errors.message ? 'border-red-400' : ''}`} placeholder="Tell us more..." />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button id="contact-submit" type="submit" disabled={loading}
                      className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="font-bold text-dark mb-5">Contact Information</h3>
                <div className="space-y-4">
                  <a href="mailto:info@mmlf.org" className="flex items-start gap-3 text-gray-600 hover:text-primary-800 transition-colors group">
                    <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary-200 transition-colors">
                      <Mail size={16} className="text-primary-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email</p>
                      <p className="font-medium">info@mmlf.org</p>
                    </div>
                  </a>
                  <a href="tel:+211912345678" className="flex items-start gap-3 text-gray-600 hover:text-primary-800 transition-colors group">
                    <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary-200 transition-colors">
                      <Phone size={16} className="text-primary-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Phone</p>
                      <p className="font-medium">+211 912 345 678</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-gray-600">
                    <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-primary-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Address</p>
                      <p className="font-medium">Plot 15, Ministries Road<br />Juba, South Sudan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-dark mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FacebookIcon, label: 'Facebook',  href: 'https://facebook.com/mmlf',  color: 'text-blue-600 bg-blue-50' },
                    { icon: TwitterIcon,  label: 'Twitter/X', href: 'https://twitter.com/mmlf',   color: 'text-sky-500 bg-sky-50' },
                    { icon: YoutubeIcon,  label: 'YouTube',   href: 'https://youtube.com/mmlf',   color: 'text-red-600 bg-red-50' },
                    { icon: InstagramIcon,label: 'Instagram', href: 'https://instagram.com/mmlf', color: 'text-pink-600 bg-pink-50' },
                  ].map(({ icon: Icon, label, href, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-3 rounded-xl ${color} hover:opacity-80 transition-opacity text-sm font-medium`}>
                      <Icon size={16} /> {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-48 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Juba, South Sudan</p>
                  <p className="text-xs mt-1">Map loads with Google Maps API key</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
