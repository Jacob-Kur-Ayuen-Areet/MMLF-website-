import SEOHead from '../components/ui/SEOHead'

const timeline = [
  { year: '1990', event: 'Began legal career and advocacy work for South Sudanese communities', type: 'career' },
  { year: '2005', event: 'Played a key role in the Comprehensive Peace Agreement negotiations', type: 'milestone' },
  { year: '2011', event: 'Contributed to South Sudan\'s historic independence process', type: 'milestone' },
  { year: '2015', event: 'Founded the Michael Makuei Lueth Foundation', type: 'foundation' },
  { year: '2017', event: 'Launched the Children\'s Home Project, providing shelter to 150+ children', type: 'program' },
  { year: '2020', event: 'MML Hospital opened its doors, serving thousands of patients annually', type: 'program' },
  { year: '2022', event: 'Scholarship program reached 400+ beneficiaries across East Africa', type: 'achievement' },
  { year: '2023', event: 'Foundation reaches 500+ scholarship recipients and 10,000+ patients served', type: 'achievement' },
]

const typeColors = {
  career: 'bg-blue-100 text-blue-800 border-blue-200',
  milestone: 'bg-purple-100 text-purple-800 border-purple-200',
  foundation: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  program: 'bg-primary-100 text-primary-800 border-primary-200',
  achievement: 'bg-green-100 text-green-800 border-green-200',
}

const dotColors = {
  career: 'bg-blue-500',
  milestone: 'bg-purple-500',
  foundation: 'bg-secondary-600',
  program: 'bg-primary-700',
  achievement: 'bg-green-600',
}

export default function LegacyPage() {
  return (
    <>
      <SEOHead
        title="Safeguarding a Legacy"
        description="The remarkable journey of Michael Makuei Lueth — from legal advocate to founder of South Sudan's leading community development foundation."
      />

      {/* Hero */}
      <section className="pt-32 pb-24 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">A Life of Service</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">Safeguarding a Legacy</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The extraordinary journey of Michael Makuei Lueth — statesman, advocate, and champion of South Sudanese communities.
          </p>
        </div>
      </section>

      {/* Biography */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">The Founder</span>
              <h2 className="section-title mt-3 mb-6">Michael Makuei Lueth</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Michael Makuei Lueth is a distinguished South Sudanese statesman, lawyer, and tireless advocate for education and community development. 
                Born in South Sudan, he dedicated his life to serving his people and building a better future for the nation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                His career spans decades of public service, legal practice, and political engagement, culminating in his role as a key figure in South Sudan's peace process and nation-building efforts.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                In 2015, driven by a deep commitment to leaving a lasting legacy, he founded the Michael Makuei Lueth Foundation to address the most pressing development challenges facing South Sudanese communities.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Years of Service', value: '30+' },
                  { label: 'Lives Impacted', value: '10K+' },
                  { label: 'Programs Launched', value: '3' },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-4 bg-primary-50 rounded-xl">
                    <div className="font-display font-black text-3xl text-primary-800">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden relative">
                <img src="/michael-makuei-lueth.jpg" alt="Michael Makuei Lueth" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-16">
                  <p className="font-display font-bold text-2xl text-white">Michael Makuei Lueth</p>
                  <p className="text-secondary-400 text-sm mt-1 font-semibold">Founder & Chairman</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-secondary-500 text-dark font-bold rounded-2xl px-5 py-3 shadow-xl text-sm">
                🌍 Est. 2015
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-secondary-600 font-bold text-sm uppercase tracking-widest">A Life's Journey</span>
            <h2 className="section-title mt-3 mb-4">Historical Milestones</h2>
            <p className="section-subtitle max-w-2xl mx-auto">Key moments that shaped the foundation and its impact on South Sudan.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-800 to-secondary-500 hidden sm:block" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className={`w-12 h-12 rounded-full ${dotColors[item.type]} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform z-10 relative`}>
                      <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-display font-bold text-2xl text-dark">{item.year}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[item.type]}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom text-center max-w-3xl">
          <div className="text-secondary-400 text-6xl font-serif leading-none mb-6">"</div>
          <blockquote className="font-display text-2xl md:text-3xl text-white font-medium leading-relaxed italic mb-8">
            Education is the most powerful weapon we can use to change the world. 
            Every child in South Sudan deserves the chance to learn, grow, and build our nation's future.
          </blockquote>
          <cite className="text-white/60 font-medium">— Michael Makuei Lueth, Founder</cite>
        </div>
      </section>
    </>
  )
}
