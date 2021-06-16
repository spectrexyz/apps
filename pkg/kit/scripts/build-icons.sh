#!/usr/bin/env bash

DIR_IN=icons
DIR_OUT=src/icons
TEMPLATE=icons/svgr-template.js
SVGO_CONF=$(cat <<EOF
{
  "plugins": {
    "removeXMLNS": true,
    "removeViewBox": false
  }
}
EOF
)

echo "Build icon components (${DIR_IN}/*.svg to ${DIR_OUT}/*.tsx)…"

rm -rf "$DIR_OUT" && mkdir -p "$DIR_OUT"

icons=$(find "$DIR_IN" -name '*.svg')

yarn run svgr \
  --template "$TEMPLATE" \
  --typescript \
  --svgo-config "$SVGO_CONF" \
  --svg-props width="{size}" \
  --svg-props height="{size}" \
  --replace-attr-values "#000={color}" \
  --out-dir "$DIR_OUT" \
  $icons

echo "Update $DIR_OUT/index.ts exports…"

for icon in $icons; do
  name=$(basename -s .svg $icon)
  echo "export { default as Icon${name} } from './${name}'" >> "$DIR_OUT/index.ts"
done

echo "Done."
