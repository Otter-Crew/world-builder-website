// Turns each `<name>.full.png` + `<name>.rect.json` pair the capture spec wrote
// into `<name>.png`, then removes the pair. The spec measures instead of taking
// an element screenshot because WebKitWebDriver cannot shoot an element whose
// subtree overflows -- see `shotRect` in 99-marketing-capture.e2e.ts.
import { readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = process.argv[2];
const suffix = '.rect.json';
for (const file of (await readdir(dir)).filter((n) => n.endsWith(suffix))) {
  const name = file.slice(0, -suffix.length);
  const rect = JSON.parse(await readFile(path.join(dir, file), 'utf8'));
  const full = path.join(dir, `${name}.full.png`);
  console.log(`${name}: crop ${JSON.stringify(rect)}`);
  await sharp(full)
    .extract(rect)
    .toFile(path.join(dir, `${name}.png`));
  await rm(full);
  await rm(path.join(dir, file));
}
