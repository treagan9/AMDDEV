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
