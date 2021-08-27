import { ViewportProvider } from "@bpierre/use-viewport"
import { breakpoints } from "../styles.js"

const viewportBreakpoints = Object.entries(breakpoints).reduce(
  (o, [key, value]) => ({ ...o, [key]: value.width }),
  {}
)

export function AppViewport({ children }) {
  return (
    <ViewportProvider breakpoints={viewportBreakpoints}>
      {children}
    </ViewportProvider>
  )
}
