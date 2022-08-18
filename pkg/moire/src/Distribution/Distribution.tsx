import {
  IsometricCanvas,
  IsometricRectangle,
  PlaneView,
} from "@elchininet/isometric"
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import useDimensions from "react-cool-dimensions"
import { useSpring, useSpringRef } from "react-spring"
import { springs } from "../styles"
import { useTheme } from "../Theme"
import { list, raf, shuffle } from "../utils"

type Mode = "percentage" | "distribution"

type Cube =
  | [IsometricRectangle]
  | [IsometricRectangle, IsometricRectangle]
  | [IsometricRectangle, IsometricRectangle, IsometricRectangle]

const DEFAULT_EMPTY_COLOR = "#58FFCA"

const DEFAULT_DISTRIBUTION_COLORS = [
  "#6584E0",
  "#C0BBFF",
  "#F8FFA6",
  "#A0A8C2",
  "#F597F8",
]
const DEFAULT_PERCENTAGE_COLOR = DEFAULT_DISTRIBUTION_COLORS[2]

const RATIO = 4 / 3

function colorDefault(
  groupIndex: number,
  mode: Mode,
): string {
  if (mode === "percentage") {
    return DEFAULT_PERCENTAGE_COLOR
  }
  return DEFAULT_DISTRIBUTION_COLORS[
    groupIndex % DEFAULT_DISTRIBUTION_COLORS.length
  ]
}

// Fill the distribution array so the total is always 100.
// Cuts extra values if necessary.
export function correctDistribution(values: number[]) {
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
): Cube {
  const col = 10 - (index % 10)
  const row = Math.floor(index / 10)

  const x = row + col - 10
  const y = col - 4.5

  // top
  const cube: Cube = [
    makeRect(PlaneView.TOP, x, y, baseColor, strokeColor),
  ]

  // left
  if (row === 9) {
    cube.push(makeRect(PlaneView.SIDE, x + 1, y - 1, baseColor, strokeColor))
  }

  // right
  if (col === 1) {
    cube.push(makeRect(PlaneView.FRONT, x - 1, y - 2, baseColor, strokeColor))
  }

  return cube
}

function useSpringProgress(): [
  RefObject<{ value: number; running: boolean }>,
  () => void,
] {
  const progress = useRef({ value: 0, running: true })
  const springRef = useSpringRef()

  useSpring<{ progress: number }>({
    ref: springRef,
    config: springs.sluggish,
    from: { progress: 0 },
    to: { progress: 1 },
    onChange({ value }: { value: { progress: number } }) {
      progress.current.value = value.progress
    },
    onRest() {
      progress.current.running = false
    },
    onStart() {
      progress.current.running = true
    },
  })

  const restart = useCallback(() => {
    springRef.current[0].stop(true)
    progress.current.value = 0
    springRef.current[0].set({ progress: 0 })
    void springRef.current[0].start()
  }, [springRef])

  return [progress, restart]
}

function surfaceEntries(
  values: number[],
  cubes: Cube[],
  mode: Mode,
  color: ColorFn,
  colorEmpty: string,
) {
  const surfaceEntries: Array<[IsometricRectangle, string]> = []
  let cubesIndex = 0

  for (const [groupIndex, groupSize] of values.entries()) {
    const empty = mode === "percentage" && groupIndex === 1
    const groupColor = empty ? colorEmpty : color(groupIndex, mode)

    const groupSurfaceEntries = cubes.slice(
      cubesIndex,
      cubesIndex + groupSize,
    ).flat().map((surface) =>
      [surface, groupColor] as [IsometricRectangle, string]
    )

    surfaceEntries.push(...groupSurfaceEntries)
    cubesIndex += groupSize
  }

  return surfaceEntries
}

type ColorFn = typeof colorDefault

type DistributionProps = {
  color?: ColorFn
  colorEmpty?: string
  startFromEmpty?: boolean
  values: number[]
}

export function Distribution({
  color = colorDefault,
  colorEmpty = DEFAULT_EMPTY_COLOR,
  startFromEmpty = true,
  values: valuesNonCorrected = [100],
}: DistributionProps): JSX.Element {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const { colors } = useTheme()
  const bounds = useDimensions()
  const isoCanvas = useRef<null | IsometricCanvas>(null)
  const isoCubes = useRef<Cube[]>([])

  const [mode, values] = useMemo<[Mode, number[]]>(() => [
    valuesNonCorrected.length === 1 ? "percentage" : "distribution",
    correctDistribution(valuesNonCorrected),
  ], [valuesNonCorrected])

  const [reveal, restartReveal] = useSpringProgress()
  useEffect(() => {
    if (values) {
      restartReveal()
    }
  }, [restartReveal, values])

  const { width } = bounds
  useEffect(() => {
    if (!container) return

    isoCanvas.current = new IsometricCanvas({
      backgroundColor: "transparent",
      container,
      height: Math.round(width / RATIO),
      scale: width * 0.055,
      width,
    })

    isoCubes.current = list(100, (index) => (
      makeCube(index, colorEmpty, colors.background)
    ))

    isoCanvas.current.addChildren(...isoCubes.current.flat())

    return () => {
      if (isoCanvas.current) {
        isoCanvas.current.clear()
        isoCanvas.current.getElement().remove()
      }
      isoCanvas.current = null
      isoCubes.current = []
    }
  }, [colorEmpty, colors, container, width])

  useEffect(() => {
    if (!isoCanvas.current) return

    const entries = shuffle(surfaceEntries(
      values,
      isoCubes.current,
      mode,
      color,
      colorEmpty,
    ))

    const progressSlice = (arr: ReturnType<typeof surfaceEntries>) => {
      return reveal.current?.value === undefined
        ? arr
        : arr.slice(0, Math.round(reveal.current.value * arr.length))
    }

    const stopAnimation = raf(() => {
      if (!reveal.current?.running) {
        stopAnimation()
        return
      }
      for (const [surface, color] of progressSlice(entries)) {
        surface.fillColor = color
      }
    })

    return () => {
      stopAnimation()

      if (startFromEmpty) {
        entries.forEach(([surface]) => {
          surface.fillColor = colorEmpty
        })
      }
    }
  }, [color, colorEmpty, mode, reveal, startFromEmpty, values])

  return (
    <div ref={bounds.observe} css={{ width: "100%" }}>
      <div ref={setContainer} />
    </div>
  )
}
