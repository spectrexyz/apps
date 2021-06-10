import React, { useEffect, useMemo } from "react"
import { css } from "@emotion/react"
import { fonts, gu } from "uikit"
import { useLayout } from "../styles.js"
import LitepaperMdx from "./litepaper.mdx"

function useStyles() {
  const layout = useLayout()
  return useMemo(() => {
    if (layout.name === "small") {
      return {
        fonts: [28, 16],
        headerSpacing: [2 * gu, 6 * gu],
      }
    }
    if (layout.name === "medium") {
      return {
        fonts: [44, 20],
        headerSpacing: [2 * gu, 6 * gu],
      }
    }
    if (layout.name === "large") {
      return {
        fonts: [44, 20],
        headerSpacing: [2 * gu, 6 * gu],
      }
    }
    return {
      fonts: [64, 24],
      headerSpacing: [10 * gu, 10 * gu],
    }
  }, [layout])
}

export function Litepaper() {
  const styles = useStyles()
  const layout = useLayout()

  useEffect(() => {
    document.title = "SPECTRE / Litepaper"
    return () => {
      document.title = "SPECTRE"
    }
  }, [])

  return (
    <div
      css={css`
        display: flex;
        margin: 0 auto;
        max-width: 112gu;
        padding: ${layout.padding}px;
        padding-top: ${styles.headerSpacing[0]}px;
      `}
    >
      <div
        css={css`
          width: 100%;
          margin: 0 auto;
          padding-bottom: 20gu;
          & > h1 {
            padding-bottom: 4gu;
            font-size: ${styles.fonts[0]}px;
            text-align: center;
          }
          & > h1 + p {
            font-family: ${fonts.families.sans};
            font-size: ${styles.fonts[1]}px;
            padding-bottom: ${styles.headerSpacing[1]}px;
            text-align: center;
          }
          .main {
            display: flex;
            flex-direction: ${layout.name === "xlarge" ? "row" : "column"};
          }
          .content {
            overflow: hidden;
            width: 100%;
            flex-shrink: 1;
            font-family: ${fonts.families.sans};
            font-size: ${fonts.sizes.normalSans};
            line-height: 1.8;

            > p,
            > ul,
            > ol {
              margin: 0;
              padding: 0 0 3gu;
            }
            li {
              list-style-position: inside;
              padding: 0 0 1.5gu;
            }
            a {
              text-decoration: underline;
            }
            h3,
            h4 {
              font-family: ${fonts.families.mono};
              color: #fcfafa;
            }
            h3 {
              margin: 8gu 0 4gu;
            }
            h4 {
              margin: 2gu 0;
            }
          }
        `}
      >
        <LitepaperMdx layout={layout} />
      </div>
    </div>
  )
}
