var PHYSICIANS = {
  'dr-doug-shapiro': {
    title: 'Dr. Douglas Shapiro \u2022 AnswersMD',
    description: 'Dr. Douglas Shapiro founded AnswersMD to practice medicine the way it should be. Board certified family medicine in Tampa, FL.',
    image: 'https://dev.answersmd.com/social/team.png'
  },
  'dr-drew-meriwether': {
    title: 'Dr. Drew Meriwether \u2022 AnswersMD',
    description: 'Dr. Drew Meriwether brings dual board certifications in Pediatrics and Internal Medicine to AnswersMD in Tampa, FL.',
    image: 'https://dev.answersmd.com/social/team.png'
  },
  'dr-divino-dalessio': {
    title: "Dr. Divino D\'Alessio \u2022 AnswersMD",
    description: "Dr. Divino D\'Alessio Jr. brings board certified Family and Sports Medicine to AnswersMD in Boca Raton, FL.",
    image: 'https://dev.answersmd.com/social/team.png'
  },
  'dr-ellen-howard': {
    title: 'Dr. Ellen Howard \u2022 AnswersMD',
    description: 'Dr. Ellen Howard brings board certified family medicine and a preventive approach to AnswersMD in St. Petersburg, FL.',
    image: 'https://dev.answersmd.com/social/team.png'
  }
};

export default async function handler(request, context) {
  var url = new URL(request.url);
  var path = url.pathname.replace(/\/$/, '');
  var parts = path.split('/');
  var slug = parts[parts.length - 1];

  var doc = PHYSICIANS[slug];
  if (!doc) return context.next();

  var response = await context.next();
  var html = await response.text();

  var metaTags = '<title>' + doc.title + '</title>\n'
    + '    <meta name="description" content="' + doc.description + '" />\n'
    + '    <meta property="og:title" content="' + doc.title + '" />\n'
    + '    <meta property="og:description" content="' + doc.description + '" />\n'
    + '    <meta property="og:image" content="' + doc.image + '" />\n'
    + '    <meta property="og:image:width" content="1200" />\n'
    + '    <meta property="og:image:height" content="630" />\n'
    + '    <meta property="og:image:type" content="image/png" />\n'
    + '    <meta property="og:type" content="profile" />\n'
    + '    <meta property="og:url" content="' + url.href + '" />\n'
    + '    <meta name="twitter:card" content="summary_large_image" />\n'
    + '    <meta name="twitter:title" content="' + doc.title + '" />\n'
    + '    <meta name="twitter:description" content="' + doc.description + '" />\n'
    + '    <meta name="twitter:image" content="' + doc.image + '" />';

  // Replace everything between <head> tags that we need to override
  html = html.replace(/<title>[^<]*<\/title>/, '');
  html = html.replace(/<meta name="title"[^>]*\/?>/, '');
  html = html.replace(/<meta name="description"[^>]*\/?>/, '');
  html = html.replace(/<meta property="og:type"[^>]*\/?>/, '');
  html = html.replace(/<meta property="og:url"[^>]*\/?>/, '');
  html = html.replace(/<meta property="og:title"[^>]*\/?>/, '');
  html = html.replace(/<meta property="og:description"[^>]*\/?>/, '');
  html = html.replace(/<meta property="og:image"[^>]*\/?>\n?/g, '');
  html = html.replace(/<meta property="og:image:width"[^>]*\/?>/, '');
  html = html.replace(/<meta property="og:image:height"[^>]*\/?>/, '');
  html = html.replace(/<meta property="og:image:alt"[^>]*\/?>/, '');
  html = html.replace(/<meta name="twitter:card"[^>]*\/?>/, '');
  html = html.replace(/<meta name="twitter:url"[^>]*\/?>/, '');
  html = html.replace(/<meta name="twitter:title"[^>]*\/?>/, '');
  html = html.replace(/<meta name="twitter:description"[^>]*\/?>/, '');
  html = html.replace(/<meta name="twitter:image"[^>]*\/?>/, '');

  // Insert our meta tags after the charset meta
  html = html.replace(
    '<meta charset="UTF-8" />',
    '<meta charset="UTF-8" />\n    ' + metaTags
  );

  return new Response(html, {
    headers: response.headers,
    status: response.status
  });
}
