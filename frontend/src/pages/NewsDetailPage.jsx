import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/ui/SEOHead'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getNewsArticle } from '../api/news'
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNewsArticle(slug)
      .then(res => setArticle(res.data.data))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="pt-32"><LoadingSpinner /></div>
  if (!article) return (
    <div className="pt-32 section-padding text-center">
      <div className="text-6xl mb-4">📰</div>
      <h1 className="section-title mb-4">Article Not Found</h1>
      <Link to="/news" className="btn-primary">Back to News</Link>
    </div>
  )

  return (
    <>
      <SEOHead title={article.title} description={article.excerpt} image={article.featured_image} type="article" />
      <article>
        {/* Hero */}
        <section className="pt-32 pb-0 hero-gradient">
          <div className="container-custom max-w-4xl pb-16">
            <Link to="/news" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors text-sm">
              <ArrowLeft size={14} /> Back to News
            </Link>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {article.category && (
                <span className="bg-secondary-500 text-dark px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Tag size={10} /> {article.category.name}
                </span>
              )}
              {article.published_at && (
                <span className="text-white/60 text-sm flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
              {article.author?.name && (
                <span className="text-white/60 text-sm flex items-center gap-1">
                  <User size={12} /> {article.author.name}
                </span>
              )}
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">{article.title}</h1>
            {article.excerpt && <p className="text-xl text-white/70 mt-4 leading-relaxed">{article.excerpt}</p>}
          </div>
        </section>

        {/* Featured Image */}
        {article.featured_image && (
          <div className="container-custom max-w-4xl -mt-8">
            <img src={article.featured_image} alt={article.title} className="w-full rounded-2xl shadow-2xl aspect-video object-cover" />
          </div>
        )}

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                prose-headings:font-display prose-headings:text-dark
                prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Full article content coming soon.</p>' }}
            />
            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link to="/news" className="btn-outline">
                <ArrowLeft size={16} /> Back to News
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
