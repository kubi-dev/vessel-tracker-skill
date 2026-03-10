# /vessel-tracker — Persian Gulf Vessel Tracking Skill

AI coding agent skill for tracking oil tanker movements during the 2026 Strait of Hormuz crisis. Spawns parallel agents to collect AIS data, monitor incidents, and compile weekly reports.

Works with Claude Code, Codex, and Antigravity.

## Setup

```
npx github:kubi-dev/vessel-tracker-skill
```

This installs the skill to all supported tools at once:

| Tool | Install path |
|------|-------------|
| Claude Code | `~/.claude/skills/vessel-tracker/` |
| Codex | `~/.codex/skills/vessel-tracker/` |
| Antigravity | Appended to `~/.gemini/GEMINI.md` |

## Usage

**Claude Code**
- `/vessel-tracker` to generate a report
- `/loop 24h /vessel-tracker` for scheduled runs

**Codex**
- The skill is auto-discovered — say "track vessels" or "vessel report"

**Antigravity**
- Say "track vessels", "vessel report", or "Hormuz traffic"

## What's Inside

| File | Description |
|------|-------------|
| `SKILL.md` | Skill definition — triggers on "track ships", "vessel report", "Hormuz traffic", etc. |
| `team-config.json` | Team agent config — 4 agents (gulf-tracker, transit-tracker, incident-tracker, report-writer) |
| `watchlist.md` | Vessel watchlist: IMO, MMSI, flag, type, DWT, organized by status |
| `report-2026-03-10.md` | Latest report: 34 vessels, daily positions Mar 3-10, crisis timeline |
| `data/gulf-vessels.md` | Raw AIS data — vessels inside the Gulf |
| `data/transit-vessels.md` | Raw AIS data — vessels that transited the Strait |
| `data/incident-vessels.md` | Raw data — attacked/damaged vessels |

## How It Works

The skill spawns 4 team agents in parallel:

- **gulf-tracker** — Tracks vessels anchored/stuck inside the Persian Gulf
- **transit-tracker** — Tracks vessels transiting the Strait of Hormuz
- **incident-tracker** — Monitors attacks, GPS spoofing, crisis developments
- **report-writer** — Compiles all data into a dated markdown report

Data is fetched from free AIS platforms (no accounts needed):
ShipInfo.net, Maritime Optima, VesselTracker, MyShipTracking, MagicPort

## Background

Feb 28, 2026: US/Israeli strikes on Iran triggered IRGC closure of the Strait of Hormuz. ~200 tankers trapped. ~20,000 seafarers stranded. 15 vessels attacked, 7+ crew killed. GPS jamming/spoofing affecting 1,650+ vessels. Crude at $119+/bbl.

## Current Tracking (Mar 10, 2026)

34 vessels from 17 flag states:
- 5 stuck in Gulf | 15 attacked/damaged | 8 escaped/transited | 2 operating | 1 preparing transit | 1 rescue | 2 IRISL dual-use

Key event: **SHENLONG arrived Mumbai** — first confirmed blockade-breaking crude delivery (~1M barrels Saudi crude, 5-day dark transit).
