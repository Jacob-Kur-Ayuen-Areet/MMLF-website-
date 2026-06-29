import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/ui/SEOHead'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getProgram } from '../api/programs'
import { ArrowLeft, Heart } from 'lucide-react'

const DEMO = {
  'scholarship-program': {
    id: 1, slug: 'scholarship-program', title: 'Scholarship Program', icon: 'graduation-cap',
    summary: 'Empowering South Sudanese youth through education by providing scholarships to deserving students.',
    description: '<p>The MMLF Scholarship Program is committed to breaking the cycle of poverty through education. We provide comprehensive financial support to bright students from disadvantaged backgrounds across South Sudan.</p><p>Our scholarships cover tuition fees, accommodation, books, and living allowances. We partner with universities in Uganda, Kenya, and South Sudan to ensure our scholars access quality education.</p>',
    details: { beneficiaries: '500+ students', countries: 'South Sudan, Uganda, Kenya', established: '2015' },
    images: [],
  },
  'childrens-home-project': {
    id: 2, slug: 'childrens-home-project', title: "Children's Home Project", icon: 'home',
    summary: 'Providing a safe, nurturing home for orphaned and vulnerable children in South Sudan.',
    description: '<p>The Children\'s Home Project was established to address the growing number of orphaned and abandoned children in South Sudan. Our home provides shelter, nutritious meals, education, healthcare, and emotional support.</p>',
    details: { capacity: '150 children', location: 'Juba, South Sudan', established: '2017' },
    images: [],
  },
  'healthcare-services': {
    id: 3, slug: 'healthcare-services', title: 'Healthcare Services (MML Hospital)', icon: 'hospital',
    summary: 'Delivering quality, affordable healthcare to underserved communities across South Sudan.',
    description: '<p>The Michael Makuei Lueth Hospital (MML Hospital) provides world-class medical services to communities that would otherwise have no access to quality healthcare.</p>',
    details: { capacity: '200 beds', location: 'Juba, South Sudan', patients: '10,000+ annually' },
    images: [],
  },
}

export default function ProgramDetailPage() {
  const { slug } = useParams()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProgram(slug)
      .then(res => setProgram(res.data.data))
      .catch(() => setProgram(DEMO[slug] || null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="pt-32"><LoadingSpinner /></div>
  if (!program) return (
    <div className="pt-32 text-center section-padding">
      <h1 className="section-title mb-4">Program Not Found</h1>
      <Link to="/programs" className="btn-primary">Back to Programs</Link>
    </div>
  )

  const icon = program.icon === 'graduation-cap' ? '🎓' : program.icon === 'home' ? '🏠' : '🏥'

  return (
    <>
      <SEOHead title={program.title} description={program.summary} />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Programs
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border border-white/20">
              {icon}
            </div>
            <div>
              <h1 className="font-display font-black text-4xl md:text-5xl text-white">{program.title}</h1>
              <p className="text-white/70 mt-2 text-lg max-w-2xl">{program.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Content */}
            <div className="lg:col-span-2">
              {program.featured_image && (
                <img src={program.featured_image} alt={program.title} className="w-full rounded-2xl mb-8 aspect-video object-cover shadow-md" />
              )}
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: program.description }}
              />
              {/* Gallery */}
              {program.images?.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display font-bold text-xl mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {program.images.map(img => (
                      <img key={img.id} src={img.image_path} alt={img.caption || program.title}
                        className="rounded-xl aspect-square object-cover hover:opacity-90 transition-opacity" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Program Details */}
              {program.details && Object.keys(program.details).length > 0 && (
                <div className="bg-primary-50 rounded-2xl p-6">
                  <h3 className="font-bold text-dark mb-4">Program Details</h3>
                  <dl className="space-y-3">
                    {Object.entries(program.details).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs uppercase tracking-wide text-gray-400 font-semibold">{k.replace(/_/g, ' ')}</dt>
                        <dd className="text-gray-800 font-medium mt-0.5">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Support This Program</h3>
                <p className="text-white/70 text-sm mb-4">Your donation directly funds this initiative and changes lives.</p>
                <Link to="/support" className="btn-secondary w-full justify-center text-sm">
                  <Heart size={14} className="fill-current" /> Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
