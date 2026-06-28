// scripts/generate-meta-html.js
// Post-build: stamp a static HTML file per route with correct head meta
// so SMS and social scrapers see per-page title/description/og:image.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
 
var __dirname = dirname(fileURLToPath(import.meta.url));
var DIST = join(__dirname, '..', 'dist');
var SITE_URL = 'https://answersmd.com';
var DEFAULT_OG = SITE_URL + '/answersmd-sms-1200x630.png';
 
var ROUTES = {
  '/': { title: 'Concierge Medicine Made Simple \u00b7 AnswersMD\u2122', description: 'Direct access to your physician whenever you need it. Personalized, accessible and designed around your life. Tampa, St. Petersburg and Boca Raton.', image: DEFAULT_OG },
  '/services/': { title: 'Our Services \u00b7 AnswersMD\u2122', description: 'Same-day visits, 24/7 direct physician access, house calls and unhurried care. See everything an AnswersMD membership includes.', image: DEFAULT_OG },
  '/team/': { title: 'Meet Your Care Team \u00b7 AnswersMD\u2122', description: 'Board-certified physicians who know you by name. Meet the doctors and staff behind AnswersMD concierge medicine.', image: DEFAULT_OG },
  '/new-patients/': { title: 'What to Expect \u00b7 AnswersMD\u2122', description: 'Joining AnswersMD is simple. Here is what your first visit, onboarding and ongoing care look like as a member.', image: DEFAULT_OG },
  '/executive/': { title: 'Executive Health \u00b7 AnswersMD\u2122', description: 'Comprehensive executive health programs built around demanding schedules. Proactive, discreet and tailored to leaders and their teams.', image: DEFAULT_OG },
  '/pricing/': { title: 'Membership and Pricing \u00b7 AnswersMD\u2122', description: 'Simple, transparent membership. No copays, no claims to chase. See AnswersMD concierge medicine pricing.', image: DEFAULT_OG },
  '/insurance/': { title: 'Insurance and Membership \u00b7 AnswersMD\u2122', description: 'How AnswersMD works alongside your insurance. Membership-based concierge care with no surprise bills.', image: DEFAULT_OG },
  '/faq/': { title: 'Frequently Asked Questions \u00b7 AnswersMD\u2122', description: 'Answers to common questions about AnswersMD concierge medicine, membership, appointments and house calls.', image: DEFAULT_OG },
  '/stories/': { title: 'Patient Stories \u00b7 AnswersMD\u2122', description: 'Real experiences from AnswersMD members. See what concierge medicine feels like when your doctor truly knows you.', image: DEFAULT_OG },
  '/contact/': { title: 'Contact Us \u00b7 AnswersMD\u2122', description: 'Get in touch with AnswersMD. Schedule a consultation or ask about concierge membership in Tampa, St. Petersburg and Boca Raton.', image: DEFAULT_OG },
  '/locations/': { title: 'Our Locations \u00b7 AnswersMD\u2122', description: 'AnswersMD concierge medicine across Florida. Tampa, St. Petersburg and Boca Raton, with care that comes to you.', image: DEFAULT_OG },
  '/location-tampa/': { title: 'Tampa \u00b7 AnswersMD\u2122', description: 'AnswersMD Tampa. Flagship concierge medicine with 24/7 physician access at 4100 W Kennedy Blvd, Tampa, Florida.', image: DEFAULT_OG },
  '/location-st-pete/': { title: 'St. Petersburg \u00b7 AnswersMD\u2122', description: 'AnswersMD St. Petersburg. Concierge medicine by appointment across St. Pete with 24/7 direct physician access.', image: DEFAULT_OG },
  '/location-boca-raton/': { title: 'Boca Raton \u00b7 AnswersMD\u2122', description: 'AnswersMD Boca Raton. Concierge medicine coming soon to South Florida and Palm Beach County. Join our waitlist.', image: DEFAULT_OG }
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
    var rootHtml = applyMeta(base, route, ROUTES[route]);
    writeFileSync(join(DIST, 'index.html'), rootHtml);
    count++;
    return;
  }
  var dir = join(DIST, route);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  var html = applyMeta(base, route, ROUTES[route]);
  writeFileSync(join(dir, 'index.html'), html);
  count++;
  console.log('  -> dist' + route + 'index.html');
});
 
console.log('Generated meta HTML for ' + count + ' routes.');
 
// Write a SPA fallback _redirects so client routing still works for any
// non-prerendered path. Prerendered routes already exist as real files and
// take precedence over this catch-all.
var redirects = '/*    /index.html    200\n';
writeFileSync(join(DIST, '_redirects'), redirects);
console.log('Wrote dist/_redirects (SPA fallback).');
