import { useLocation, Link } from 'react-router-dom'
import SEOHead from '../components/ui/SEOHead'
import { CheckCircle, Heart } from 'lucide-react'

export default function DonationSuccessPage() {
  const { state } = useLocation()
  const { reference, amount } = state || {}

  return (
    <>
      <SEOHead title="Donation Successful" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4 pt-20">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-display font-black text-3xl text-dark mb-3">Thank You!</h1>
          <p className="text-gray-500 leading-relaxed mb-6">
            Your generous donation of <strong className="text-primary-800">${amount || '...'} USD</strong> has been received.
            You are making a real difference in South Sudan.
          </p>
          {reference && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-400 mb-1">Reference Number</p>
              <p className="font-mono font-bold text-dark text-sm">{reference}</p>
            </div>
          )}
          <p className="text-sm text-gray-400 mb-8">A confirmation email will be sent to your email address shortly.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/support" className="btn-outline">
              <Heart size={14} className="fill-primary-800" /> Donate Again
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
