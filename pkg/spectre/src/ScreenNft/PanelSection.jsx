import { css } from "@emotion/react"

export function PanelSection({ title, children }) {
  return (
    <section
      css={css`
        padding-top: 8gu;
      `}
    >
      {title && (
        <h1
          css={({ colors }) => css`
            padding-bottom: 2gu;
            font-size: 20px;
            text-transform: uppercase;
            color: ${colors.contentHeading2};
          `}
        >
          {title}
        </h1>
      )}
      <div
        css={({ fonts }) => css`
          font-family: ${fonts.families.sans};
        `}
      >
        {children}
      </div>
    </section>
  )
}
