# BRIEFING — 2026-07-02T15:47:15Z

## Mission
Orchestrate and coordinate the mobile-first redesign of the personal portfolio website, ensuring R1, R2, R3, and all acceptance criteria are met, and verify the changes.

## 🔒 My Identity
- Archetype: teamwork_preview_orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: C:\Users\Mohamed\Documents\antigravity\mohamed-naji-portfolio\.agents\orchestrator
- Original parent: top-level
- Original parent conversation ID: d28a3bf5-2fef-4a5f-a928-aef2645987e7

## 🔒 My Workflow
- **Pattern**: Project
- **Scope document**: C:\Users\Mohamed\Documents\antigravity\mohamed-naji-portfolio\PROJECT.md
1. **Decompose**: Decompose the project into milestones for mobile-first redesign: analysis/exploration, E2E test track (designing mobile test cases), component implementation milestones, integration testing, and reviews.
2. **Dispatch & Execute** (pick ONE):
   - **Delegate (sub-orchestrator)**: Spawn sub-orchestrators for milestones or E2E testing track.
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: report to parent (sub-orchestrators only, last resort)
4. **Succession**: Spawn a successor when sub-agent spawn count reaches 16.
- **Work items**:
  1. Decompose & Plan [pending]
  2. Setup E2E Test Suite [pending]
  3. Redesign Components (Mobile-First) [pending]
  4. Build & Verify [pending]
- **Current phase**: 1
- **Current focus**: Plan and Decompose

## 🔒 Key Constraints
- Never write, modify, or create source code files directly.
- Never run build/test commands yourself — require workers to do so.
- NEVER reuse a subagent after it has delivered its handoff — always spawn fresh
- Forensic Auditor audit is a binary veto. If audit fails, iteration fails.

## Current Parent
- Conversation ID: d28a3bf5-2fef-4a5f-a928-aef2645987e7
- Updated: not yet

## Key Decisions Made
- [TBD]

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|

## Succession Status
- Succession required: no
- Spawn count: 0 / 16
- Pending subagents: none
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: not started
- Safety timer: none
- On succession: kill all timers before spawning successor
- On context truncation: run `manage_task(Action="list")` — re-create if missing

## Artifact Index
- C:\Users\Mohamed\Documents\antigravity\mohamed-naji-portfolio\.agents\orchestrator\plan.md — Detailed orchestration steps
- C:\Users\Mohamed\Documents\antigravity\mohamed-naji-portfolio\.agents\orchestrator\progress.md — Execution log and status
- C:\Users\Mohamed\Documents\antigravity\mohamed-naji-portfolio\.agents\orchestrator\context.md — Context details
