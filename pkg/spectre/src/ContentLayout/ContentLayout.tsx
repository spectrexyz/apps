import { css } from "@emotion/react"
import { ReactNode } from "react"
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
  const flexDirection = layout.value({
    small: "column",
    medium: "row",
  })

  return (
    <div
      css={css`
        display: flex;
        gap: ${flexGap};
        flex-direction: ${flexDirection};
        width: 100%;
      `}
    >
      <div
        css={({ colors }) =>
          layout.below("medium")
            ? css`
                width: 100%;
              `
            : css`
                width: 100%;
                padding: 4.5gu 5gu 3gu;
                background: ${colors.background};
                border: 2px solid ${colors.contrast};
              `}
      >
        {children}
      </div>
    </div>
  )
}
