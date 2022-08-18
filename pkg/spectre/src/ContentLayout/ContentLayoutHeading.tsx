import type { ReactNode } from "react"

import { useAppScreen } from "../AppLayout/AppScreen"
import { useLayout } from "../styles"

export function ContentLayoutHeading({
  children,
  title,
}: {
  children: ReactNode
  title: ReactNode
}) {
  const layout = useLayout()
  const introPadding = layout.value({
    small: "2gu 0",
    medium: "2gu 0",
    large: "1.5gu 0 1gu",
  })
  const { compactBarHasExtraRow } = useAppScreen()
  return (
    <header>
      {!layout.below("medium")
        ? (
          <h1
            css={({ fonts }) => ({
              fontFamily: fonts.mono,
              fontSize: "18px",
              textTransform: "uppercase",
            })}
          >
            {title}
          </h1>
        )
        : compactBarHasExtraRow && <div css={{ height: "6gu" }} />}
      <p
        css={({ colors, fonts }) => ({
          padding: introPadding,
          fontFamily: fonts.sans,
          fontSize: "14px",
          color: colors.contentDimmed,
        })}
      >
        {children}
      </p>
    </header>
  )
}
