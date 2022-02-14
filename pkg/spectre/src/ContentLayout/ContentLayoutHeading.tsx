import { ReactNode } from "react"
import { useLayout } from "../styles"

type ContentLayoutHeadingProps = {
  title: ReactNode
  children: ReactNode
}

export function ContentLayoutHeading({
  title,
  children,
}: ContentLayoutHeadingProps) {
  const layout = useLayout()
  const introPadding = layout.value({
    small: "2gu 0",
    medium: "2gu 0",
    large: "1.5gu 0 1gu",
  })
  return (
    <header>
      {!layout.below("medium")
        ? (
          <h1
            css={({ fonts }) => ({
              fontFamily: fonts.families.mono,
              fontSize: "18px",
              textTransform: "uppercase",
            })}
          >
            {title}
          </h1>
        )
        : (
          <div
            css={{
              height: "6gu",
            }}
          />
        )}
      <p
        css={({ colors, fonts }) => ({
          padding: introPadding,
          fontFamily: fonts.families.sans,
          fontSize: "14px",
          color: colors.contentDimmed,
        })}
      >
        {children}
      </p>
    </header>
  )
}
