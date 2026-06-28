// scripts/generate-meta-html.js
// Post-build: stamp a static HTML file per route with correct head meta
// so SMS and social scrapers see per-page title/description/og:image.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
 
var __dirname = dirname(fileURLToPath(import.meta.url));
var DIST = join(__dirname, '..', 'dist');
var SITE_URL = 'https://answersmd.com';
 
var ROUTES = {
  '/': { title: 'Concierge Medicine Made Simple \u00b7 AnswersMD\u2122', description: 'Direct access to your physician whenever you need it. Personalized, accessible and designed around your life. Tampa, St. Petersburg and Boca Raton.', image: SITE_URL + '/social/home.png' },
  '/services/': { title: 'Our Services \u00b7 AnswersMD\u2122', description: 'Same-day visits, 24/7 direct physician access, house calls and unhurried care. See everything an AnswersMD membership includes.', image: SITE_URL + '/social/services.png' },
  '/team/': { title: 'Meet Your Care Team \u00b7 AnswersMD\u2122', description: 'Board-certified physicians who know you by name. Meet the doctors and staff behind AnswersMD concierge medicine.', image: SITE_URL + '/social/team.png' },
  '/new-patients/': { title: 'What to Expect \u00b7 AnswersMD\u2122', description: 'Joining AnswersMD is simple. Here is what your first visit, onboarding and ongoing care look like as a member.', image: SITE_URL + '/social/new-patients.png' },
  '/executive/': { title: 'Executive Health \u00b7 AnswersMD\u2122', description: 'Comprehensive executive health programs built around demanding schedules. Proactive, discreet and tailored to leaders and their teams.', image: SITE_URL + '/social/executive.png' },
  '/pricing/': { title: 'Membership and Pricing \u00b7 AnswersMD\u2122', description: 'Simple, transparent membership. No copays, no claims to chase. See AnswersMD concierge medicine pricing.', image: SITE_URL + '/social/home.png' },
  '/insurance/': { title: 'Insurance and Membership \u00b7 AnswersMD\u2122', description: 'How AnswersMD works alongside your insurance. Membership-based concierge care with no surprise bills.', image: SITE_URL + '/social/home.png' },
  '/faq/': { title: 'Frequently Asked Questions \u00b7 AnswersMD\u2122', description: 'Answers to common questions about AnswersMD concierge medicine, membership, appointments and house calls.', image: SITE_URL + '/social/home.png' },
  '/stories/': { title: 'Patient Stories \u00b7 AnswersMD\u2122', description: 'Real experiences from AnswersMD members. See what concierge medicine feels like when your doctor truly knows you.', image: SITE_URL + '/social/home.png' },
  '/contact/': { title: 'Contact Us \u00b7 AnswersMD\u2122', description: 'Get in touch with AnswersMD. Schedule a consultation or ask about concierge membership in Tampa, St. Petersburg and Boca Raton.', image: SITE_URL + '/social/contact.png' },
  '/locations/': { title: 'Our Locations \u00b7 AnswersMD\u2122', description: 'AnswersMD concierge medicine across Florida. Tampa, St. Petersburg and Boca Raton, with care that comes to you.', image: SITE_URL + '/social/home.png' },
  '/location-tampa/': { title: 'Tampa \u00b7 AnswersMD\u2122', description: 'AnswersMD Tampa. Flagship concierge medicine with 24/7 physician access at 4100 W Kennedy Blvd, Tampa, Florida.', image: SITE_URL + '/social/home.png' },
  '/location-st-pete/': { title: 'St. Petersburg \u00b7 AnswersMD\u2122', description: 'AnswersMD St. Petersburg. Concierge medicine by appointment across St. Pete with 24/7 direct physician access.', image: SITE_URL + '/social/home.png' },
  '/location-boca-raton/': { title: 'Boca Raton \u00b7 AnswersMD\u2122', description: 'AnswersMD Boca Raton. Concierge medicine coming soon to South Florida and Palm Beach County. Join our waitlist.', image: SITE_URL + '/social/home.png' }
};
 
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
 
function applyMeta(html, route, meta) {
  var url = SITE_URL + route;
  var t = esc(meta.title);
  var d = esc(meta.description);
  var img = esc(meta.image);
 
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + t + '</title>');
  html = html.replace(/(<meta name="title" content=")[^"]*(")/, '$1' + t + '$2');
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, '$1' + d + '$2');
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, '$1' + url + '$2');
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, '$1' + url + '$2');
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, '$1' + t + '$2');
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, '$1' + d + '$2');
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, '$1' + img + '$2');
  html = html.replace(/(<meta name="twitter:url" content=")[^"]*(")/, '$1' + url + '$2');
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, '$1' + t + '$2');
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, '$1' + d + '$2');
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/, '$1' + img + '$2');
  return html;
}
 
var base = readFileSync(join(DIST, 'index.html'), 'utf8');
var count = 0;
 
Object.keys(ROUTES).forEach(function (route) {
  if (route === '/') {
    writeFileSync(join(DIST, 'index.html'), applyMeta(base, route, ROUTES[route]));
    count++;
    return;
  }
  var dir = join(DIST, route);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(join(dir, 'index.html'), applyMeta(base, route, ROUTES[route]));
  count++;
  console.log('  -> dist' + route + 'index.html');
});
 
console.log('Generated meta HTML for ' + count + ' routes.');
 
var redirects = '/*    /index.html    200\n';
writeFileSync(join(DIST, '_redirects'), redirects);
console.log('Wrote dist/_redirects (SPA fallback).');
