import React, { useMemo } from "react"
import { css } from "@emotion/react"
import { gu, theme } from "uikit"
import { useLayout } from "../styles.js"
import { footerLinks } from "../content.jsx"
import { Subscribe } from "../Subscribe.jsx"

import logo from "./footer-logo.png"

function useStyles() {
  const { name } = useLayout()
  return useMemo(() => {
    if (name === "small") {
      return {
        slashes: 20,
      }
    }
    if (name === "medium") {
      return {
        slashes: 15,
      }
    }
    if (name === "large") {
      return {
        slashes: 25,
      }
    }
    return {
      slashes: 30,
    }
  }, [name])
}

export function Footer() {
  const layout = useLayout()
  const styles = useStyles()
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: ${layout.contentLarge
          ? `${layout.contentLarge}px`
          : "unset"};
        margin: 0 auto;
        padding: 0 ${layout.padding}px;
      `}
    >
      <Subscribe />
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
            flex-direction: ${layout.name === "small" ? "column" : "row"};
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: ${layout.name === "small" ? "auto" : `${17 * gu}px`};
            padding-bottom: ${layout.name === "small" ? `${5 * gu}px` : "0"};
            gap: ${layout.name === "small" ? `${3 * gu}px` : "0"};
            img {
              display: block;
            }
          `}
        >
          <a href="/">
            <img src={logo} width="130" height="44" alt="Spectre" />
          </a>
          <div
            css={css`
              position: ${layout.name === "small" ? "static" : "absolute"};
              top: 50%;
              left: 50%;
              transform: ${layout.name === "small"
                ? "none"
                : "translate(-50%, -50%)"};
              &:before {
                content: "${"/".repeat(styles.slashes)}";
                color: ${theme.secondary};
              }
            `}
          />
          <div
            css={css`
              display: grid;
              grid-auto-flow: column;
              gap: ${layout.name === "small" ? css`6gu` : css`3.5gu`};
              padding-top: ${layout.name === "small" ? css`1gu` : "0"};
              a {
                color: ${theme.content};
              }
            `}
          >
            {footerLinks.map(({ label, url }) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
