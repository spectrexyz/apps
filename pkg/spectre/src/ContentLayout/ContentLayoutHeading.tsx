import { css } from "@emotion/react"
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
    small: css`2gu 0`,
    medium: css`2gu 0`,
    large: css`1.5gu 0 1gu`,
  })
  return (
    <header>
      {!layout.below("medium")
        ? (
          <h1
            css={({ fonts }) =>
              css`
            font-family: ${fonts.families.mono};
            font-size: 18px;
            text-transform: uppercase;
          `}
          >
            {title}
          </h1>
        )
        : (
          <div
            css={css`
            height: 6gu;
          `}
          />
        )}
      <p
        css={({ colors, fonts }) =>
          css`
          padding: ${introPadding};
          font-family: ${fonts.families.sans};
          font-size: 14px;
          color: ${colors.contentDimmed};
        `}
      >
        {children}
      </p>
    </header>
  )
}
