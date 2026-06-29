import SEOHead from '../components/ui/SEOHead'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

const values = [
  { name: 'Integrity', desc: 'We uphold the highest standards of honesty and accountability in everything we do.', icon: '⚖️' },
  { name: 'Compassion', desc: 'We lead with empathy and genuine care for every community and individual we serve.', icon: '❤️' },
  { name: 'Excellence', desc: 'We strive for the highest quality in our programs and impact delivery.', icon: '⭐' },
  { name: 'Transparency', desc: 'We publish our financials and impact reports openly for all stakeholders.', icon: '🔍' },
  { name: 'Community', desc: 'We believe in the power of community and work collaboratively toward shared goals.', icon: '🤝' },
  { name: 'Sustainability', desc: 'We design programs that create lasting, self-sustaining impact for generations.', icon: '🌱' },
]

const team = [
  { name: 'Michael Makuei Lueth', role: 'Founder & Chairman', bio: 'A distinguished South Sudanese statesman, lawyer, and champion for education and community development with decades of public service.', initials: 'ML', image: '/michael-makuei-lueth.jpg' },
  { name: 'Dr. Areet Ayuen', role: 'Executive Director', bio: 'PhD in International Development with 15 years of experience leading non-profit organizations across East Africa.', initials: 'AA', image: '/dr-areet-ayuen.jpg' },
  { name: 'Khang Mayol', role: 'Programs Director', bio: 'Former UNICEF education specialist with extensive experience in scholarship management and community outreach.', initials: 'KM', image: '/khang-mayol.jpg' },
  { name: 'Mayol Awan', role: 'Healthcare Director', bio: 'Medical doctor and public health specialist overseeing the MML Hospital and community health outreach programs.', initials: 'MA', image: '/mayol-awan.jpg' },
]

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about the Michael Makuei Lueth Foundation — our mission, vision, core values, and the leadership team driving change in South Sudan."
      />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">Our Story</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">
            About the Foundation
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            A South Sudan-based non-profit organization dedicated to promoting education, 
            healthcare, and community development since 2015.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">Who We Are</span>
              <h2 className="section-title mt-3 mb-6">Foundation Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Michael Makuei Lueth Foundation (MMLF) was established to address the critical development 
                challenges facing South Sudan — a young nation with immense potential but significant needs.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Through strategic partnerships with governments, international organizations, and diaspora 
                communities, we have built a comprehensive ecosystem of support for South Sudanese citizens.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our programs are designed to be sustainable, community-driven, and aligned with South Sudan's 
                national development agenda.
              </p>
              <ul className="space-y-3">
                {['Registered non-profit organization', 'Operating since 2015', 'Serving 25+ communities', 'Transparent financial reporting'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={18} className="text-primary-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl p-10 border border-gray-100">
              {/* Mission */}
              <div className="mb-8">
                <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white text-lg">🎯</span>
                </div>
                <h3 className="font-display font-bold text-xl text-dark mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower South Sudanese communities through sustainable education, quality healthcare, 
                  and transformative community development programs that create lasting change.
                </p>
              </div>
              {/* Vision */}
              <div className="border-t border-gray-100 pt-8">
                <div className="w-10 h-10 bg-secondary-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-dark text-lg">🌟</span>
                </div>
                <h3 className="font-display font-bold text-xl text-dark mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A prosperous, educated, and healthy South Sudan where every citizen can achieve their 
                  full potential and contribute to national development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">What Guides Us</span>
            <h2 className="section-title mt-3 mb-4">Our Core Values</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              These principles are the foundation of every decision we make and every program we run.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val) => (
              <div key={val.name} className="card p-6 text-center hover:border-primary-200">
                <span className="text-4xl block mb-4">{val.icon}</span>
                <h3 className="font-display font-bold text-lg text-dark mb-2">{val.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="leadership" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">The People Behind MMLF</span>
            <h2 className="section-title mt-3 mb-4">Leadership Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    member.initials
                  )}
                </div>
                <h3 className="font-display font-bold text-dark text-base">{member.name}</h3>
                <p className="text-secondary-700 text-sm font-semibold mt-1 mb-3">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-900 text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="font-display font-bold text-4xl text-white mb-4">Join Our Mission</h2>
          <p className="text-white/70 text-lg mb-8">Partner with us to build a better South Sudan for future generations.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/support" className="btn-secondary">Donate Now</Link>
            <Link to="/contact" className="btn-ghost">Contact Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
