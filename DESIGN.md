---
name: Mohamed Naji Portfolio (Hyper-Minimalist)
description: A hyper-minimalist, typography-driven portfolio for jobs, remote roles, and freelance client trust.
colors:
  dark-900: "#000000"
  text-main: "#FFFFFF"
  text-muted: "#888888"
  border-subtle: "#333333"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  arabic:
    fontFamily: "Rubik Arabic, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
spacing:
  section-sm: "48px"
  section-md: "64px"
  section-lg: "120px"
---

# Design System: Mohamed Naji Portfolio (Hyper-Minimalist)

## 1. Overview

**Creative North Star: "The Document"**

This system abandons the traditional "Tech Portfolio UI" entirely. There are no cards, no shadows, no gradients, and no decorative containers. It acts as a highly polished, interactive text document. It is brutalist in its simplicity, relying entirely on flawless typography and generous whitespace to create a sense of elite technical authority.

**Key Characteristics:**
- Pure black foundation with pure white text and dim gray secondary text.
- Zero containers: content is structured by indentations and typographic hierarchy, not by boxes.
- Links are text. Buttons are text. 
- Bilingual dignity: Arabic and English must share the exact same brutalist elegance.

## 2. Colors

The palette is restricted to pure monochromatic values. 

- **Background**: Pure Black (`#000000`).
- **Primary Text**: Pure White (`#FFFFFF`).
- **Muted Text**: Dim Gray (`#888888`).
- **Subtle Borders**: Dark Gray (`#333333`). Used only for necessary dividers, not for enclosing content.

**The Monochromatic Rule:** No accent colors (no blue, no green). Links distinguish themselves through hover states (e.g., underlining or color shifting to white from gray).

## 3. Typography

**Display Font:** Inter (with sans-serif fallback)  
**Arabic Font:** Rubik Arabic (with sans-serif fallback)

**Character:** Typography is the *only* UI. It must be perfect. We use lighter font weights (400) for headlines instead of heavy bolding to maintain an elegant, understated look.

### Hierarchy
- **Display**: Main hero statement. Modest size, tight letter spacing.
- **Headline**: Section titles. 
- **Title**: Project names, service headers.
- **Body**: Descriptions and prose. 

## 4. Components (Or Lack Thereof)

### Links & Buttons
- No solid background buttons. All interactive elements are text links.
- Hover states are simple: an underline appears, or muted text turns bright white.

### Lists instead of Cards
- Projects are not cards. They are text lists.
- Example: `[Project Title] — [Short Description] ↗`
- Hovering over a list item might slightly highlight the text, nothing more.

### Forms
- Inputs have no backgrounds. They are just text with a thin bottom border.
- `border-b border-subtle focus:border-white bg-transparent`

## 5. Do's and Don'ts

### Do:
- **Do** use massive amounts of whitespace between sections.
- **Do** align text perfectly on the grid.
- **Do** let the content speak for itself without visual crutches.
- **Do** ensure line lengths for body text do not exceed 70 characters.

### Don't:
- **Don't** use `bg-` classes for anything other than the main page background.
- **Don't** use `shadow-`, `rounded-`, or `backdrop-blur`.
- **Don't** use icons unless absolutely necessary (e.g., an external link arrow ↗). Remove Lucide icons from services and contact sections.
- **Don't** use mockups or images of devices. 
