import { gu } from "kit"
import { ReactNode } from "react"
import { useLayout } from "../styles"

export function CenteredContainer(
  {
    children,
    maxWidth = 160 * gu,
  }: {
    children: ReactNode
    maxWidth?: number
  },
) {
  const layout = useLayout()

  return (
    <div css={{ maxWidth, margin: "0 auto" }}>
      <div
        css={layout.value({
          small: { padding: "2gu" },
          medium: { padding: "0 3gu" },
          xlarge: {},
        })}
      >
        {children}
      </div>
    </div>
  )
}
