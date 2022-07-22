import type { ReactNode } from "react"

import { gu } from "kit"

export function CenteredContainer(
  {
    children,
    maxWidth = 160 * gu,
  }: {
    children: ReactNode
    maxWidth?: number | null
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
