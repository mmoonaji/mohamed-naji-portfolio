# Original User Request

## Initial Request — 2026-07-02T18:45:29+03:00

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Improve the personal portfolio website design and make it fully "mobile-first".

Improve the personal portfolio website design by completely redesigning the layout for mobile, ensuring an excellent user experience on all screen sizes.

Working directory: `C:\Users\Mohamed\Documents\antigravity\mohamed-naji-portfolio`
Integrity mode: development

## Requirements

### R1. Complete Mobile Redesign
Completely redesign the layout for mobile screens. Base layouts, spacing, font sizes, and interaction targets must be designed primarily for mobile devices, then scaled up for desktop.

### R2. Maintain Existing Functionality
Maintain the current dark modern tech design aesthetics, color schemes, and full bilingual (Arabic RTL and English LTR) support.

### R3. Implementation Freedom
The team is free to restructure components or introduce new UI libraries as long as it adheres to the existing React/Tailwind ecosystem.

## Verification Resources
Agent-as-judge: A dedicated reviewer agent will inspect the modified code and component structures to verify that mobile-first best practices are followed.

## Acceptance Criteria

### CSS Structure
- [ ] Base Tailwind utility classes (without breakpoints) are applied specifically for mobile layouts.
- [ ] `md:`, `lg:`, and `xl:` breakpoints are used exclusively for scaling the layout up to larger screens.

### Design & Usability
- [ ] Project cards, case studies, and sections stack cleanly and logically on mobile screens without overflow.
- [ ] Touch targets (buttons, links, navigation) are sized appropriately for mobile usability.

### Quality Assurance
- [ ] An independent reviewer agent provides a structured evaluation report explicitly approving the mobile responsiveness.
- [ ] The build (`npm run build`) completes successfully without TypeScript errors.
