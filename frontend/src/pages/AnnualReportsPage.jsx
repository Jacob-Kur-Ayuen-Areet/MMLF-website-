import { useState, useEffect } from 'react'
import SEOHead from '../components/ui/SEOHead'
import { ReportCard } from '../components/ui/Cards'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getReports } from '../api/reports'

const DEMO = [
  { id: 1, title: 'Annual Report 2023', report_year: 2023, description: 'Comprehensive overview of MMLF activities, programs, and financial statements for 2023.', file_url: '#' },
  { id: 2, title: 'Annual Report 2022', report_year: 2022, description: 'Comprehensive overview of MMLF activities, programs, and financial statements for 2022.', file_url: '#' },
  { id: 3, title: 'Annual Report 2021', report_year: 2021, description: 'Comprehensive overview of MMLF activities, programs, and financial statements for 2021.', file_url: '#' },
]

export default function AnnualReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReports()
      .then(res => setReports(res.data.data))
      .catch(() => setReports(DEMO))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SEOHead title="Annual Reports" description="Download the Michael Makuei Lueth Foundation's annual reports and financial statements." />
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">Transparency & Accountability</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">Annual Reports</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">We publish our annual reports openly to ensure full accountability to our donors, partners, and the communities we serve.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          {loading ? <LoadingSpinner /> : (
            <div className="space-y-4">
              {reports.map(r => <ReportCard key={r.id} report={r} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
