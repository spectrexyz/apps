import { css } from "@emotion/react"

export function PanelDetails({ title, primary, secondary }) {
  return (
    <div
      css={css`
        max-width: 160gu;
        margin: 0 auto;
        padding-top: 7.5gu;
      `}
    >
      <h1
        css={css`
          padding-bottom: 5gu;
          font-size: 32px;
        `}
      >
        {title}
      </h1>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            width: 80gu;
          `}
        >
          {primary}
        </div>
        <div
          css={css`
            width: 52gu;
          `}
        >
          {secondary}
        </div>
      </div>
    </div>
  )
}
