#!/usr/bin/env node
const path = require('path')
const copy = require('recursive-copy')

const destDir = process.argv[2]
const assetsDir = path.join(__dirname, '../dist-assets')

if (!destDir) {
  console.error("kit-copy-assets: please specify a directory path to copy the assets into.")
  process.exit(1)
}

async function main() {
  console.log(`syncing ${assetsDir} into ${destDir}…`)
  const results = await copy(assetsDir, destDir, {
    dot: true,
    overwrite: true,
  })
  console.info('Copied ' + results.length + ' files');
}

main()
