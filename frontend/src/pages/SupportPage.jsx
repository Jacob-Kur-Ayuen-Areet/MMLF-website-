import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/ui/SEOHead'
import { submitDonation } from '../api/donations'
import { Heart, Shield, ChevronRight, Check } from 'lucide-react'

const AMOUNTS = [25, 50, 100, 250, 500, 1000]
const PURPOSES = ['Scholarship Program', "Children's Home Project", 'Healthcare Services', 'Where Most Needed']

export default function SupportPage() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [form, setForm] = useState({ donor_name: '', donor_email: '', donor_phone: '', donor_country: '', purpose: PURPOSES[3], message: '', is_anonymous: false })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const finalAmount = customAmount ? parseFloat(customAmount) : amount

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!form.donor_name.trim()) errs.donor_name = 'Name is required'
    if (!form.donor_email.trim() || !/\S+@\S+\.\S+/.test(form.donor_email)) errs.donor_email = 'Valid email is required'
    if (!finalAmount || finalAmount < 1) errs.amount = 'Please enter a valid amount'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await submitDonation({ ...form, amount: finalAmount, currency: 'USD' })
      navigate('/donation/success', { state: { reference: res.data.reference, amount: finalAmount } })
    } catch (err) {
      setErrors({ general: err.userMessage || 'Submission failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead title="Support Us" description="Support the Michael Makuei Lueth Foundation. Your donation funds scholarships, children's care, and healthcare in South Sudan." />

      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">Make a Difference</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">Support Our Mission</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Your generous donation helps us provide education, shelter, and healthcare to thousands of South Sudanese in need.</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Donation Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="font-display font-bold text-2xl text-dark mb-6">Make a Donation</h2>
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">{errors.general}</div>
              )}
              <form id="donation-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Donation Amount (USD)</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {AMOUNTS.map(a => (
                      <button key={a} type="button" onClick={() => { setAmount(a); setCustomAmount('') }}
                        className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${!customAmount && amount === a ? 'bg-primary-800 text-white border-primary-800 shadow-md' : 'border-gray-200 text-gray-700 hover:border-primary-400'}`}>
                        ${a}
                      </button>
                    ))}
                  </div>
                  <input
                    id="custom-amount"
                    type="number"
                    placeholder="Or enter custom amount"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setAmount(0) }}
                    min="1"
                    className={`input-field ${errors.amount ? 'border-red-400' : ''}`}
                  />
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Purpose</label>
                  <select name="purpose" value={form.purpose} onChange={handleChange} className="input-field">
                    {PURPOSES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>

                {/* Donor Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input id="donor-name" name="donor_name" type="text" value={form.donor_name} onChange={handleChange}
                      className={`input-field ${errors.donor_name ? 'border-red-400' : ''}`} placeholder="John Deng" />
                    {errors.donor_name && <p className="text-red-500 text-xs mt-1">{errors.donor_name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input id="donor-email" name="donor_email" type="email" value={form.donor_email} onChange={handleChange}
                      className={`input-field ${errors.donor_email ? 'border-red-400' : ''}`} placeholder="john@example.com" />
                    {errors.donor_email && <p className="text-red-500 text-xs mt-1">{errors.donor_email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
                    <input id="donor-phone" name="donor_phone" type="tel" value={form.donor_phone} onChange={handleChange} className="input-field" placeholder="+1 234 567 890" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <input id="donor-country" name="donor_country" type="text" value={form.donor_country} onChange={handleChange} className="input-field" placeholder="Your country" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea id="donor-message" name="message" value={form.message} onChange={handleChange} rows={3} className="input-field" placeholder="Share why you're donating..." />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" id="is-anonymous" name="is_anonymous" checked={form.is_anonymous} onChange={handleChange} className="w-4 h-4 accent-primary-700" />
                  <span className="text-sm text-gray-600">Make my donation anonymous</span>
                </label>

                <div className="bg-primary-50 rounded-xl p-4 flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Total Donation</span>
                  <span className="font-display font-black text-2xl text-primary-800">${finalAmount || '0'} USD</span>
                </div>

                <button id="donate-submit" type="submit" disabled={loading}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Processing...' : <><Heart size={18} className="fill-current" /> Donate ${finalAmount || 0} Now</>}
                </button>
                <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                  <Shield size={12} /> Secure & encrypted. We never store your payment information.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-primary-900 rounded-3xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Your Impact</h3>
                <ul className="space-y-3">
                  {[
                    { amount: '$25', impact: 'Provides school supplies for one student for a month' },
                    { amount: '$50', impact: 'Covers one month of nutritious meals for a child' },
                    { amount: '$100', impact: 'Funds a medical consultation for 5 patients' },
                    { amount: '$250', impact: 'Contributes to one semester of a scholarship' },
                    { amount: '$500', impact: 'Provides full scholarship for one academic year' },
                  ].map(item => (
                    <li key={item.amount} className="flex items-start gap-3 text-sm">
                      <Check size={14} className="text-secondary-400 shrink-0 mt-0.5" />
                      <span><strong className="text-secondary-400">{item.amount}</strong> — {item.impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-dark mb-3">Other Ways to Help</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary-600" /> Volunteer your skills</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary-600" /> Organize a fundraiser</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary-600" /> Corporate partnership</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary-600" /> In-kind donations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
