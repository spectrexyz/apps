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
  small: { width: 45 * gu, padding: 3 * gu },
  medium: { width: 96 * gu, padding: 5 * gu },
  large: { width: 120 * gu, padding: 8 * gu },
  xlarge: {
    width: 180 * gu,
    padding: 0,
    content: 138 * gu,
    contentLarge: 160 * gu,
  },
}

export function useLayout() {
  const { above } = useViewport()

  return useMemo(() => {
    const breakpointsByLargest = Object.entries(breakpoints).reverse()

    const [name, layout] =
      breakpointsByLargest.find(([name]) => above(name)) ??
      breakpointsByLargest[
        above("xlarge") ? 0 : breakpointsByLargest.length - 1
      ]

    return { ...layout, name }
  }, [above])
}
