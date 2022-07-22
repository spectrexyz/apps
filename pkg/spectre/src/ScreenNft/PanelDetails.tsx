import type { ReactNode } from "react"

import { useLayout } from "../styles"

export function PanelDetails({ primary, secondary }: {
  primary: ReactNode
  secondary: ReactNode
}) {
  const layout = useLayout()

  const containerStyles = layout.value({
    small: { padding: "2gu" },
    medium: {
      display: "grid",
      gridTemplateColumns: "repeat(2, calc(50% - 4gu))",
      justifyContent: "space-between",
      gap: "8gu",
      width: "100%",
      padding: "0 3gu",
    },
    xlarge: {
      display: "grid",
      gridTemplateColumns: "72gu 72gu",
      justifyContent: "space-between",
      width: "100%",
    },
  })

  return (
    <div
      css={{
        maxWidth: "160gu",
        margin: "0 auto",
        paddingTop: layout.below("xlarge") ? "2gu" : "8gu",
      }}
    >
      <div css={containerStyles}>
        <div>
          {primary}
        </div>
        <div>
          {secondary}
        </div>
      </div>
    </div>
  )
}
