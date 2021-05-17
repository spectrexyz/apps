import React from "react"
import { css } from "@emotion/react"
import { theme } from "uikit"

export function Illustration({ description, width, height, src, alt }) {
  return (
    <div
      css={css`
        opacity: 0.75;
        width: 100%;
        margin: 1gu 0 5gu;
        background: ${theme.contrast};
      `}
    >
      <a href={src} target="_blank" rel="noreferrer">
        <img
          width={width}
          height={height}
          src={src}
          alt={alt}
          css={css`
            display: block;
            width: 100%;
            height: auto;
          `}
        />
      </a>
      {description && (
        <p
          css={css`
            padding: 0 4gu 4gu;
            font-size: 14px;
            color: ${theme.secondary};
          `}
        >
          {description}
        </p>
      )}
    </div>
  )
}
