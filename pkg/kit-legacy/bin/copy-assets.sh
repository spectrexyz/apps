#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Please specify a directory path to copy the assets into"
  exit 1
fi

assets_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../dist-assets" &> /dev/null && pwd)"
dest_dir="$(cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"

echo "syncing $assets_dir into $dest_dir…"

mkdir -p $dest_dir

rsync \
  -zarv \
  --quiet \
  --prune-empty-dirs \
  "$assets_dir/" "$dest_dir"

echo "done."
