# AnswersMD Brand Guide
### Visual Identity and Design System

---

## Brand Overview

AnswersMD is a concierge medicine practice delivering personalized, proactive primary care through a membership model in Tampa, St. Petersburg and Boca Raton, Florida.

**Brand position** Premium concierge medicine that feels like a private members club with medical authority. Warm, spacious, restrained and unmistakably high-touch.

**Brand promise** Concierge medicine, simplified.

**Target audience** Affluent individuals and families who expect premium experiences across every part of their life.

**Brand tone** Confident but not cold. Medical authority without clinical sterility. The language should feel like talking to someone who actually listens, not reading a hospital brochure.

---

## Logo

The AnswersMD wordmark is the primary brand identifier. It should always appear with clear space around it and never be altered, stretched or recolored outside the approved versions.

**Primary** `logo-dark.png` for light backgrounds (nav, ivory sections)
**Reversed** `logo-off-white.png` for dark backgrounds (footer, evergreen sections)

**Minimum size** 120px wide on digital, 1 inch on print

**Clear space** Maintain at least the height of the "A" in AnswersMD on all sides

**Trademark** Always display as AnswersMD&trade; in legal contexts and first mention on any page

---

## Color Palette

### Primary Colors

| Token | Hex | RGB | Use |
|---|---|---|---|
| Deep Evergreen | `#1B3A34` | 27, 58, 52 | Primary buttons, dark accents, promo banner |
| Evergreen Light | `#234840` | 35, 72, 64 | Hover states on evergreen elements |
| Forest | `#2A4A42` | 42, 74, 66 | Secondary surfaces, overlays |
| Champagne | `#C4A265` | 196, 162, 101 | Accent, icons, highlights, dividers |
| Champagne Light | `#D4B87A` | 212, 184, 122 | Hover states on champagne elements |
| Champagne Dark | `#A88B50` | 168, 139, 80 | Active states, badge text |

### Neutral Colors

| Token | Hex | RGB | Use |
|---|---|---|---|
| Ivory | `#FAFAF7` | 250, 250, 247 | Primary page background |
| Mist | `#F0EDE8` | 240, 237, 232 | Alternating section backgrounds |
| White | `#FFFFFF` | 255, 255, 255 | Cards, elevated surfaces |
| Slate | `#2D2D2D` | 45, 45, 45 | Headlines, high-contrast text |
| Body | `#4A4540` | 74, 69, 64 | Body text |
| Body Light | `#6B6560` | 107, 101, 96 | Secondary text, captions |
| Warm Gray Light | `#9A9590` | 154, 149, 144 | Muted labels, placeholders |

### Surface Colors

| Token | Hex | Use |
|---|---|---|
| Border | `#E8E4DE` | Input borders, card borders |
| Border Light | `#F0ECE6` | Subtle dividers, light borders |
| Footer | `#1C2926` | Footer background |

### Usage Rules

- Champagne is used sparingly. It marks accent elements: icons, eyebrow text, dividers, active states. It should never be used as a large background fill.
- Dark sections should stay in the evergreen family. Never use navy, black or gray for dark panels.
- Section backgrounds alternate between ivory, white and mist to create rhythm without introducing new colors.
- Text on dark backgrounds should be white or whiteAlpha. Never use champagne for body text on dark backgrounds.

---

## Typography

### Display

**Libre Baskerville** (Google Fonts)
Weight: 700 (bold)
Use: All headlines, page titles, section headings, hero text

Libre Baskerville provides authority and elegance at large sizes. It has enough width and weight to carry the brand without feeling decorative or delicate.

### Body

**Inter** (Google Fonts)
Weights: 300, 400, 500, 600
Use: Body text, labels, buttons, navigation, form fields

Inter is clean, highly readable at all sizes and works across every context from large paragraphs to tiny captions.

### Type Scale

| Size Token | Value | Use |
|---|---|---|
| 7xl | 5rem (80px) | Hero headline (desktop) |
| 6xl | 4rem (64px) | Hero headline (tablet) |
| 5xl | 3.25rem (52px) | Section headings (desktop) |
| 4xl | 2.5rem (40px) | Section headings (tablet) |
| 3xl | 2rem (32px) | Section headings (mobile) |
| 2xl | 1.5rem (24px) | Card titles, sub-headings |
| xl | 1.25rem (20px) | Large card titles |
| lg | 1.125rem (18px) | Enhanced body, card titles |
| md | 1rem (16px) | Body text |
| sm | 0.875rem (14px) | Secondary text, buttons, labels |
| xs | 0.75rem (12px) | Eyebrows, captions, badges |

### Headline Rules

- All headlines use sentence case (first word capitalized, rest lowercase)
- Never use all caps for headlines
- Eyebrow labels use uppercase with 2px letter-spacing
- Button text uses sentence case with no heavy letter-spacing

---

## Spacing

| Token | Value | Use |
|---|---|---|
| Section (desktop) | 120px | Vertical padding between major sections |
| Section (mobile) | 80px | Vertical padding between major sections |
| Container width | 98% | Maximum content width on desktop |

---

## Corner Radii

| Element | Radius |
|---|---|
| Buttons | 8px |
| Cards | 18px |
| Images | 24px |
| Panels | 28px |
| Form inputs | 8px |

Corner radii are consistent across the entire application. Buttons and inputs share 8px. Cards and content containers use 18px. Large images and hero panels use 24px. Full-bleed panels use 28px.

---

## Buttons

### Primary

- Background: Deep Evergreen `#1B3A34`
- Text: White
- Radius: 8px
- Hover: Slight lift (translateY -2px), shadow, lighter evergreen

### Secondary

- Background: Transparent
- Border: 1px solid `#E8E4DE`
- Text: Deep Evergreen
- Hover: Fill evergreen, text turns white

### Ghost

- Background: Transparent
- Text: Body color
- Hover: Mist background

### Text Link CTA

- No background or border
- Text with arrow icon (HiArrowRight)
- Color: Body, hover to evergreen
- Use for secondary actions ("Learn more", "View all services")

### Rules

- Sentence case for all button text
- No heavy letter-spacing or uppercase (except the old production style)
- Hover state includes translateY(-2px) lift with subtle shadow
- Primary buttons are evergreen, never champagne fill

---

## Icons

**Library** React Icons (Heroicons Outline)
**Prefix** `HiOutline`

Icons are used at 20-24px inside champagne-tinted circular backgrounds (48-56px diameter). The icon color is always champagne. The background is `brand.champagneSoft` (6% opacity champagne).

**Common icons**
- Phone: `HiOutlinePhone`
- Heart/Health: `HiOutlineHeart`
- Home: `HiOutlineHome`
- Clipboard: `HiOutlineClipboardCheck`
- Calendar: `HiOutlineCalendar`
- People: `HiOutlineUserGroup`
- Chat: `HiOutlineChat`
- Clock: `HiOutlineClock`
- Arrow: `HiArrowRight`

---

## Motion

All animations use Framer Motion. The approach is subtle and purposeful. Nothing flashy.

**Scroll reveal** Elements fade up (y: 30 to 0, opacity: 0 to 1) when they enter the viewport. Duration: 0.5-0.6s. Stagger between siblings: 0.08-0.12s.

**Header** Transitions from transparent to frosted glass (blur + ivory tint) on scroll.

**Card hover** TranslateY -4px with subtle box shadow. Transition: 0.3-0.4s ease.

**Mobile menu** Full-screen overlay with staggered link entrance. Fade in 0.25s, links stagger 0.05s each.

**Page transitions** Not currently implemented. Content loads with scroll-triggered reveals per section.

**Reduced motion** All animations should respect `prefers-reduced-motion`. Framer Motion handles this by default.

---

## Photography

- Images should feel warm, premium and aspirational
- The primary palette of the photography is cream, marble, warm wood and deep green
- Team photos are transparent-background PNGs at 400x600
- Location photos are landscape JPGs from the production site
- Hero images are served responsively: desktop (landscape), tablet (landscape), mobile (portrait)
- All images use `objectFit: cover` and the `image` border radius (24px) when displayed in cards

---

## Voice and Copy

**Tone** Calm, confident, premium. Like a trusted advisor who respects your time.

**Rules**
- Never use Oxford commas
- Never use em dashes or en dashes
- Sentence case for all headlines
- Keep copy concise and benefit-led
- Avoid clinical jargon unless explaining a service
- Use "your physician" or "your doctor" rather than generic "our doctors"
- Locations are always listed as "Tampa, St. Petersburg and Boca Raton"

**Key phrases**
- "Concierge medicine, simplified."
- "Direct access to your physician whenever you need it."
- "Healthcare built around you."
- "Your doctor's cell phone number. Yes, really."
- "Limited availability. Enroll today."

---

## Favicon

The favicon uses the ⚕ (Staff of Aesculapius) medical symbol in champagne on a deep evergreen rounded square.

**Files**
- `favicon.svg` (scalable)
- `favicon.ico` (16x16, 32x32)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)

---

## Social and OG

**OG image** `answersmd-sms-1200x630.png` (1200x630)
**Title format** `Page Name | AnswersMD™`
**Separator** Middle dot `·` for the home page title
**Schema.org** `MedicalBusiness` type with all three locations

---

Built by [Neon Burro](https://neonburro.com) in Ridgway, Colorado.

&copy; 2026 AnswersMD&trade;. All rights reserved.