import { forwardRef } from "react"
import { css } from "@emotion/react"

export const PanelSection = forwardRef(function PanelSection(
  { title, children },
  ref
) {
  return (
    <section
      ref={ref}
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
})
