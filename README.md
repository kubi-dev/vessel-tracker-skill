# /vessel-tracker — Persian Gulf Vessel Tracking Skill

Claude Code skill for tracking oil tanker movements during the 2026 Strait of Hormuz crisis. Spawns 4 parallel agents to collect AIS data, monitor incidents, and compile weekly reports.

## Setup

1. Copy this entire `skill/` directory to `~/.claude/skills/vessel-tracker/`
2. Run `/vessel-tracker` in Claude Code
3. For scheduled runs: `/loop 24h /vessel-tracker`

That's it. All data files, watchlist, and report templates are included.

## What's Inside

| File | Description |
|------|-------------|
| `SKILL.md` | Skill definition — triggers on "track ships", "vessel report", "Hormuz traffic", etc. |
| `team-config.json` | Team agent config — 4 agents (gulf-tracker, transit-tracker, incident-tracker, report-writer) |
| `watchlist.md` | Vessel watchlist: IMO, MMSI, flag, type, DWT, organized by status |
| `report-2026-03-10.md` | Example report: 28 vessels, daily positions Mar 3-10, crisis timeline |
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

Feb 28, 2026: US/Israeli strikes on Iran triggered IRGC closure of the Strait of Hormuz. ~400 tankers trapped. 13+ vessels attacked, 7+ crew killed. GPS jamming/spoofing affecting 1,650+ vessels.

## Current Tracking

28 vessels from 14 flag states:
- 4 stuck in Gulf | 12 attacked/damaged | 7 escaped | 2 uncertain | 2 operating | 1 rescue
