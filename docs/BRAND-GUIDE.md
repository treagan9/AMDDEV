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
