import { ReactNode } from "react"
import { ViewportProvider } from "@bpierre/use-viewport"
import { breakpoints } from "../styles"

const viewportBreakpoints = Object.entries(breakpoints).reduce(
  (o, [key, value]) => ({ ...o, [key]: value.width }),
  {}
)

export function AppViewport({ children }: { children: ReactNode }) {
  return (
    <ViewportProvider breakpoints={viewportBreakpoints}>
      {children}
    </ViewportProvider>
  )
}
