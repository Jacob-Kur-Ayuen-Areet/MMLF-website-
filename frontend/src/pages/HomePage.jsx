import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Play, ChevronDown } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import ImpactCounters from '../components/ui/ImpactCounters'
import { ProgramCard, NewsCard } from '../components/ui/Cards'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getPrograms } from '../api/programs'
import { getNews } from '../api/news'

const stats = [
  { value: 500, suffix: '+', label: 'Students Supported', icon: '🎓' },
  { value: 150, suffix: '+', label: 'Children in Home', icon: '🏠' },
  { value: 10000, suffix: '+', label: 'Patients Served', icon: '🏥' },
  { value: 25, suffix: '+', label: 'Communities Reached', icon: '🌍' },
]

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    title: "Empowering",
    highlight: "Communities,",
    subtitle: "Transforming Lives",
    description: "The Michael Makuei Lueth Foundation is dedicated to uplifting South Sudanese communities through education, healthcare, and sustainable development programs.",
    badge: "Transforming Lives in South Sudan"
  },
  {
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    title: "Education",
    highlight: "For All,",
    subtitle: "Scholarships for the Future",
    description: "Providing opportunities for the youth of South Sudan to achieve their dreams through higher education and training programs.",
    badge: "Building the Next Generation"
  },
  {
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2070&auto=format&fit=crop",
    title: "Quality",
    highlight: "Healthcare,",
    subtitle: "Saving Lives Every Day",
    description: "Delivering essential medical services and building sustainable healthcare infrastructure for our communities.",
    badge: "Health is Wealth"
  }
];

const extendedSlides = [...heroSlides, heroSlides[0]];

export default function HomePage() {
  const [programs, setPrograms] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, newsRes] = await Promise.all([
          getPrograms({ featured: 1, per_page: 3 }),
          getNews({ per_page: 3 }),
        ])
        setPrograms(programsRes.data.data || [])
        setNews(newsRes.data.data || [])
      } catch {
        // Use fallback demo data if API is unavailable
        setPrograms(DEMO_PROGRAMS)
        setNews(DEMO_NEWS)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentSlide === heroSlides.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  return (
    <>
      <SEOHead
        description="The Michael Makuei Lueth Foundation empowers South Sudanese communities through education, healthcare, and development. Support our mission today."
      />

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Slider Backgrounds & Content */}
        <div 
          className={`absolute inset-0 flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative flex items-center"
            >
              <div className="absolute inset-0 bg-black/50 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              
              {/* Content for this slide */}
              <div className="container-custom relative z-20 pt-24 pb-16 w-full">
                <div className="max-w-4xl flex flex-col">


                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-secondary-300 font-medium mb-8 w-max">
                    <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
                    {slide.badge}
                  </div>

                  {/* Text Column */}
                  <div className="flex flex-col gap-6 mb-10">
                    <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-white leading-tight text-shadow">
                      {slide.title}
                      <span className="block text-secondary-400">{slide.highlight}</span>
                      {slide.subtitle}
                    </h1>

                    <p className="text-xl text-white/90 leading-relaxed max-w-2xl font-medium">
                      {slide.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/support" id={`hero-donate-btn-${index}`} className="btn-secondary text-base py-4 px-8">
                      <Heart size={18} className="fill-current" /> Donate Today
                    </Link>
                    <Link to="/programs" id={`hero-programs-btn-${index}`} className="btn-ghost text-base py-4 px-8">
                      <Play size={18} /> Our Programs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Animated background dots */}
        <div className="absolute inset-0 opacity-10 z-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>



        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-2 animate-bounce z-20 pointer-events-none">
          <span className="text-xs tracking-widest uppercase font-bold">Scroll</span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ─── Mission Statement ─── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">Our Mission</span>
              <h2 className="section-title mt-3 mb-6">
                Building a <span className="gradient-text">Brighter Future</span> for South Sudan
              </h2>
              <p className="section-subtitle mb-6">
                To empower South Sudanese communities through sustainable education, quality healthcare,
                and transformative community development programs that create lasting change.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Founded by Michael Makuei Lueth, our organization has been at the forefront of South Sudan's
                development journey, touching thousands of lives through scholarships, children's care, and medical services.
              </p>
              <div className="flex gap-4">
                <Link to="/about" className="btn-primary">
                  About Us <ArrowRight size={16} />
                </Link>
                <Link to="/legacy" className="btn-outline">
                  Our Legacy
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* Large logo display */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-60" />
                  <div className="relative w-40 h-40 bg-white rounded-full p-3 shadow-2xl overflow-hidden mx-auto border-4 border-primary-100">
                    <img
                      src="/logo.png"
                      alt="MMLF Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { emoji: '🎓', title: 'Education', desc: '500+ scholarship recipients' },
                    { emoji: '🏠', title: 'Children', desc: '150+ children in safe homes' },
                    { emoji: '🏥', title: 'Healthcare', desc: '10,000+ patients annually' },
                    { emoji: '🤝', title: 'Community', desc: '25+ communities reached' },
                  ].map((item) => (
                    <div key={item.title} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-3xl block mb-2">{item.emoji}</span>
                      <h4 className="font-bold text-dark text-sm">{item.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-4 -right-4 bg-secondary-500 text-dark font-bold rounded-2xl px-5 py-3 shadow-xl text-sm">
                🌍 Est. 2015
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Programs ─── */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="section-title mt-3 mb-4">Our Core Programs</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Three pillars of impact designed to uplift every dimension of community life.
            </p>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.length > 0 ? (
                programs.map((p) => <ProgramCard key={p.id} program={p} />)
              ) : (
                DEMO_PROGRAMS.map((p) => <ProgramCard key={p.id} program={p} />)
              )}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/programs" className="btn-primary">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <ImpactCounters stats={stats} />

      {/* ─── Latest News ─── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-4">
            <div>
              <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">Stay Informed</span>
              <h2 className="section-title mt-2">Latest News &amp; Updates</h2>
            </div>
            <Link to="/news" className="btn-outline shrink-0">
              All News <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.length > 0 ? (
                news.map((a) => <NewsCard key={a.id} article={a} />)
              ) : (
                DEMO_NEWS.map((a) => <NewsCard key={a.id} article={a} />)
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── Donation CTA ─── */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-dark">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">Make a Difference</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mt-3 mb-6">
              Your Donation Changes Lives
            </h2>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Every contribution, no matter how small, helps us provide scholarships, support children,
              and deliver healthcare to those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/support" id="cta-donate-btn" className="btn-secondary text-base py-4 px-10">
                <Heart size={18} className="fill-current" /> Donate Now
              </Link>
              <Link to="/about" className="btn-ghost text-base py-4 px-10">
                Learn More
              </Link>
            </div>
            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-14 text-white/50 text-sm">
              <div className="flex items-center gap-2">🔒 Secure & Encrypted Donations</div>
              <div className="flex items-center gap-2">📊 Full Financial Transparency</div>
              <div className="flex items-center gap-2">✅ Registered Non-Profit</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Demo/fallback data ──
const DEMO_PROGRAMS = [
  { id: 1, slug: 'scholarship-program', title: 'Scholarship Program', summary: 'Empowering South Sudanese youth through education by providing scholarships to deserving students across the nation.', icon: 'graduation-cap', is_featured: true, featured_image: null },
  { id: 2, slug: 'childrens-home-project', title: "Children's Home Project", summary: 'Providing a safe, nurturing home for orphaned and vulnerable children in South Sudan.', icon: 'home', is_featured: true, featured_image: null },
  { id: 3, slug: 'healthcare-services', title: 'Healthcare Services (MML Hospital)', summary: 'Delivering quality, affordable healthcare to underserved communities across South Sudan.', icon: 'hospital', is_featured: true, featured_image: null },
]
const DEMO_NEWS = [
  { id: 1, slug: 'mmlf-launches-new-scholarship-cohort-2024', title: 'MMLF Launches New Scholarship Cohort for 2024', excerpt: 'The Foundation is proud to announce the selection of 50 new scholarship recipients for the 2024 academic year.', is_featured: true, published_at: new Date().toISOString(), category: { name: 'Foundation News', slug: 'foundation-news' }, featured_image: null },
  { id: 2, slug: 'new-school-building-inaugurated-aweil', title: 'New School Building Inaugurated in Aweil', excerpt: 'A new state-of-the-art school building was officially inaugurated in Aweil, serving over 800 students.', published_at: new Date(Date.now() - 15 * 864e5).toISOString(), category: { name: 'Education', slug: 'education' }, featured_image: null },
  { id: 3, slug: 'annual-fundraising-gala-raises-500000', title: 'Annual Fundraising Gala Raises $500,000', excerpt: 'The MMLF Annual Gala 2024 was a tremendous success, raising over half a million dollars for community programs.', is_featured: true, published_at: new Date(Date.now() - 30 * 864e5).toISOString(), category: { name: 'Foundation News', slug: 'foundation-news' }, featured_image: null },
]
