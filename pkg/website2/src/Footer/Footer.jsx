import React from "react"
import { css } from "@emotion/react"
import { theme } from "uikit"
import { useLayoutConstraints } from "../utils.js"
import { footerLinks } from "../content.js"

import logo from "./footer-logo.png"

export function Footer() {
  const [minWidth, maxWidth] = useLayoutConstraints()
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
      `}
    >
      <footer
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: ${maxWidth}px;
          min-width: ${minWidth}px;
          height: 17gu;
          padding: 0 10gu;
          img {
            display: block;
          }
        `}
      >
        <div>
          <img src={logo} width="125" height="32" alt="" />
        </div>
        <div
          css={css`
            &:before {
              content: "${"/".repeat(30)}";
              color: ${theme.secondary};
            }
          `}
        />
        <div
          css={css`
            display: flex;
            gap: 3.5gu;
            a {
              color: ${theme.content};
            }
          `}
        >
          {footerLinks.map(({ label, url }) => (
            <a key={url} href={url}>
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
