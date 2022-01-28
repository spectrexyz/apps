import { ReactNode } from "react"
import { css } from "@emotion/react"
import { useLayout } from "../styles"

type ContentLayoutProps = {
  children: ReactNode
}

export function ContentLayout({ children }: ContentLayoutProps) {
  const layout = useLayout()
  const flexGap = layout.value({
    small: css`3.5gu`,
    xlarge: css`5gu`,
  })

  return (
    <div
      css={css`
        display: flex;
        gap: ${flexGap};
        flex-direction: ${layout.below("medium") ? "column" : "row"};
        width: 100%;
      `}
    >
      <div
        css={({ colors }) => css`
          width: 100%;
          padding: ${layout.below("medium") ? "0" : css`4.5gu 5gu 3gu`};
          background: ${layout.below("medium") ? "none" : colors.background};
        `}
      >
        {children}
      </div>
    </div>
  )
}
