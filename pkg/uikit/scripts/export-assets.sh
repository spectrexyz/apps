#!/usr/bin/env bash

printf "Exporting assets (src/ to dist-assets/)…"

rsync \
  -zarv \
  --quiet \
  --include="*/" \
  --include="*.svg" \
  --include="*.png" \
  --include="*.ttf" \
  --exclude="*" \
  --prune-empty-dirs \
  "src/" "dist-assets/"

printf " done.\n"
