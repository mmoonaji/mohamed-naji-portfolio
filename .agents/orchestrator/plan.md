# Plan: Mobile-First Redesign Orchestration Plan

## Objective
Orchestrate the mobile-first redesign of the personal portfolio website to ensure excellent responsiveness, clean layout stacking, appropriate touch targets, and successful builds without TS/CSS issues, verifying everything via reviewers and auditors.

## Decomposition and Milestones
We split the mobile-first redesign into 6 key milestones:

1. **Milestone 1: E2E Test Suite (Dual Track)**
   - Setup a custom node-based or lightweight testing harness to perform responsiveness audits, check elements styling, ensure Tailwind mobile-first rules are followed, and check touch targets.
   - Deliver `TEST_READY.md` containing features inventory and automated verification script paths.

2. **Milestone 2: Navigation & Footer Mobile Redesign**
   - Redesign `Navbar.tsx` and `Footer.tsx` for mobile screen sizes (add/improve hamburger menu, ensure appropriate touch target sizes >= 44x44px, vertical stacking).

3. **Milestone 3: Hero, About, Experience & Services Redesign**
   - Redesign section components: `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Services.tsx`.
   - Ensure clean vertical stacking, font sizing adjustments, and correct padding/margins without layout overflow.

4. **Milestone 4: Skills, WhatIBuild, FeaturedProjects & Contact Redesign**
   - Redesign section components: `Skills.tsx`, `WhatIBuild.tsx`, `FeaturedProjects.tsx`, `Contact.tsx`.
   - Ensure cards and items stack cleanly on mobile. Sizing of contact inputs and button targets for touch usability.

5. **Milestone 5: Page-level Redesigns & Global Styling**
   - Redesign `Home.tsx`, `CaseStudy.tsx`, and `NotFound.tsx`.
   - Adjust global layout elements in `App.tsx`, `App.css`, and `index.css`.

6. **Milestone 6: Verification & Integration (Final Milestone)**
   - Phase 1: Run all E2E test suites (Tier 1-4) on the fully redesigned app and fix any issues.
   - Phase 2: Run Adversarial Coverage Hardening (Tier 5) to inspect the code, check for hidden responsive issues, and generate extra edge cases. Run final Forensic Audit.

## Verification Plan
For each milestone:
1. Dispatch Worker agent to implement changes and verify that the build compiles (`npm run build`).
2. Dispatch Reviewer agent to verify mobile-responsiveness, component structure, and adherence to Tailwind mobile-first classes.
3. Run Forensic Auditor agent to verify integrity (ensure no cheating, no hardcoding, genuine responsive styling).

## Execution Strategy
- We will spawn fresh subagents for each milestone's implementation.
- We will monitor them using progress updates and heartbeat crons.
- If any agent gets stuck, we will retry/replace it.
- After all milestones succeed, report victory back to Project Sentinel.
