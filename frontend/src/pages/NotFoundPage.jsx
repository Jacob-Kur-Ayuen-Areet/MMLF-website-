import { Link } from 'react-router-dom'
import SEOHead from '../components/ui/SEOHead'

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="404 — Page Not Found" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 px-4 pt-20">
        <div className="text-center max-w-lg">
          <div className="font-display font-black text-[160px] leading-none text-primary-100 select-none">404</div>
          <h1 className="font-display font-bold text-3xl text-dark -mt-8 mb-4">Page Not Found</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  )
}
