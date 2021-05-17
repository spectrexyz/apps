import React from "react"
import { css } from "@emotion/react"
import { GLMoire, theme, useMeasure } from "uikit"
import { kebabCase } from "../utils.js"

export function H2({ label }) {
  const [ref, bounds] = useMeasure()
  return (
    <h2
      id={kebabCase(label)}
      title={label}
      css={css`
        margin: 8.5gu 0 5gu;
        padding-top: 1.5gu;
        &:first-of-type {
          margin-top: -1.5gu;
        }
      `}
    >
      <span
        ref={ref}
        css={css`
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 5gu;
          padding: 0 3gu;
          text-transform: uppercase;
          font-size: 24px;
          font-weight: 600;
          color: ${theme.background};
        `}
      >
        <span
          css={css`
            position: relative;
            z-index: 2;
          `}
        >
          {label}
        </span>
        <span
          css={css`
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.75;
          `}
        >
          {bounds.width > 0 && bounds.height > 0 && (
            <GLMoire
              width={bounds.width}
              height={bounds.height}
              linesColor={theme.lightBackground}
              backgroundColor={theme.background}
              scale={4}
            />
          )}
        </span>
      </span>
    </h2>
  )
}
