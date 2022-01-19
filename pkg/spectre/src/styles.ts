import { useCallback, useMemo } from "react"
import { useViewport } from "@bpierre/use-viewport"
import { gu } from "kit"

export const springs = {
  appear: {
    mass: 0.5,
    tension: 400,
    friction: 30,
  },
  slowAppear: {
    mass: 1,
    tension: 20,
    friction: 26,
  },
}

type Breakpoint = "small" | "medium" | "large" | "xlarge"
type BreakpointValue = { width: number }

export const breakpoints: {
  small: BreakpointValue
  medium: BreakpointValue
  large: BreakpointValue
  xlarge: BreakpointValue
} = {
  small: { width: 45 * gu }, // from 360px
  medium: { width: 96 * gu }, // above 768px
  large: { width: 120 * gu }, // above 960px
  xlarge: { width: 180 * gu }, // above 1440px
}

const breakpointsByLargest = Object.entries(breakpoints).reverse() as Array<
  [Breakpoint, { width: number }]
>

function closestBreakpoint(name: Breakpoint): Breakpoint {
  const index = breakpointsByLargest.findIndex(([_name]) => _name === name)
  if (index === -1) {
    throw new Error(`The breakpoint doesn’t seem to exist: ${name}`)
  }
  return index === breakpointsByLargest.length - 1
    ? name
    : breakpointsByLargest[index + 1][0]
}

export function useLayout() {
  const { above, below } = useViewport()

  const [name, layout] = useMemo(
    () =>
      breakpointsByLargest.find(([name]) => above(name)) ??
      breakpointsByLargest[
        above("large") ? 0 : breakpointsByLargest.length - 1
      ],
    [above]
  )

  // Get a value depending on the current layout
  const value = useCallback(
    <T extends unknown>(values: { small: T; medium?: T; large?: T; xlarge?: T }): T | undefined => {
      if (values.small === undefined) {
        throw new Error(
          "The “small” breakpoint is required with layout.value()"
        )
      }

      if (values[name] !== undefined) {
        return values[name]
      }

      let fallback = name
      while (values[fallback] === undefined) {
        let breakpoint = closestBreakpoint(fallback)
        if (breakpoint === fallback) {
          return undefined
        }
        fallback = breakpoint
      }
      return values[fallback]
    },
    [name]
  )

  return useMemo(
    () => ({ above, below, ...layout, name, value }),
    [above, below, layout, name, value]
  )
}
