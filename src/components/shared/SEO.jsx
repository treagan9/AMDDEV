// src/components/shared/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { ROUTES, SITE_URL, DEFAULT_OG } from '../../config/siteMeta';
 
function SEO({ route }) {
  var meta = ROUTES[route] || ROUTES['/'];
  var url = SITE_URL + route;
  var image = meta.image || DEFAULT_OG;
 
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
 
export default SEO;
