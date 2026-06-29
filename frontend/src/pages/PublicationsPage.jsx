import { useState, useEffect } from 'react'
import SEOHead from '../components/ui/SEOHead'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getPublications } from '../api/publications'
import { FileText, Download, Calendar } from 'lucide-react'

const DEMO = [
  { id: 1, title: 'Education Policy Brief 2023', description: 'Analysis of education access in South Sudan and MMLF interventions.', author: 'Dr. Sarah Akol', published_date: '2023-06-01', file_url: '#', category: { name: 'Policy' } },
  { id: 2, title: 'Healthcare Impact Report 2022', description: 'Measuring MML Hospital\'s impact on community health outcomes.', author: 'Dr. Grace Amara', published_date: '2022-09-15', file_url: '#', category: { name: 'Healthcare' } },
]

export default function PublicationsPage() {
  const [pubs, setPubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublications()
      .then(res => setPubs(res.data.data))
      .catch(() => setPubs(DEMO))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SEOHead title="Publications" description="Browse research publications, policy briefs, and impact reports from the Michael Makuei Lueth Foundation." />
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">Research & Knowledge</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">Publications</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Research papers, policy briefs, and impact studies that inform and guide our work.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {loading ? <LoadingSpinner /> : (
            <div className="space-y-6">
              {pubs.map(pub => (
                <div key={pub.id} className="card p-6 flex gap-5 items-start">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={24} className="text-primary-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {pub.category && <span className="text-xs bg-secondary-100 text-secondary-800 px-2 py-0.5 rounded-full font-semibold">{pub.category.name}</span>}
                      {pub.published_date && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar size={10} /> {new Date(pub.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-dark text-lg mb-1">{pub.title}</h3>
                    {pub.author && <p className="text-sm text-gray-400 mb-2">By {pub.author}</p>}
                    <p className="text-gray-600 text-sm leading-relaxed">{pub.description}</p>
                  </div>
                  <a href={pub.file_url} target="_blank" rel="noopener noreferrer"
                    className="btn-outline text-xs py-2 px-4 shrink-0 flex items-center gap-1">
                    <Download size={13} /> Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
