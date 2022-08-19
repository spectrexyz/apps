import type { Property as CssP } from "csstype"
import type { ReactNode } from "react"

import { gu } from "moire"

export function CenteredContainer(
  {
    children,
    maxWidth = 160 * gu,
  }: {
    children: ReactNode
    maxWidth?: CssP.MaxWidth | number | null
  },
) {
  return (
    <div
      css={{
        width: "100%",
        maxWidth: maxWidth ?? "initial",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  )
}
