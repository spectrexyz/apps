import type { ReactNode } from "react"

import { useLayout } from "../styles"

export function ContentLayout({
  children,
}: {
  children: ReactNode
}) {
  const layout = useLayout()
  const flexGap = layout.value({
    small: "3.5gu",
    xlarge: "5gu",
  })
  const flexDirection = layout.value({
    small: "column",
    medium: "row",
  })

  return (
    <div
      css={{
        display: "flex",
        gap: flexGap,
        flexDirection: flexDirection as "column" | "row",
        width: "100%",
      }}
    >
      <div
        css={({ colors }) =>
          layout.below("medium")
            ? {
              width: "100%",
            }
            : {
              width: "100%",
              padding: "4.5gu 5gu 3gu",
              background: colors.background,
              border: `2px solid ${colors.contrast}`,
            }}
      >
        {children}
      </div>
    </div>
  )
}
