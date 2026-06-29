import { Helmet } from 'react-helmet-async'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Michael Makuei Lueth Foundation'

export default function SEOHead({
  title,
  description = 'The Michael Makuei Lueth Foundation promotes education, healthcare, and community development in South Sudan.',
  image = '/og-image.jpg',
  url,
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={APP_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NonprofitOrganization",
          "name": APP_NAME,
          "description": "A South Sudan-based non-profit promoting education, healthcare, and community development.",
          "url": "https://mmlf.org",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Juba",
            "addressCountry": "SS"
          }
        })}
      </script>
    </Helmet>
  )
}
