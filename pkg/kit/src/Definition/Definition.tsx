import { ReactNode } from "react"

import { gu } from "../styles"

export function Definition(
  {
    content,
    spacing = 0.75 * gu,
    title,
    titleFontSize = "12px",
  }: {
    content: ReactNode
    spacing?: number
    title: ReactNode
    titleFontSize?: string
  },
) {
  return (
    <div
      css={({ fonts }) => ({
        overflow: "hidden",
        fontFamily: fonts.sans,
      })}
    >
      <div
        css={({ colors }) => ({
          paddingBottom: spacing,
          fontSize: titleFontSize,
          textTransform: "uppercase",
          color: colors.contentDimmed,
        })}
      >
        {title}
      </div>
      <div css={{ fontSize: "14px" }}>
        {content}
      </div>
    </div>
  )
}
