#!/bin/bash
set -e

echo ""
echo "  AnswersMD Dev - Documentation update"
echo "  ======================================="
echo ""

mkdir -p docs

echo "Writing files..."

mkdir -p "docs"
echo "  -> docs/BRAND-GUIDE.md"
cat > "docs/BRAND-GUIDE.md" << 'AMD_EOF_01'
# AnswersMD Brand Guide
### Visual Identity and Design System

---

## Brand Position

Premium concierge medicine that feels like a private members club with medical authority. Warm, spacious, restrained and unmistakably high-touch.

**Promise** Concierge medicine, simplified.

**Tone** Confident but not cold. Medical authority without clinical sterility. Like talking to someone who actually listens.

---

## Logo

**Primary** `logo-dark.png` for light backgrounds
**Reversed** `logo-off-white.png` for dark backgrounds
**Minimum size** 120px wide digital, 1 inch print
**Trademark** Always AnswersMD&trade; in first mention and legal contexts

---

## Color Palette

### Primary

| Token | Hex | Use |
|---|---|---|
| Deep Evergreen | `#1B3A34` | Primary buttons, dark sections, overlays |
| Evergreen Light | `#234840` | Hover states |
| Forest | `#2A4A42` | Secondary surfaces |
| Champagne | `#C4A265` | Accent, highlights, active states |
| Champagne Light | `#D4B87A` | Hover on champagne elements |
| Champagne Dark | `#A88B50` | Active states |

### Neutral

| Token | Hex | Use |
|---|---|---|
| Ivory | `#FAFAF7` | Primary page background |
| Mist | `#F0EDE8` | Alternate section backgrounds |
| White | `#FFFFFF` | Cards, elevated surfaces |
| Slate | `#2D2D2D` | Headlines |
| Body | `#4A4540` | Body text |
| Body Light | `#6B6560` | Secondary text |
| Warm Gray Light | `#9A9590` | Placeholders |

### Surface

| Token | Hex | Use |
|---|---|---|
| Border | `#E8E4DE` | Input borders |
| Border Light | `#F0ECE6` | Subtle dividers |
| Footer | `#1C2926` | Footer background |

### Usage Rules

- Champagne is used sparingly. Icons, eyebrow text, dividers, borders on featured photos. Never as a large background fill.
- Dark sections use evergreen family only. Never navy or black.
- Section backgrounds alternate between white, ivory, mist and evergreen.
- Image overlays always use `rgba(27,58,52,...)` (evergreen), never black.

---

## Typography

### Display

**Libre Baskerville** weight 700. All headlines, page titles, section headings.

### Body

**Inter** weights 300 through 600. Body text, labels, buttons, navigation.

### Scale

| Size | Value | Use |
|---|---|---|
| 7xl | 5rem | Hero headline desktop |
| 6xl | 4rem | Hero headline tablet |
| 5xl | 3.25rem | Section headings desktop |
| 4xl | 2.5rem | Section headings tablet |
| 3xl | 2rem | Section headings mobile |
| 2xl | 1.5rem | Sub-headings |
| xl | 1.25rem | Large card titles, champagne numbers |
| lg | 1.125rem | Service titles, enhanced body |
| md | 1rem | Body text (minimum for paragraphs) |
| sm | 0.875rem | Labels only, never paragraph text |
| xs | 0.75rem | Eyebrows, captions |

### Rules

- Sentence case for all headlines
- Never all caps except eyebrow labels
- Eyebrows use uppercase with 2px letter spacing
- Minimum paragraph text size is `md` (16px)
- Button text uses `md` (16px) with `size="lg"`

---

## Spacing

| Token | Value | Use |
|---|---|---|
| Section desktop | 120px | Vertical padding between sections |
| Section mobile | 80px | Vertical padding between sections |
| Container width | 98% | Maximum content width |

---

## Corner Radii

| Element | Radius |
|---|---|
| Buttons | 8px |
| Cards | 18px |
| Images | 24px |
| Panels | 28px |
| Form inputs | 8px |

---

## Buttons

### Primary

Evergreen fill, white text, 8px radius. Hover lifts with shadow.

### Secondary

Transparent fill, evergreen border, evergreen text. Hover fills evergreen.

### Ghost

Transparent, body color text. For "View all" and "Learn more" style links.

### Outlined white (on dark backgrounds)

Transparent fill, white border at `whiteAlpha.300`. Hover brightens border and adds `whiteAlpha.100` fill.

### Rules

- Sentence case
- `size="lg"` and `fontSize="md"` standard
- Never champagne fill buttons

---

## Image Overlays

### Location squares (home page)

Bottom-up gradient. Strong at bottom for text readability, fading to transparent.

```
linear-gradient(to top, rgba(27,58,52,0.7) 0%, rgba(27,58,52,0.1) 50%, transparent 100%)
```

### Location page heroes

Bottom-up gradient, slightly lighter.

```
linear-gradient(to bottom, rgba(27,58,52,0.08) 0%, rgba(27,58,52,0.55) 100%)
```

### Hero nav fade (top of page)

Ivory fade to keep navigation readable over images.

```
linear-gradient(to bottom, rgba(250,250,247,0.8) 0%, transparent 100%)
```

### Home hero center tint

Light ivory wash. Stronger on mobile for text contrast.

```
Mobile: rgba(250,250,247,0.6)
Desktop: rgba(250,250,247,0.45)
```

### Gallery images

Barely-there warm tint at rest, deepening on hover.

```
Rest: rgba(27,58,52,0.06)
Hover: rgba(27,58,52,0.12)
```

---

## Gallery Images

- All images at natural aspect ratio (1200x900 = pb 75%, 1200x500 = pb 42%)
- No cropping. `objectFit="cover"` with `objectPosition="center"`
- Zero gap between images in grid layouts
- Subtle hover zoom: `scale(1.03)` to `scale(1.06)` with cubic-bezier easing
- No titles, no headings, no text overlay on gallery images

---

## Team Photos

- Physician photos: large circular (180-200px), 3px champagne border
- Staff photos: smaller circular (60-88px), 2px light border
- All photos use `objectPosition="top"` to frame faces
- Transparent background PNGs at 400x600
- No card containers around team members

---

## Design Principles

- No containers or card backgrounds behind text unless specifically requested
- No icon circles. Bold text labels or champagne accents for visual rhythm
- Typography-first design. Let the type carry the hierarchy.
- Full-width images that breathe. Edge to edge when possible.
- Sections separated by alternating backgrounds, not borders or dividers
- Champagne thin lines (1px) for subtle section dividers within content
- Mobile-first. Content stacks clean. Images render at natural ratios.

---

## Voice and Copy

- No Oxford commas
- No em dashes or en dashes
- No colons in labels or headings
- Sentence case for headlines
- Periods instead of colons for separating thoughts
- Write out words ("Monday through Friday" not "Mon-Fri")
- Use "your physician" or "your doctor" not "our doctors"
- Locations listed as "Tampa, St. Petersburg and Boca Raton"

**Key phrases**
- "Concierge medicine. Simplified."
- "Direct access to your physician whenever you need it."
- "Your doctor's cell phone number. Yes, really."
- "Limited availability. Enroll today."

---

## Favicon

Medical symbol (&alefsym;) in champagne on deep evergreen rounded square.

Files: favicon.svg, favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png

---

## Social and OG

**OG image** `answersmd-sms-1200x630.png` (1200x630)
**Title format** Page Name | AnswersMD&trade;
**Home title** Concierge Medicine Made Simple &middot; AnswersMD&trade;
**Schema.org** MedicalBusiness type

---

Built by [Neon Burro](https://neonburro.com) in Ridgway, Colorado.

2026 AnswersMD. All rights reserved.
AMD_EOF_01

mkdir -p "docs"
echo "  -> docs/README.md"
cat > "docs/README.md" << 'AMD_EOF_02'
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
AMD_EOF_02

mkdir -p "docs"
echo "  -> docs/WORKFLOW.md"
cat > "docs/WORKFLOW.md" << 'AMD_EOF_03'
# AnswersMD Development Workflow
### How we build together

---

## Overview

This project is built through a conversational workflow between Tyler Reagan (Neon Burro) and Claude. Tyler provides design direction, content and images. Claude writes full production files and delivers them as terminal commands. Tyler runs the commands, reviews locally and deploys.

---

## The two delivery methods

### Method 1. Cat commands (single or few files)

When updating one or a few files, Claude provides the full file content wrapped in a `cat` heredoc command. Tyler copies the entire block and pastes it into the terminal.

**Single file example**

```
cat > src/pages/Home/components/Hero.jsx << 'EOF'
// src/pages/Home/components/Hero.jsx
import { Box, Text } from '@chakra-ui/react';
...full file content...
EOF
```

**Multiple files in one block**

When updating several files at once, all cat commands go into a single text file that Tyler pastes into the terminal in one shot.

```
cat > src/pages/Home/components/Hero.jsx << 'EOF'
...full file...
EOF

cat > src/pages/Home/components/Services.jsx << 'EOF'
...full file...
EOF

cat > src/pages/Home/components/CTA.jsx << 'EOF'
...full file...
EOF
```

### Method 2. Scaffold script (many files)

When delivering 5+ files or a full page build, Claude generates a `scaffold.sh` file. Tyler downloads it to the project root and runs it.

```
cd ~/Desktop/AMDDEV
bash scaffold.sh
```

The scaffold script uses the same cat heredoc approach internally but wraps everything in a bash script with `set -e`, directory creation and progress output.

### Method 3. Sed patches (tiny changes)

For single-line fixes like swapping a color or bumping a font size, Claude provides a `sed` command.

```
sed -i '' 's|bg="brand.evergreen"|bg="brand.ivory"|' src/pages/Contact/index.jsx
```

---

## Rules for writing files

**Full file rewrites only.** Every delivery is the complete file from the path comment to the last line. Never diffs, never patches, never partial snippets. If one line changes, the whole file is rewritten.

**Path comment as first line.** Every file starts with a comment showing its path.

```
// src/pages/Home/components/Hero.jsx
```

**No inline shell comments.** Zsh breaks on `#` characters inside commands. Never include `#` comments in any shell command, sed command or heredoc content that will be pasted into the terminal.

**Mkdir before writing.** When creating files in new directories, always `mkdir -p` the directory first.

```
mkdir -p src/pages/NewPage
cat > src/pages/NewPage/index.jsx << 'EOF'
...
EOF
```

**Heredoc markers.** Use single-quoted markers (`<< 'EOF'`) so shell variables and special characters pass through literally. Each file gets its own unique marker if there are multiple files (EOF, EOF2, etc. or AMD_EOF_01, AMD_EOF_02, etc.).

---

## Git workflow

After every phase of work, Tyler commits and pushes. The site auto-deploys to Netlify on every push to `main`.

```
cd ~/Desktop/AMDDEV
git add -A
git commit -m "Description of what changed"
git push
```

**Commit message style.** Short, descriptive, present tense. Examples from this project:

- "Add What to Expect and Contact pages"
- "Fix Team directory casing for case-sensitive deploy"
- "Services section: full image + evergreen content split"
- "Boost hero text visibility on mobile"
- "Match services image overlay to locations style"

**Case sensitivity.** Netlify runs Linux (case-sensitive). Mac is case-insensitive. When renaming directories to fix casing, use the two-step git mv:

```
git mv src/pages/locations src/pages/locations-tmp
git mv src/pages/locations-tmp src/pages/Locations
```

---

## Git remote

The repo lives under the `treagan9` GitHub account. The `neonburro` account does not have push access to this repo. Push using treagan9 credentials:

```
git remote set-url origin https://treagan9@github.com/treagan9/AMDDEV.git
```

---

## Development flow

```
yarn dev          Start local dev server (Vite, port 5173 or 5174)
yarn build        Production build to dist/
```

---

## Content rules

These rules apply to every piece of copy Claude writes for this project.

- No Oxford commas (use "x, y and z" not "x, y, and z")
- No em dashes or en dashes
- No colons in labels or headings
- Sentence case for all headlines (not Title Case)
- Periods instead of colons when separating thoughts
- Write out words instead of using dashes ("Monday through Friday" not "Mon-Fri")
- "Fax 833-941-5028" not "Fax: 833-941-5028"

---

## Design rules

- No containers or card backgrounds behind text unless specifically requested
- No icon circles. Use bold text labels or champagne numbers for visual rhythm
- Full-width images with warm evergreen gradient overlays
- Image overlays use `rgba(27,58,52,...)` not black
- Location image overlay: `linear-gradient(to top, rgba(27,58,52,0.7) 0%, rgba(27,58,52,0.1) 50%, transparent 100%)`
- Hero top fade for nav: `linear-gradient(to bottom, rgba(250,250,247,0.8) 0%, transparent 100%)`
- Images at natural aspect ratio. 1200x900 = pb 75%. 1200x500 = pb 42%.
- Team photos: circular with champagne border for physicians, subtle border for staff
- Section backgrounds alternate: white, ivory, mist, evergreen
- Minimum body text size: `md` (16px). Never use `sm` for paragraph text.
- Buttons: `size="lg"` with `fontSize="md"`

---

## Image conventions

All images live in `public/` and are referenced with absolute paths from root.

```
public/
  home/
    hero-desktop.png      2000x1100  Responsive hero (desktop)
    hero-tablet.png       1200x900   Responsive hero (tablet)
    hero-mobile.png       800x1200   Responsive hero (mobile)
    home-services.png     1200x500   Services section background
  locations/
    tampa-office-main.png 1200x900   Tampa hero
    tampa-office-1.png    1200x900   Tampa gallery
    ...through 6
    st-pete.png           1200x900   St. Pete hero
    boca-main.png         1200x900   Boca Raton hero
  team/
    dr-doug-shapiro.png   400x600    Transparent background
    ...all team members
  logo-dark.png                      Nav logo (light backgrounds)
  logo-off-white.png                 Footer logo (dark backgrounds)
```

---

## Handing off to a new chat

When starting a new Claude conversation for this project:

1. Share the current file tree (`tree public`, `tree src`)
2. Share the current `docs/WORKFLOW.md` (this file)
3. Share the current `docs/BRAND-GUIDE.md`
4. Share any specific files that need work
5. Describe what needs to happen next

Claude will pick up the design system, content rules and delivery workflow from these docs. The more context you provide upfront, the faster the new session gets productive.

**Key context to mention:**
- React 19 + Vite + Chakra UI v2 + Framer Motion
- JavaScript only, never TypeScript
- Full file rewrites only, cat commands or scaffold.sh
- No Oxford commas, no dashes, no colons, no containers
- yarn not npm
- Trailing slashes on all routes
- `treagan9` GitHub account for push access
- Netlify auto-deploys from main branch

---

Built by [Neon Burro](https://neonburro.com) in Ridgway, Colorado.
AMD_EOF_03


echo ""
echo "  Done. 3 docs updated."
echo "    docs/README.md"
echo "    docs/BRAND-GUIDE.md"
echo "    docs/WORKFLOW.md (new)"
echo ""
echo "  Also copy README to repo root:"
echo "  cp docs/README.md README.md"
echo ""