import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const inPath = path.resolve('public/images/logo.png')
const backupPath = path.resolve('public/images/logo-original.png')
const outPath = inPath

const { data, info } = await sharp(inPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

// Heuristic: treat near-white pixels as background and fade alpha close to white.
// This works well for logos exported on a solid white backdrop.
for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const a = data[i + 3]

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // Only target pixels that are both bright and neutral-ish (avoid nuking pale colors).
  if (min >= 235 && max >= 235 && max - min <= 8) {
    // Map [235..255] => alpha [a..0] with a smooth fade.
    const t = Math.min(1, Math.max(0, (max - 235) / 20))
    data[i + 3] = Math.round(a * (1 - t))
  }
}

try {
  await fs.access(backupPath)
} catch {
  await fs.copyFile(inPath, backupPath)
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(outPath)

console.log(`Wrote transparent logo to ${outPath}`)
console.log(`Backup (original) at ${backupPath}`)
