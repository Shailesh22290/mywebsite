// Convert images to WebP next to the originals: node scripts/to-webp.mjs <width> <files...>
import sharp from 'sharp';
import path from 'node:path';

const [width, ...files] = process.argv.slice(2);
for (const f of files) {
  const out = f.replace(/\.(png|jpe?g)$/i, '.webp');
  const info = await sharp(f).resize({ width: +width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  console.log(`${path.basename(out)}  ${(info.size / 1024).toFixed(0)} KB`);
}
