var PHYSICIANS = {
  'dr-doug-shapiro': {
    title: 'Dr. Douglas Shapiro \u2022 AnswersMD',
    description: 'Dr. Douglas Shapiro founded AnswersMD to practice medicine the way it should be. Board certified family medicine in Tampa, FL.',
    image: 'https://dev.answersmd.com/team/dr-doug-shapiro.webp'
  },
  'dr-drew-meriwether': {
    title: 'Dr. Drew Meriwether \u2022 AnswersMD',
    description: 'Dr. Drew Meriwether brings dual board certifications in Pediatrics and Internal Medicine to AnswersMD in Tampa, FL. USF Health Clinician of the Year.',
    image: 'https://dev.answersmd.com/team/dr-drew-meriwether.webp'
  },
  'dr-divino-dalessio': {
    title: "Dr. Divino D'Alessio \u2022 AnswersMD",
    description: "Dr. Divino D'Alessio Jr. brings board certified Family and Sports Medicine to AnswersMD in Boca Raton, FL. Former NCAA Division I team physician.",
    image: 'https://dev.answersmd.com/team/dr-divino-dalessio.webp'
  },
  'dr-ellen-howard': {
    title: 'Dr. Ellen Howard \u2022 AnswersMD',
    description: 'Dr. Ellen Howard brings board certified family medicine and a preventive approach to AnswersMD in St. Petersburg, FL. Hormone therapy, GLP-1 and lifestyle medicine.',
    image: 'https://dev.answersmd.com/team/dr-ellen-howard.webp'
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

  html = html.replace(
    /<title>[^<]*<\/title>/,
    '<title>' + doc.title + '</title>'
  );

  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?\s*>/,
    '<meta name="description" content="' + doc.description + '" />'
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?\s*>/,
    '<meta property="og:title" content="' + doc.title + '" />'
  );

  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?\s*>/,
    '<meta property="og:description" content="' + doc.description + '" />'
  );

  html = html.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?\s*>/,
    '<meta property="og:image" content="' + doc.image + '" />'
  );

  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?\s*>/,
    '<meta property="og:url" content="' + url.href + '" />'
  );

  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/,
    '<meta name="twitter:title" content="' + doc.title + '" />'
  );

  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/,
    '<meta name="twitter:description" content="' + doc.description + '" />'
  );

  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?\s*>/,
    '<meta name="twitter:image" content="' + doc.image + '" />'
  );

  return new Response(html, {
    headers: response.headers,
    status: response.status
  });
}
