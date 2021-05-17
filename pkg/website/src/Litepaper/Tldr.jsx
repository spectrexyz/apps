import React from "react"
import { css } from "@emotion/react"
import { theme } from "uikit"

import tldr from "./tldr.svg"

export function Tldr({ children }) {
  return (
    <section
      css={css`
        margin-top: 2gu;
        padding: 3gu;
        color: ${theme.contentAlt};
        background: ${theme.contrast + "BE"};
      `}
    >
      <h1
        css={css`
          margin-bottom: 2.5gu;
          padding-left: 6gu;
          background: url(${tldr}) no-repeat 0 50%;
          abbr {
            font-size: 24px;
            text-decoration: none;
          }
        `}
      >
        <abbr title="Too long; didn't read">TL;DR</abbr>
      </h1>
      <div
        css={css`
          font-size: 14px;
        `}
      >
        {children}
      </div>
    </section>
  )
}
