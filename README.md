# Help Is Local — Ready When Needed

Free printable emergency-readiness sheets. Community Series 001–002, by The Composition Group LLC / Fancy Ape.

| Sheet | What it is |
|---|---|
| 001 · The First 72 | Household readiness and response for the first three days |
| 002 · Water First | How much water to store, and how to make it safe |
| 003 · Carry Cards | Four wallet cards with the key numbers and your contacts |

**Download:** the PDFs are in [`print/`](print/) and on the site in [`docs/`](docs/) (GitHub Pages).

## Who it's for

Anyone. Households, neighbors, tenants, schools, congregations, libraries, mutual-aid groups. Nothing here needs internet, an app, or an account once printed.

## How to print

1. Open a PDF. Use `help-is-local-print-set.pdf` for all three sheets.
2. Print on **US Letter**, at **100% / "Actual size"** (not "Fit to page").
3. Any home printer works. Black and white is fine.
4. Fill it in on a calm day. Keep it where you keep your water. Give one to a neighbor.
5. Cut the Carry Cards along the dashed lines.

## How to reuse

Free to copy, print, share and adapt under [CC BY 4.0](LICENSE). Credit: **"Help Is Local by The Composition Group LLC / Fancy Ape."** If you change the sheets, say so, and re-check any safety instruction against [SOURCES.md](SOURCES.md) before sharing.

## Local officials come first

These sheets are general guidance. If local officials give instructions for your area (evacuation, shelter, boil-water or do-not-drink notices), follow them instead.

## Build

The HTML masters are in [`source/`](source/). To regenerate the PDFs (and the copies in `docs/`):

```
npm install
npm run build
```

Requires Node and Playwright's Chromium, and internet access for the Inter and Space Grotesk web fonts. The build fails if any sheet overflows one US Letter page, has text under 12px, or if fonts don't load.

## Files

- `source/` HTML masters
- `print/` generated PDFs
- `docs/` GitHub Pages site (plain page, no tracking, cookies, forms or accounts)
- `SOURCES.md` where each instruction comes from
- `CHANGELOG.md` revision history
