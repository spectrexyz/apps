import type { ReactNode } from "react"

import { Children, createContext, useContext } from "react"
import { useLayout } from "../styles"

const GridContext = createContext<null | true>(null)

export function Grid(
  {
    children,
    className,
  }: {
    children: ReactNode
    className?: string
  },
) {
  const layout = useLayout()

  const gridTemplateColumns = layout.below(500)
    ? "1fr"
    : layout.value({
      small: "repeat(2, 1fr)",
      large: "repeat(3, 1fr)",
      xlarge: "repeat(3, 1fr)",
    })

  const padding = layout.value({
    small: "0 3gu",
    xlarge: "0",
  })

  return (
    <GridContext.Provider value={true}>
      <div
        className={className}
        css={{
          display: "grid",
          gridTemplateColumns,
          gap: "3gu",
          width: "100%",
          margin: "0 auto",
          padding,
        }}
      >
        {Children.map(
          children,
          (node, index) => (
            <div key={index} css={{ overflow: "hidden" }}>
              {node}
            </div>
          ),
        )}
      </div>
    </GridContext.Provider>
  )
}

export function useGrid() {
  return useContext(GridContext)
}
