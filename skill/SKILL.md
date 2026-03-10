---
name: vessel-tracker
description: Track oil tanker and vessel movements in the Persian Gulf / Strait of Hormuz area
---

# /vessel-tracker

Track oil tanker and vessel movements in the Persian Gulf / Strait of Hormuz area. Generates a weekly activity report with daily positions for tracked vessels.

Use this skill when the user asks to check ship positions, track vessels, update the vessel report, or monitor Persian Gulf shipping activity. Also trigger on: "track ships", "vessel report", "tanker positions", "Hormuz traffic", "ship movements", "update vessel tracking".

## Procedure

### 1. Load the vessel watchlist

Read the current watchlist from `watchlist.md` in this skill's directory. This contains the list of vessels to track with their IMO numbers, MMSI, flags, and types.

### 2. Spawn team agents for parallel tracking

Create a team called `vessel-tracker` with these agents:

1. **gulf-tracker** — Tracks vessels currently INSIDE the Persian Gulf (anchored, stuck, operating)
2. **transit-tracker** — Tracks vessels that have transited or are transiting the Strait of Hormuz
3. **incident-tracker** — Monitors for new attacks, incidents, GPS spoofing, and crisis developments
4. **report-writer** — Compiles all data into the final markdown report

### 3. Data collection

Each tracker agent should:

- For each assigned vessel, fetch position data from these free sources:
  - `https://shipinfo.net/vessels_map_imo_XXXXXXX` (best for track points)
  - `https://maritimeoptima.com/public/vessels/pages/imo:XXXXXXX/mmsi:YYYYYYY/NAME.html` (port calls)
  - `https://www.vesseltracker.com/en/Ships/Name-XXXXXXX.html` (current status)
  - `https://myshiptracking.com/vessels/name-mmsi-YYYYYYY-imo-XXXXXXX` (coordinates, events)
- Search for any news about the vessel: `"[vessel name]" March 2026`
- Record: date, coordinates, speed, course, status, port calls

### 4. Report generation

The report-writer agent compiles all data into a markdown file:
- Save to: `report-YYYY-MM-DD.md` in this skill's directory
- Format: Same structure as the existing `report-2026-03-10.md` in this directory
- Include: daily position tables, outcome classifications, summary stats

### 5. Discovery of new vessels

Search for newly reported vessels in the area:
- Check Windward Maritime Intelligence Daily
- Search news for new incidents/transits
- Add new vessels to the watchlist

## Output

- Updated report file in this skill's directory
- Updated watchlist in this skill's directory if new vessels discovered
- Brief summary to the user of key changes since last report
