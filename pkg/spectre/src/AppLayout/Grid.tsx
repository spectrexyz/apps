import type { ReactNode } from "react"

import { useLayout } from "../styles"

export function Grid({ children }: { children: ReactNode[] }) {
  const layout = useLayout()

  const gridTemplateColumns = layout.below(500)
    ? "1fr"
    : layout.value({
      small: "repeat(2, 1fr)",
      medium: "repeat(2, 1fr)",
      large: "repeat(3, 1fr)",
      xlarge: "repeat(3, 1fr)",
    })

  const padding = layout.value({
    small: "0 3gu",
    xlarge: "0",
  })

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns,
        gap: "2.5gu",
        width: "100%",
        margin: "0 auto",
        padding,
      }}
    >
      {children.map((node, index) => (
        <div key={index} css={{ overflow: "hidden" }}>
          {node}
        </div>
      ))}
    </div>
  )
}
