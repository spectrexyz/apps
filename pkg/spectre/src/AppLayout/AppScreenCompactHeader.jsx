import { css } from "@emotion/react"

export function AppScreenCompactHeader({ start, title, end }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        `}
      >
        {start && (
          <div
            css={css`
              display: flex;
              align-items: center;
              height: 100%;
            `}
          >
            {start}
          </div>
        )}
        <div
          css={({ fonts }) => css`
            font-family: ${fonts.families.mono};
            font-size: 16px;
            text-transform: uppercase;
          `}
        >
          {title}
        </div>
      </div>
      {end && (
        <div
          css={css`
            padding-right: 2gu;
          `}
        >
          {end}
        </div>
      )}
    </div>
  )
}
