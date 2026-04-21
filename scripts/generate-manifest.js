// Walks the content/ folder and writes public/manifest.json.
// Run automatically via prestart / prebuild in package.json.

const fs   = require('fs');
const path = require('path');

const ROOT    = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'public', 'content');
const OUT     = path.join(ROOT, 'public', 'manifest.json');

if (!fs.existsSync(CONTENT)) {
  console.log('[manifest] content/ folder not found — skipping.');
  process.exit(0);
}

function walk(dir, relBase) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => !e.name.startsWith('.'))
    .sort((a, b) => {
      // folders before files, then alphabetical
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .map(entry => {
      const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        return {
          name: entry.name,
          path: rel,
          type: 'folder',
          children: walk(path.join(dir, entry.name), rel),
        };
      }
      return { name: entry.name, path: rel, type: 'file' };
    });
}

const tree = walk(CONTENT, '');
fs.writeFileSync(OUT, JSON.stringify(tree, null, 2));
console.log(`[manifest] Written ${OUT} (${tree.length} top-level entries)`);
