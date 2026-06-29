import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/ui/SEOHead'
import { ProgramCard } from '../components/ui/Cards'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getPrograms } from '../api/programs'
import { ArrowRight } from 'lucide-react'

const DEMO_PROGRAMS = [
  { id: 1, slug: 'scholarship-program', title: 'Scholarship Program', summary: 'Empowering South Sudanese youth through education.', icon: 'graduation-cap', is_featured: true, featured_image: null },
  { id: 2, slug: 'childrens-home-project', title: "Children's Home Project", summary: 'Providing a safe, nurturing home for vulnerable children.', icon: 'home', is_featured: true, featured_image: null },
  { id: 3, slug: 'healthcare-services', title: 'Healthcare Services (MML Hospital)', summary: 'Delivering quality, affordable healthcare to communities.', icon: 'hospital', is_featured: true, featured_image: null },
]

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPrograms({ per_page: 20 })
      .then(res => setPrograms(res.data.data))
      .catch(() => setPrograms(DEMO_PROGRAMS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SEOHead
        title="Our Programs"
        description="Explore the MMLF's core programs: Scholarship Program, Children's Home Project, and Healthcare Services (MML Hospital)."
      />
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">What We Do</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">Our Programs</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Three pillars of impact designed to uplift education, child welfare, and healthcare in South Sudan.
          </p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? <LoadingSpinner /> : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map(p => <ProgramCard key={p.id} program={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
