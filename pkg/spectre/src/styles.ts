import { useViewport } from "@bpierre/use-viewport"
import { gu, useTheme } from "kit"
import { useCallback, useMemo } from "react"

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

  const [layoutName, layout] = useMemo(
    () =>
      breakpointsByLargest.find(([name]) => above(name))
        ?? breakpointsByLargest[
          above("large") ? 0 : breakpointsByLargest.length - 1
        ],
    [above],
  )

  // Get a value depending on the current layout
  const value = useCallback(
    <T extends unknown>(values: {
      small: T
      medium?: T
      large?: T
      xlarge?: T
    }): T => {
      if (values.small === undefined) {
        throw new Error(
          "The “small” breakpoint is required with layout.value()",
        )
      }

      if (values[layoutName] !== undefined) {
        return values[layoutName] as T
      }

      let breakPointName = layoutName
      while (values[breakPointName] === undefined) {
        let breakpoint = closestBreakpoint(breakPointName)
        if (breakpoint === breakPointName) {
          return values.small
        }
        breakPointName = breakpoint
      }
      return values[breakPointName] as T
    },
    [layoutName],
  )

  return useMemo(
    () => ({ above, below, ...layout, name: layoutName, value }),
    [above, below, layout, layoutName, value],
  )
}

export function useLabelStyle(
  { size = "medium" }: ({ size?: "medium" | "small" }) = {},
) {
  const { colors, fonts } = useTheme()
  return useMemo(() => ({
    display: "block",
    paddingBottom: size === "small" ? 0 : "2gu",
    fontSize: size === "small" ? "12px" : "18px",
    fontFamily: size === "small" ? fonts.sans : fonts.mono,
    textTransform: "uppercase" as "uppercase",
    color: size === "small" ? colors.contentDimmed : colors.content,
  }), [colors, fonts, size])
}
