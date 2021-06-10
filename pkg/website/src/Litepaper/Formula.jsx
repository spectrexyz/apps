import React from "react"
import { css } from "@emotion/react"
import { fonts } from "kit-legacy"

export function Formula({ color, value }) {
  return (
    <pre
      css={css`
        overflow-x: auto;
        width: 100%;
        margin: 1gu 0 5gu;
        padding: 1gu 2gu;
        color: ${color};
        font-family: ${fonts.families.mono};
        font-size: 13px;
        background: #343C50BE;
      `}
    >
      <code>{value}</code>
    </pre>
  )
}
