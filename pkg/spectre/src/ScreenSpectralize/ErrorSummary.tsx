import type { ReactNode } from "react"

export function ErrorSummary({ children }: { children?: ReactNode }) {
  return children
    ? (
      <div
        css={({ colors, fonts }) => ({
          marginTop: "2gu",
          padding: "1gu 2gu",
          fontFamily: fonts.sans,
          fontSize: "14px",
          color: colors.warning,
          background: colors.warningSurface,
          borderRadius: "6px",
          "ul, p": {
            margin: "1gu 0",
          },
          "ul": {
            listStylePosition: "inside",
          },
        })}
      >
        {children}
      </div>
    )
    : null
}
