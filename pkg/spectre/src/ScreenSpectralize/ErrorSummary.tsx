import { css } from "@emotion/react"
import { ReactNode } from "react"

export function ErrorSummary({ children }: { children?: ReactNode }) {
  return children
    ? (
      <div
        css={({ colors, fonts }) =>
          css`
        margin-top: 2gu;
        padding: 1gu 2gu;
        font-family: ${fonts.families.sans};
        font-size: 14px;
        color: ${colors.warning};
        background: ${colors.warningSurface};
        border-radius: 6px;

        ul,
        p {
          margin: 1gu 0;
        }
        ul {
          list-style-position: inside;
        }
      `}
      >
        {children}
      </div>
    )
    : null
}
