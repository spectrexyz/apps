import {
  IsometricCanvas,
  IsometricRectangle,
  PlaneView,
} from "@elchininet/isometric"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useDimensions from "react-cool-dimensions"
import { useSpring, useSpringRef } from "react-spring"
import { springs } from "../styles"
import { useTheme } from "../Theme"
import { list, raf, shuffle } from "../utils"

const DISTRIBUTION_COLORS = [
  "#6584E0",
  "#C0BBFF",
  "#F8FFA6",
  "#A0A8C2",
  "#F597F8",
]
const SINGLE_VALUE_COLOR = DISTRIBUTION_COLORS[2]

const RATIO = 1.3

function distributionColor(
  groupIndex: number,
  valuesFilled: number[],
  lastSlotEmpty: boolean,
  emptyColor: string,
): string {
  // Emty slot
  if (lastSlotEmpty && groupIndex === valuesFilled.length - 1) {
    return emptyColor
  }

  // A specific color is used for single group distributions
  if (
    groupIndex === 0 && (
      valuesFilled.length === 1
      || lastSlotEmpty && valuesFilled.length === 2
    )
  ) {
    return SINGLE_VALUE_COLOR
  }

  // Otherwise we rotate on DISTRIBUTION_COLORS
  return DISTRIBUTION_COLORS[groupIndex % DISTRIBUTION_COLORS.length]
}

// Fill the distribution array so the total is always 100.
// Cuts extra values if necessary.
export function fillDistribution(values: number[]) {
  const filled = []
  let total = 0
  for (const value of values) {
    total += value
    if (total > 100) {
      filled.push(value - total + 100)
      return filled
    }
    filled.push(value)
  }
  if (total < 100) {
    filled.push(100 - total)
  }
  return filled
}

function makeRect(
  planeView: PlaneView,
  x: number,
  y: number,
  color: string,
  strokeColor: string,
): IsometricRectangle {
  const rect = new IsometricRectangle({
    height: 1,
    width: 1,
    planeView,
    fillColor: color,
    strokeColor,
  })
  rect.left = x
  rect.top = y
  return rect
}

function makeCube(
  index: number,
  baseColor: string,
  strokeColor: string,
): IsometricRectangle[] {
  const col = 10 - (index % 10)
  const row = Math.floor(index / 10)

  const x = row + col - 10
  const y = col - 4.5

  const rects: IsometricRectangle[] = []

  // top
  rects.push(makeRect(PlaneView.TOP, x, y, baseColor, strokeColor))

  // left
  if (row === 9) {
    rects.push(makeRect(PlaneView.SIDE, x + 1, y - 1, baseColor, strokeColor))
  }

  // right
  if (col === 1) {
    rects.push(makeRect(PlaneView.FRONT, x - 1, y - 2, baseColor, strokeColor))
  }

  return rects
}

type DistributionProps = {
  values: number[]
}

function useSpringProgress() {
  const progress = useRef({ value: 0, animating: true })
  const springRef = useSpringRef()

  useSpring({
    ref: springRef,
    config: springs.sluggish,
    from: { progress: 0 },
    to: { progress: 1 },
    onChange({ value }) {
      progress.current.value = value.progress
    },
    onRest() {
      progress.current.animating = false
    },
    onStart() {
      progress.current.animating = true
    },
  })

  return [
    progress,
    useCallback(() => {
      springRef.current[0].stop(true)
      progress.current.value = 0
      springRef.current[0].set({ progress: 0 })
      springRef.current[0].start()
    }, []),
  ]
}

export function Distribution({
  values = [100],
}: DistributionProps): JSX.Element {
  const [container, setContainer] = useState<HTMLDivElement>(null)
  const { colors } = useTheme()
  const bounds = useDimensions()
  const valuesFilled = useMemo(() => fillDistribution(values), [values])
  const isoCanvas = useRef<null | IsometricCanvas>(null)
  const lastSlotEmpty = valuesFilled.length > values.length

  const [reveal, restartReveal] = useSpringProgress()

  useEffect(() => {
    if (values) {
      restartReveal()
    }
  }, [values])

  const { width } = bounds
  useEffect(() => {
    if (!container) return null

    const _width = width ?? 0
    isoCanvas.current = new IsometricCanvas({
      backgroundColor: "transparent",
      container,
      height: _width / RATIO,
      scale: _width * 0.055,
      width: _width,
    })

    return () => {
      isoCanvas.current.clear()
      isoCanvas.current.getElement().remove()
      isoCanvas.current = null
    }
  }, [container, width])

  useEffect(() => {
    if (!isoCanvas.current) return

    const { surfaces, surfacesToAnimate } = valuesFilled.reduce<{
      cubesIndex: number
      surfaces: IsometricRectangle[]
      surfacesToAnimate: [IsometricRectangle, string][]
    }>(
      ({ cubesIndex, surfaces, surfacesToAnimate }, groupSize, groupIndex) => {
        const groupSurfaces = list(groupSize).flatMap((i) => {
          return makeCube(cubesIndex + i, colors.accent, colors.accent)
        })

        const groupColor = distributionColor(
          groupIndex,
          valuesFilled,
          lastSlotEmpty,
          colors.background,
        )

        const groupSurfacesToAnimate = groupSurfaces.map(
          (surface) =>
            [
              surface,
              surface.planeView === "TOP" ? groupColor : colors.background,
            ] as [IsometricRectangle, string],
        )

        return {
          surfaces: [...surfaces, ...groupSurfaces],
          surfacesToAnimate: [...surfacesToAnimate, ...groupSurfacesToAnimate],
          cubesIndex: cubesIndex + groupSize,
        }
      },
      { cubesIndex: 0, surfaces: [], surfacesToAnimate: [] },
    )

    isoCanvas.current.addChildren(...surfaces)

    const surfacesReveal = shuffle([...surfacesToAnimate])

    const stopAnimation = raf(() => {
      if (!reveal.current.animating) {
        stopAnimation()
        return
      }

      const progressSlice = (arr) =>
        arr.slice(
          0,
          Math.round(reveal.current.value * arr.length),
        )

      const nextBatch = progressSlice(surfacesReveal)

      for (const [surface, color] of nextBatch) {
        surface.fillColor = color
      }
    })

    return () => {
      stopAnimation()
      isoCanvas.current.clear()
    }
  }, [colors, lastSlotEmpty, reveal, valuesFilled])

  return (
    <div ref={bounds.observe} css={{ width: "100%" }}>
      <div ref={setContainer} />
    </div>
  )
}
