# Changelog

## Rev C — 25 Oct 2026

Branding (all sheets)
- Removed "The Composition Group" and the TCG-CDP-CR sheet codes. Mark is now "Fancy Ape®" (was ™). Headers on 001 and 002 read "Community Printable · Ready When Needed". Footer line: "REV C · 25 OCT 2026 · US LETTER · FREE TO COPY".

001 The First 72
- Reorganized around actions. Stock list is now 4 lines (water, food + can opener, light/radio/batteries, meds/first aid/cash/documents) with "+ pet, baby, care needs" in the heading. The meds line no longer prints "7+ days (a month if you can)" (removed for space).
- Added: "Power went out at", food rule (fridge ~4 hrs, full freezer ~48, half-full ~24), sewer line, LEAVE IF triggers with "We go to", generator line (outdoors only, 20+ ft, working CO alarm), phone battery line, "NOAA / local radio", and "Needs power for a device: backup plan".
- Removed: the line under the title, "Flashlight and radio where you can find them", "Write down official instructions", and "Kit stored at" and "Go to" write-ins.

002 Water First
- Added: "germs, not chemicals … local advisories come first" in step 1, a BOIL WATER / DO NOT DRINK / DO NOT USE box, "Replace stored bleach yearly", and tight-lid food-grade containers.
- Reorganized the unsafe-water steps (check advisory, bottled water, then boil or bleach, filter only if labeled). Removed the intro line, the People × Days = Gallons blanks, the Example line and the "Stored at / Filled on" blanks. Numerals 92px to 72px.

003 Carry Cards
- Added "Germs only · clear water · 5–9% bleach". Replaced "Medical needs · meds" with "Backup meeting place" and "Local radio" (no private medical information on cards). Card padding reduced.

Build and site
- Bottom padding 40px to 32px on all sheets. The build now fails if any sheet or card runs past its bottom padding, and reports spare space (001: 21.1px, 002: 24.4px, 003: 10.3px per card).
- SOURCES.md: new sources and mappings. Food times verified 2026-10-25 (USDA/FoodSafety.gov). Sewer, advisory definitions and LEAVE IF stay pending manual verification.
- Site footer updated to Rev C. PDF filenames unchanged. LICENSE and README credit unchanged.

## Rev B — 25 Oct 2026

First public draft.

- Sheets: 001 The First 72, 002 Water First, 003 Carry Cards.
- PDF build (`npm run build`) and plain GitHub Pages site in `docs/`.
- Sources last verified 2026-10-25 (see SOURCES.md).
- 001: "Fill clean containers while the tap runs" replaced with "Use stored water first; see 002". SOURCES.md now has URLs and new mappings.
- 001: "Meds, 7 days + list" is now "Meds, 7+ days (a month if you can) + list". The longer line wraps, so the stock-list row gap went from 8px to 4px to keep the sheet on one page.
- SOURCES.md: added Ready.gov Floods and FCC, Tips for Communicating in an Emergency; CDC titles updated; Red Cross 7-day / 1-month note; remaining quote checks marked pending manual verification by maintainer.
- Site: `docs/index.html` simplified to three download buttons, an all-in-one link, four how-to lines and a one-line footer.
- 001: footer source line now reads "American Red Cross, emergency supplies" (was "7-day medication supply").
- Dropped the custom domain (`docs/CNAME` removed); the site is served from the GitHub Pages address.
- SOURCES.md: CDC boil/bleach figures and the Ready.gov natural-gas line marked verified 2026-10-25.
