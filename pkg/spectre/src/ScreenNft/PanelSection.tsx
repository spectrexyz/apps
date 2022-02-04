import { css } from "@emotion/react"
import { forwardRef, ReactNode } from "react"

type PanelSectionProps = {
  title?: ReactNode
  children: ReactNode
}

export const PanelSection = forwardRef<HTMLElement, PanelSectionProps>(
  function PanelSection({ title, children }, ref) {
    return (
      <section
        ref={ref}
        css={css`
          padding-top: 8gu;
        `}
      >
        {title && (
          <h1
            css={({ colors }) =>
              css`
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
          css={({ fonts }) =>
            css`
            font-family: ${fonts.families.sans};
          `}
        >
          {children}
        </div>
      </section>
    )
  },
)
