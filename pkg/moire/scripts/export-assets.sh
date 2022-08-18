#!/usr/bin/env bash

printf "Exporting assets from src/ to dist-assets/…"

rsync \
  -zarv \
  --quiet \
  --include="*/" \
  --include="*.svg" \
  --include="*.png" \
  --include="*.woff2" \
  --exclude="*" \
  --prune-empty-dirs \
  "src/" "dist-assets/"

printf " done.\n"
