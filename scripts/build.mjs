// Renders /source/*.html to /print/*.pdf (US Letter, zero margins, backgrounds on),
// merges them into help-is-local-print-set.pdf,
// and copies all four PDFs into /docs for the Pages site. Fails loudly on any problem.
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sheets = ['001-the-first-72', '002-water-first', '003-carry-cards'];
const MIN_PX = 12;
const problems = [];

await mkdir(path.join(root, 'print'), { recursive: true });
const browser = await chromium.launch();

for (const name of sheets) {
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
  await page.goto(pathToFileURL(path.join(root, 'source', `${name}.html`)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const report = await page.evaluate((minPx) => {
    const sheet = document.body.querySelector('div');
    // Flex shrinking can squeeze content into the padding without any overflow showing,
    // so stop items shrinking and require each box's content to end inside its own padding.
    const boxes = getComputedStyle(sheet).display === 'grid' ? [...sheet.children] : [sheet];
    const squeezed = [];
    const spare = [];
    for (const box of boxes) {
      [...box.children].forEach((c) => (c.style.flexShrink = '0'));
      const last = box.lastElementChild.getBoundingClientRect().bottom;
      const limit = box.getBoundingClientRect().bottom - parseFloat(getComputedStyle(box).paddingBottom) - parseFloat(getComputedStyle(box).borderBottomWidth);
      if (last > limit + 0.5) squeezed.push(Math.ceil(last - limit));
      spare.push(Math.round((limit - last) * 10) / 10);
    }
    const fonts = ['Inter', 'Space Grotesk'].filter((f) => !document.fonts.check(`700 16px "${f}"`));
    const small = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode()); ) {
      if (!n.textContent.trim() || n.parentElement.closest('style,script')) continue;
      const px = parseFloat(getComputedStyle(n.parentElement).fontSize);
      if (px < minPx) small.add(`${px}px "${n.textContent.trim().slice(0, 40)}"`);
    }
    const clipped = [...sheet.querySelectorAll('div')].filter((e) => !e.querySelector('h1') && e.scrollHeight > e.clientHeight + 1).map((e) => `${e.scrollHeight - e.clientHeight}px in "${e.textContent.trim().replace(/\s+/g, ' ').slice(0, 30)}"`);
    return {
      clipped,
      squeezed,
      spare,
      overflowY: sheet.scrollHeight - sheet.clientHeight,
      overflowX: sheet.scrollWidth - sheet.clientWidth,
      docHeight: document.documentElement.scrollHeight,
      fonts,
      small: [...small],
    };
  }, MIN_PX);

  if (report.overflowY > 0 || report.overflowX > 0 || report.docHeight > 1056)
    problems.push(`${name}: overflow (y ${report.overflowY}px, x ${report.overflowX}px, doc ${report.docHeight}px)`);
  console.log(`${name}: spare above bottom padding ${report.spare.join(', ')}px`);
  report.squeezed.forEach((px) => problems.push(`${name}: content runs ${px}px past its bottom padding`));
  report.clipped.forEach((c) => problems.push(`${name}: content overflows its box by ${c}`));
  if (report.fonts.length) problems.push(`${name}: fonts not loaded: ${report.fonts.join(', ')}`);
  report.small.forEach((s) => problems.push(`${name}: text under ${MIN_PX}px: ${s}`));

  const pdf = await page.pdf({ format: 'Letter', margin: { top: 0, right: 0, bottom: 0, left: 0 }, printBackground: true, preferCSSPageSize: true });
  const pages = (await PDFDocument.load(pdf)).getPageCount();
  if (pages !== 1) problems.push(`${name}: PDF has ${pages} pages, expected 1`);
  await writeFile(path.join(root, 'print', `${name}.pdf`), pdf);
  await page.close();
}
await browser.close();

if (problems.length) {
  console.error('BUILD FAILED:\n- ' + problems.join('\n- '));
  process.exit(1);
}

const set = await PDFDocument.create();
for (const name of sheets) {
  const src = await PDFDocument.load(await readFile(path.join(root, 'print', `${name}.pdf`)));
  (await set.copyPages(src, [0])).forEach((p) => set.addPage(p));
}
await writeFile(path.join(root, 'print', 'help-is-local-print-set.pdf'), await set.save());
await mkdir(path.join(root, 'docs'), { recursive: true });
for (const f of [...sheets, 'help-is-local-print-set'])
  await copyFile(path.join(root, 'print', `${f}.pdf`), path.join(root, 'docs', `${f}.pdf`));
console.log(`OK: ${sheets.length} sheets, 1 page each; print set has ${set.getPageCount()} pages.`);
