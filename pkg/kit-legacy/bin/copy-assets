#!/usr/bin/env node

// This wrapping script is needed because Yarn 2 doesn’t support executing
// non-JS files anymore.
// See https://github.com/evanw/esbuild/issues/467#issuecomment-717222742

const { spawnSync } = require("child_process")

const { status } = spawnSync(
  `${__dirname}/copy-assets.sh`,
  process.argv.slice(2),
  { stdio: "inherit" }
)

process.exitCode = status ?? 1
