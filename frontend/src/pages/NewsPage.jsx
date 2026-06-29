import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/ui/SEOHead'
import { NewsCard } from '../components/ui/Cards'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getNews } from '../api/news'
import { Search } from 'lucide-react'

const CATEGORIES = ['All', 'Foundation News', 'Education', 'Healthcare', 'Community', 'Scholarships']

export default function NewsPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState(null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, per_page: 9 }
      if (search) params.search = search
      if (category !== 'All') params.category = category.toLowerCase().replace(/ /g, '-')
      const res = await getNews(params)
      setArticles(res.data.data)
      setMeta(res.data.meta)
    } catch {
      setArticles(DEMO_NEWS)
    } finally {
      setLoading(false)
    }
  }, [search, category, page])

  useEffect(() => { fetchNews() }, [fetchNews])

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchNews() }

  return (
    <>
      <SEOHead title="News & Updates" description="Stay informed with the latest news, updates, and publications from the Michael Makuei Lueth Foundation." />
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom text-center">
          <span className="text-secondary-400 font-bold text-sm uppercase tracking-widest">Stay Informed</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mt-4 mb-6">News &amp; Updates</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">The latest news, stories, and updates from MMLF programs and communities.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="news-search" type="text" placeholder="Search news..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
              </div>
              <button type="submit" className="btn-primary px-5 py-3 text-sm">Search</button>
            </form>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setCategory(cat); setPage(1) }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-primary-800 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {loading ? <LoadingSpinner /> : (
            <>
              {articles.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-xl mb-2">No articles found.</p>
                  <button onClick={() => { setSearch(''); setCategory('All') }} className="text-primary-700 font-medium hover:underline">Clear filters</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map(a => <NewsCard key={a.id} article={a} />)}
                </div>
              )}
              {meta && meta.last_page > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${p === page ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

const DEMO_NEWS = [
  { id: 1, slug: 'mmlf-launches-new-scholarship-cohort-2024', title: 'MMLF Launches New Scholarship Cohort for 2024', excerpt: 'The Foundation is proud to announce the selection of 50 new scholarship recipients.', is_featured: true, published_at: new Date().toISOString(), category: { name: 'Foundation News', slug: 'foundation-news' }, featured_image: null },
  { id: 2, slug: 'new-school-building-inaugurated-aweil', title: 'New School Building Inaugurated in Aweil', excerpt: 'A new state-of-the-art school building was officially inaugurated in Aweil.', published_at: new Date(Date.now() - 15*864e5).toISOString(), category: { name: 'Education', slug: 'education' }, featured_image: null },
  { id: 3, slug: 'annual-fundraising-gala-raises-500000', title: 'Annual Fundraising Gala Raises $500,000', excerpt: 'The MMLF Annual Gala 2024 raised over half a million dollars for community programs.', is_featured: true, published_at: new Date(Date.now() - 30*864e5).toISOString(), category: { name: 'Foundation News', slug: 'foundation-news' }, featured_image: null },
]
