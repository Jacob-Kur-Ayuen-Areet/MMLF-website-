import { useEffect, useRef, useState } from 'react'

function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const startTime = useRef(null)

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [end, duration])

  return count
}

function StatCard({ value, suffix = '+', label, icon, delay = 0 }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const count = useCounter(visible ? value : 0, 2000)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="font-display font-black text-5xl text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/70 font-medium">{label}</div>
    </div>
  )
}

export default function ImpactCounters({ stats }) {
  return (
    <section className="py-20 hero-gradient">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title text-white mb-4">Our Impact in Numbers</h2>
          <p className="section-subtitle text-white/70 max-w-2xl mx-auto">
            Every number represents a life transformed, a future secured, a community uplifted.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}
