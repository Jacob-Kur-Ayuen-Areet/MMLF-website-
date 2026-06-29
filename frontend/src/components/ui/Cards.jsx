import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

export function ProgramCard({ program }) {
  return (
    <Link to={`/programs/${program.slug}`} className="card group flex flex-col h-full">
      <div className="relative overflow-hidden h-52">
        {program.featured_image ? (
          <img
            src={program.featured_image}
            alt={program.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center">
            <span className="text-6xl">{program.icon === 'graduation-cap' ? '🎓' : program.icon === 'home' ? '🏠' : '🏥'}</span>
          </div>
        )}
        {program.is_featured && (
          <span className="absolute top-3 left-3 bg-secondary-600 text-dark text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl text-dark mb-3 group-hover:text-primary-800 transition-colors">
          {program.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{program.summary}</p>
        <div className="flex items-center gap-2 text-primary-700 font-semibold text-sm mt-5 group-hover:gap-3 transition-all">
          Learn More <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}

export function NewsCard({ article }) {
  return (
    <Link to={`/news/${article.slug}`} className="card group flex flex-col h-full">
      <div className="relative overflow-hidden h-48">
        {article.featured_image ? (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}
        {article.is_featured && (
          <span className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          {article.category && (
            <span className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">
              <Tag size={10} /> {article.category.name}
            </span>
          )}
          {article.published_at && (
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold text-gray-900 text-base leading-tight mb-2 group-hover:text-primary-800 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center gap-2 text-primary-700 font-semibold text-sm mt-4 group-hover:gap-3 transition-all">
          Read More <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  )
}

export function ReportCard({ report }) {
  return (
    <div className="card group p-6 flex items-center gap-5">
      <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
        <span className="text-2xl">📊</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-secondary-700 font-bold mb-1">{report.report_year}</div>
        <h3 className="font-semibold text-dark truncate group-hover:text-primary-800 transition-colors">{report.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{report.description}</p>
      </div>
      <a
        href={report.file_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="shrink-0 btn-outline text-xs py-2 px-4"
      >
        Download PDF
      </a>
    </div>
  )
}
