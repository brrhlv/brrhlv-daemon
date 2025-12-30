# Daemon Redesign - Design Specification v4

**Updated:** 2024-12-29
**Brand Version:** brrhlv v4 Clarity Edition
**Industry:** Personal / Tech
**Mood:** Cyberpunk Terminal + brrhlv Brand
**Primary Goal:** Personal API interface

---

## Design Direction

**Concept:** Cyberpunk tech terminal with brrhlv brand identity

Merging:
- The **terminal/dashboard aesthetic** of the original Daemon
- The **purple/burgundy cyberpunk goth** palette from brrhlv v4
- **Monospace typography** for the terminal feel
- **Scan lines and glow effects** from brrhlv hero

---

## Color Palette (v4 Brand System)

**Color Hierarchy:** Dark 40% | Purple 30% | Steel 20% | Burgundy 10%

### Primary Purple
```css
--purple-light: #9061F9;    /* 5.5:1 - Text, links, interactive */
--purple: #7C3AED;          /* 4.1:1 - Non-text accents, borders, icons */
--purple-dark: #5B21B6;     /* Pressed states, depth */
```

### Secondary Burgundy
```css
--burgundy: #881337;        /* Gradients, decorative only. NEVER for text */
```

### Neutral Steel
```css
--steel-light: #D4D4D8;     /* 13.2:1 - Headlines, primary text */
--steel: #A1A1AA;           /* 7.8:1 - Body text, secondary */
--steel-dark: #52525B;      /* 3.4:1 - Large text only (18px+), muted */
```

### Background
```css
--bg: #0C0C0F;              /* Primary background */
--bg-elevated: #18181B;     /* Cards, modals */
--bg-border: #27272A;       /* Dividers, borders */
```

### Semantic States
```css
--success: #9CB92C;         /* Peridot - Bryan's birthstone */
--error: #EF4444;           /* Errors, destructive actions */
--warning: #F59E0B;         /* Cautions, alerts */
```

---

## Accessibility Rules

| Context | Minimum Contrast | Approved Colors |
|---------|-----------------|-----------------|
| Body text (any size) | 4.5:1 | Steel Light, Steel, Purple Light |
| Large text (18px+) | 3:1 | + Steel Dark |
| Non-text (icons, borders) | 3:1 | Any except Burgundy on dark |
| Decorative only | None | Burgundy, Purple Dark |

---

## Typography

### Fonts
- **Display/Headers:** Bebas Neue (bold, condensed, all-caps vibe)
- **Body:** Fira Sans (clean, readable, technical)
- **Monospace/Terminal:** Fira Code (for terminal aesthetic)

### Hierarchy
| Element | Font | Size | Color |
|---------|------|------|-------|
| Display Title | Bebas Neue | 8rem | Steel Light |
| Status Bar Label | Fira Code | 1rem | Steel Light |
| Section Headers | Fira Code | 0.75rem | Steel Dark |
| Body Text | Fira Sans | 1rem | Steel |
| Terminal/Code | Fira Code | 0.875rem | Purple Light |
| Meta/Timestamp | Fira Code | 0.75rem | Steel Dark |

---

## Layout

### Structure
- Full-width status bar at top
- Hero section with DAEMON title
- 2-column grid for Mission/Purpose
- 3-column grid for Books/Movies/Podcasts
- 3-column grid for Preferences/Routine/Projects
- Centered API footer

### Spacing
- Gap between cards: 1rem
- Card padding: 1.5rem
- Section spacing: 2rem

---

## Visual Effects

### Glow Effects (2-Type System)
```css
--glow-action: 0 0 12px rgba(144, 97, 249, 0.5);  /* Buttons, links on hover */
--glow-subtle: 0 0 8px rgba(161, 161, 170, 0.12); /* Cards, ambient elements */
--glow-peridot: 0 0 8px rgba(156, 185, 44, 0.5);  /* Success states */
```

### Motion
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--duration-micro: 150ms;     /* Hover states, small changes */
--duration-standard: 300ms;  /* Most UI transitions */
--duration-emphasis: 500ms;  /* Page transitions, reveals */
```

### Terminal Effects
1. **Scan lines:** Subtle horizontal lines overlay (purple at 2% opacity)
2. **Grid pattern:** 50px grid with purple at 3% opacity
3. **Vignette:** Edge darkening on main container

---

## Component Specifications

### StatusBar
- Brand: `DAEMON://BRRH` (protocol in purple-light)
- Font: Fira Code 1rem
- Background: bg-elevated (#18181B)
- Border: bg-border (#27272A)
- Status indicator: Peridot (#9CB92C) with pulse animation

### Cards
- Background: bg-elevated (#18181B)
- Border: bg-border (#27272A)
- Left accent: 3px purple (#7C3AED)
- Hover: purple-light border, subtle glow, translateY(-2px)
- Border radius: 0.25rem (angular)

### Hero
- Title: "DAEMON" in Bebas Neue 8rem
- Subtitle: "Personal API for Human Connection"
- LIVE badge: Peridot dot + pill border
- Text shadow: `0 0 60px rgba(124, 58, 237, 0.3)`

### Buttons
| Type | Background | Text | Hover |
|------|------------|------|-------|
| Primary | purple | white | purple-light + glow |
| Secondary | transparent | purple-light | purple 10% bg |
| Disabled | bg-border | steel-dark | none |

---

## Iconography

- **Library:** Phosphor Icons (phosphoricons.com)
- **Style:** Minimal, line-based
- **Size:** 24x24 for cards
- **Stroke:** 1.5px
- **Color:** Purple Light (#9061F9)

---

## Implementation Checklist

- [x] Color palette defined (v4)
- [x] Typography selected
- [x] Layout preserved
- [x] Effects specified
- [x] Accessibility rules documented
- [x] Design mockups created
- [ ] CSS variables updated
- [ ] Components restyled
- [ ] User approved

---

## Reference Files

- **Design Mockups:** `design-mockups.html`
- **Brand Source:** `~/.claude/skills/brrhlv-brand/SKILL.md`
- **Live Brand:** https://brrh.lv

---
*Updated to brrhlv v4 Clarity Edition*
