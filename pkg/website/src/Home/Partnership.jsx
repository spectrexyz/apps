import React, { useMemo } from "react"
import { css } from "@emotion/react"
import { fonts, theme, gu } from "kit-legacy"
import { partnership } from "../content.jsx"
import { useLayout } from "../styles.js"

import background from "./partnership-background.webp"
import icons from "./partnership-icons.png"

function useStyles() {
  const layout = useLayout()
  return useMemo(() => {
    if (layout.name === "small") {
      return {
        fonts: [28, 16],
        iconsSize: 200,
        padding: [5 * gu, 3 * gu],
        titleSpacing: 1 * gu,
        iconsSpacing: 4 * gu,
      }
    }
    if (layout.name === "medium") {
      return {
        fonts: [44, 20],
        iconsSize: 264,
        padding: [5 * gu, 12 * gu],
        titleSpacing: 2 * gu,
        iconsSpacing: 7 * gu,
      }
    }
    if (layout.name === "large") {
      return {
        fonts: [44, 20],
        iconsSize: 264,
        padding: [6 * gu, 25 * gu],
        titleSpacing: 2 * gu,
        iconsSpacing: 8 * gu,
      }
    }
    return {
      fonts: [64, 24],
      iconsSize: 360,
      padding: [10 * gu, 32 * gu],
      titleSpacing: 5 * gu,
      iconsSpacing: 9 * gu,
    }
  }, [layout])
}

export function Partnership() {
  const { title, description } = partnership
  const styles = useStyles()
  const layout = useLayout()
  return (
    <section
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
        background: ${theme.secondary} url(${background}) no-repeat 0 0;
        background-size: cover;
      `}
    >
      <div
        css={css`
          max-width: ${layout.contentLarge
            ? `${layout.contentLarge}px`
            : "unset"};
          padding: ${styles.padding[0]}px ${styles.padding[1]}px;
          text-align: center;
          color: ${theme.lightContent};
        `}
      >
        <h1
          css={css`
            padding-bottom: ${styles.titleSpacing}px;
            color: ${theme.content};
            font-size: ${styles.fonts[0]}px;
            font-weight: 600;
          `}
        >
          {title}
        </h1>
        <div
          css={css`
            margin: 0 auto;
            font-family: ${fonts.families.sans};
            font-size: ${styles.fonts[1]}px;
            color: ${theme.lightContentAlt};
            a {
              color: ${theme.lightContentAlt};
              text-decoration: underline;
            }
          `}
        >
          {description}
        </div>

        <img
          alt=""
          src={icons}
          width="360"
          height="175"
          css={css`
            width: ${styles.iconsSize}px;
            height: auto;
            margin-top: ${styles.iconsSpacing}px;
          `}
        />
      </div>
    </section>
  )
}
