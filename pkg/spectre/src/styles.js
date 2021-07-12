import { gu } from "kit"
import { useMemo } from "react"
import { useViewport } from "use-viewport"

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

export const breakpoints = {
  small: { width: 45 * gu },
  medium: { width: 96 * gu },
  large: { width: 120 * gu },
}

export function useLayout() {
  const { above, below } = useViewport()

  return useMemo(() => {
    const breakpointsByLargest = Object.entries(breakpoints).reverse()

    const [name, layout] =
      breakpointsByLargest.find(([name]) => above(name)) ??
      breakpointsByLargest[
        above("large") ? 0 : breakpointsByLargest.length - 1
      ]

    return { above, below, ...layout, name }
  }, [above, below])
}
