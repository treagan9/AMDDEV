# AnswersMD Development Site

Development build for the AnswersMD concierge medicine platform. React application serving Tampa, St. Petersburg and Boca Raton, Florida.

**Live dev site** https://answersmd01.netlify.app
**Production site** https://answersmd.com
**Repository** https://github.com/treagan9/AMDDEV

---

## Tech Stack

- React 19 + Vite
- Chakra UI v2
- Framer Motion
- React Router DOM v6
- React Helmet Async
- Libre Baskerville (display) + Inter (body)
- Supabase (database + auth)
- Resend (transactional email)
- Netlify Functions (form submissions)
- Netlify (hosting, auto-deploy from main)

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
| `/location-tampa/` | Tampa Location | Live |
| `/location-st-pete/` | St. Petersburg Location | Live |
| `/location-boca-raton/` | Boca Raton Location | Live |

---

## Project Structure

```
AMDDEV/
├── index.html                          Meta tags, OG image, Schema.org
├── netlify.toml                        Build config, redirects, cron
├── package.json
├── vite.config.js
├── docs/
│   ├── README.md                       This file
│   ├── BRAND-GUIDE.md                  Visual identity reference
│   └── WORKFLOW.md                     Development workflow and handoff guide
│
├── public/
│   ├── answersmd-sms-1200x630.png      OG/SMS share image
│   ├── favicon.svg                     SVG favicon (medical symbol)
│   ├── favicon.ico                     ICO favicon
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── logo-dark.png                   Nav logo
│   ├── logo-off-white.png              Footer logo
│   ├── home/
│   │   ├── hero-desktop.png            2000x1100
│   │   ├── hero-tablet.png             1200x900
│   │   ├── hero-mobile.png             800x1200
│   │   └── home-services.png           1200x500
│   ├── locations/
│   │   ├── tampa-office-main.png       1200x900
│   │   ├── tampa-office-1 through 6    1200x900
│   │   ├── st-pete.png                 1200x900
│   │   └── boca-main.png               1200x900
│   └── team/
│       ├── dr-doug-shapiro.png         400x600 transparent
│       ├── dr-drew-meriwether.png
│       ├── dr-divino-dalessio.png
│       ├── dr-ellen-howard.png
│       ├── lauren-shapiro.png
│       ├── jamie-barber.png
│       ├── emma-maddox.png
│       ├── laura-gore.png
│       └── sarah-juarez.png
│
├── netlify/
│   └── functions/
│       ├── keep-alive.js               Weekly cron
│       ├── submit-contact.js           Contact form handler
│       ├── submit-signup.js            Signup wizard handler
│       ├── submit-enrollment.js
│       └── submit-careers.js
│
└── src/
    ├── main.jsx                        App entry
    ├── App.jsx                         Route definitions
    ├── theme/
    │   └── index.js                    Chakra UI tokens
    ├── components/
    │   ├── Header.jsx                  Fixed nav, frosted scroll, mobile drawer
    │   ├── Footer.jsx                  4-column footer
    │   ├── Layout.jsx                  Shell wrapper
    │   └── shared/
    │       ├── FadeSection.jsx
    │       └── SectionHeader.jsx
    └── pages/
        ├── Home/
        │   ├── index.jsx               Assembles all home sections
        │   └── components/
        │       ├── Hero.jsx            Full-bleed responsive hero image
        │       ├── PromoBanner.jsx     Enrollment banner
        │       ├── About.jsx           Team arc (9 members)
        │       ├── Services.jsx        Full image + evergreen content
        │       ├── HowItWorks.jsx      4-step process
        │       ├── WhyUs.jsx           4 differentiators
        │       ├── Testimonials.jsx    3 reviews
        │       ├── Locations.jsx       3 connected location squares
        │       └── CTA.jsx            Final call to action
        ├── Team/
        │   └── index.jsx               Physician profiles + staff
        ├── Services/
        │   └── index.jsx               Approach, services, FAQ
        ├── NewPatients/
        │   └── index.jsx               Journey, deep-dive, labs, prep
        ├── Contact/
        │   └── index.jsx               Form + info (mobile-first)
        ├── Signup/
        │   └── index.jsx               11-step membership wizard
        └── Locations/
            ├── Tampa.jsx               Gallery, team, CTA
            ├── StPete.jsx              Team, CTA
            └── BocaRaton.jsx           Coming soon, waitlist
```

---

## Environment Variables

Set in Netlify dashboard under Site settings.

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_URL` | Server-side Supabase URL |
| `SUPABASE_SERVICE_KEY` | Service role key |
| `RESEND_API_KEY` | Resend API key |
| `NODE_VERSION` | Set to `20` |

---

## Local Development

```
yarn install
yarn dev
yarn build
```

---

## Deployment

Auto-deploys to Netlify on every push to `main`. Build command `yarn build`, publish directory `dist`, functions directory `netlify/functions`.

SPA routing handled by catch-all redirect in `netlify.toml`.

---

## Form Submissions

All forms include honeypot field and timestamp check for spam prevention.

Notification emails sent to info@answersmd.com with BCC to admin@answersmd.com, blipscomb@gmail.com, bryan.lipscomb@answersmd.com and doug.shapiro@answersmd.com.

---

## Team

**Physicians**
- Dr. Douglas Shapiro, DO. Founder & Lead Physician. Tampa.
- Dr. Drew Meriwether, MD. Pediatric & Internal Medicine. Tampa.
- Dr. Divino D'Alessio Jr., MD. Sports & Family Medicine. Boca Raton.
- Dr. Ellen Howard, MD, MPH. Family & Preventive Medicine. St. Petersburg.

**Staff**
- Lauren Shapiro. Chief of Staff.
- Jamie Barber, MBA. Director of Operations.
- Emma Maddox. Patient Coordinator.
- Laura Gore. Nurse Manager.
- Sarah Juarez. Medical Assistant.

---

## Locations

| City | Phone | Fax | Status |
|---|---|---|---|
| Tampa | 813-727-3233 | 833-941-5028 | Open |
| St. Petersburg | 813-727-3233 | 833-941-5028 | Open |
| Boca Raton | 561-933-3333 | 844-670-8963 | Coming Soon |

---

Built by [Neon Burro](https://neonburro.com) in Ridgway, Colorado.

2026 AnswersMD. All rights reserved.
