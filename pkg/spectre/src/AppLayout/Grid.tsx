import type { ReactNode } from "react"

export function Grid({ children }: { children: ReactNode[] }) {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2.5gu",
        width: "160gu",
        margin: "0 auto",
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
