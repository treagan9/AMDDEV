# AnswersMD Development Site

Development build for the AnswersMD concierge medicine platform. React application serving Tampa, St. Petersburg and Boca Raton, Florida.

**Live dev site** https://answersmd01.netlify.app
**Production site** https://answersmd.com
**Repository** https://github.com/treagan9/AMDDEV

---

## Tech Stack

- **Framework** React 19 + Vite
- **UI** Chakra UI v2
- **Animation** Framer Motion
- **Routing** React Router DOM v6
- **SEO** React Helmet Async
- **Typography** Libre Baskerville (display) + Inter (body)
- **Backend** Supabase (database + auth)
- **Email** Resend (transactional notifications)
- **Functions** Netlify Functions (form submissions, keep-alive)
- **Hosting** Netlify

---

## Pages and Routes

| Route | Page | Status |
|---|---|---|
| `/` | Home | Live |
| `/team/` | Our Team | Live |
| `/services/` | Our Approach | Live |
| `/new-patients/` | What to Expect | Live |
| `/contact/` | Contact | Live |
| `/signup/` | Join Now (11-step wizard) | Live |
| `/faq/` | FAQ | Planned |
| `/insurance/` | Insurance & Billing | Planned |
| `/executive/` | Executive Health | Planned |
| `/pricing/` | Pricing | Planned |
| `/stories/` | Patient Stories | Planned |
| `/location-tampa/` | Tampa Location | Planned |
| `/location-st-pete/` | St. Petersburg Location | Planned |
| `/location-boca-raton/` | Boca Raton Location | Planned |
| `/privacy/` | Privacy Policy | Planned |
| `/terms/` | Terms of Service | Planned |

---

## Project Structure

```
AMDDEV/
├── index.html                          Meta tags, OG image, Schema.org
├── netlify.toml                        Build config, redirects, cron
├── package.json                        Dependencies
├── vite.config.js                      Vite + MDX plugins
├── scaffold.sh                         Deploy script (dev workflow)
│
├── public/
│   ├── answersmd-sms-1200x630.png      OG/SMS share image
│   ├── favicon.svg                     SVG favicon (medical symbol)
│   ├── favicon.ico                     ICO favicon
│   ├── favicon-16x16.png              16px favicon
│   ├── favicon-32x32.png              32px favicon
│   ├── apple-touch-icon.png            iOS home screen icon
│   ├── logo-dark.png                   Logo for light backgrounds
│   ├── logo-off-white.png              Logo for dark backgrounds
│   ├── home/
│   │   ├── hero-desktop.png            Hero image (desktop)
│   │   ├── hero-tablet.png             Hero image (tablet)
│   │   └── hero-mobile.png             Hero image (mobile)
│   └── team/
│       ├── dr-doug-shapiro.png         Dr. Douglas Shapiro, DO
│       ├── dr-drew-meriwether.png      Dr. Drew Meriwether, MD
│       ├── dr-divino-dalessio.png      Dr. Divino D'Alessio Jr., MD
│       ├── dr-ellen-howard.png         Dr. Ellen Howard, MD, MPH
│       ├── lauren-shapiro.png          Lauren Shapiro
│       ├── jamie-barber.png            Jamie Barber, MBA
│       ├── emma-maddox.png             Emma Maddox
│       ├── laura-gore.png              Laura Gore
│       └── sarah-juarez.png            Sarah Juarez
│
├── netlify/
│   └── functions/
│       ├── keep-alive.js               Weekly cron to prevent Supabase pause
│       ├── submit-contact.js           Contact form handler
│       ├── submit-signup.js            Signup wizard handler
│       ├── submit-enrollment.js        Enrollment form handler
│       └── submit-careers.js           Careers form handler
│
└── src/
    ├── main.jsx                        App entry (providers, fonts)
    ├── App.jsx                         Route definitions
    │
    ├── theme/
    │   └── index.js                    Chakra UI theme tokens
    │                                   Colors, fonts, radii, spacing
    │                                   Button variants, global styles
    │
    ├── components/
    │   ├── Header.jsx                  Fixed nav, frosted scroll, mobile drawer
    │   ├── Footer.jsx                  4-column footer, locations, legal
    │   ├── Layout.jsx                  Shell (Header + Outlet + Footer)
    │   └── shared/
    │       ├── FadeSection.jsx         Scroll-triggered animation wrapper
    │       └── SectionHeader.jsx       Reusable eyebrow + heading + description
    │
    └── pages/
        ├── Home/
        │   ├── index.jsx               Assembles all home sections
        │   └── components/
        │       ├── Hero.jsx            Full-bleed responsive hero image
        │       ├── PromoBanner.jsx     Thin enrollment banner
        │       ├── About.jsx           Team arc (9 members, parabolic layout)
        │       ├── Services.jsx        4 service cards
        │       ├── HowItWorks.jsx      4-step process with arrows
        │       ├── WhyUs.jsx           2x2 differentiator grid
        │       ├── Testimonials.jsx    3 review cards with star ratings
        │       ├── Locations.jsx       3 location cards with images
        │       └── CTA.jsx            Final consultation CTA
        ├── Team/
        │   └── index.jsx               Physician profiles + staff grid
        ├── Services/
        │   └── index.jsx               Stats, proactive care, FAQ accordion
        ├── NewPatients/
        │   └── index.jsx               Journey, deep-dive, lab panels, prep
        ├── Contact/
        │   └── index.jsx               Form + contact info (mobile-first)
        └── Signup/
            └── index.jsx               11-step membership wizard
```

---

## Design System

### Colors

| Token | Hex | Use |
|---|---|---|
| Deep Evergreen | `#1B3A34` | Primary CTA, dark accents |
| Forest | `#2A4A42` | Secondary surfaces, hovers |
| Champagne | `#C4A265` | Accent, icons, highlights |
| Ivory | `#FAFAF7` | Page background |
| Mist | `#F0EDE8` | Alternate section backgrounds |
| Slate | `#2D2D2D` | Headlines |
| Body | `#4A4540` | Body text |

### Typography

| Role | Font | Weight |
|---|---|---|
| Headlines | Libre Baskerville | 700 |
| Body | Inter | 300-600 |

### Radii

| Element | Radius |
|---|---|
| Buttons | 8px |
| Cards | 18px |
| Images | 24px |
| Panels | 28px |

---

## Environment Variables

Set these in the Netlify dashboard under Site settings > Environment variables.

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_URL` | Supabase project URL (server-side) |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (server-side) |
| `RESEND_API_KEY` | Resend API key for email notifications |
| `NODE_VERSION` | Set to `20` |

---

## Local Development

```
yarn install
yarn dev
```

Dev server runs at `http://localhost:5173`

### Build

```
yarn build
```

Output to `dist/` directory.

---

## Deployment

The site auto-deploys to Netlify on every push to the `main` branch.

**Build settings**
- Build command: `yarn build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

**SPA routing** handled by the catch-all redirect in `netlify.toml`:
```
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Netlify Functions

### submit-contact
Handles the Contact page form. Saves to Supabase `leads` table and sends notification emails via Resend to the AnswersMD team.

### submit-signup
Handles the 11-step signup wizard. Saves enrollment data to Supabase and sends a styled notification email with membership details and pricing.

### submit-enrollment
Handles enrollment form submissions.

### submit-careers
Handles careers/job application form submissions.

### keep-alive
Scheduled weekly cron (`@weekly` in `netlify.toml`) that pings the Supabase REST API to prevent the free-tier project from auto-pausing.

---

## Form Submissions

All forms include spam prevention:
- **Honeypot field** (hidden `website` input, rejected if filled)
- **Timestamp check** (form must be open for at least 2 seconds before submission)

Notification emails are sent to:
- `info@answersmd.com` (To)
- `admin@answersmd.com` (BCC)
- `blipscomb@gmail.com` (BCC)
- `bryan.lipscomb@answersmd.com` (BCC)
- `doug.shapiro@answersmd.com` (BCC)

---

## Team

**Physicians**
- Dr. Douglas Shapiro, DO / Founder & Lead Physician / Tampa
- Dr. Drew Meriwether, MD / Pediatric & Internal Medicine / Tampa
- Dr. Divino D'Alessio Jr., MD / Sports & Family Medicine / Boca Raton
- Dr. Ellen Howard, MD, MPH / Family & Preventive Medicine / St. Petersburg

**Staff**
- Lauren Shapiro / Chief of Staff
- Jamie Barber, MBA / Director of Operations
- Emma Maddox / Patient Coordinator
- Laura Gore / Nurse Manager
- Sarah Juarez / Medical Assistant

---

## Locations

| City | Phone | Fax | Status |
|---|---|---|---|
| Tampa | 813-727-3233 | 833-941-5028 | Open |
| St. Petersburg | 813-727-3233 | 833-941-5028 | Open |
| Boca Raton | 561-933-3333 | 844-670-8963 | Coming Soon |

---

Built by [Neon Burro](https://neonburro.com) in Ridgway, Colorado.

&copy; 2026 AnswersMD&trade;. All rights reserved.