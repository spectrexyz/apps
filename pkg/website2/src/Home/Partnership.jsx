import React from "react"
import { css } from "@emotion/react"
import { fonts, theme, gu } from "uikit"
import { partnership } from "../content.js"
import { formatLineBreaks } from "../utils.js"

import background from "./partnership.png"
import icons from "./partnership-icons.png"

export function Partnership() {
  const { title, description } = partnership
  return (
    <section
      css={css`
        width: 100%;
        height: 673px;
        padding-top: 10gu;
        text-align: center;
        color: ${theme.lightContent};
        background: ${theme.lightBackground} url(${background}) no-repeat 0 0;
        background-size: cover;
      `}
    >
      <h1
        css={css`
          padding-bottom: 5gu;
          color: ${theme.lightContentAlt};
          font-size: ${fonts.sizes.xxlarge};
          font-weight: 600;
        `}
      >
        {title}
      </h1>
      <p
        css={css`
          padding-bottom: 10gu;
          font-family: ${fonts.families.sans};
          font-size: ${fonts.sizes.largeSans};
          white-space: pre-wrap;
        `}
      >
        {formatLineBreaks(description)}
      </p>

      <img alt="" src={icons} width="397" height="248" />
    </section>
  )
}
