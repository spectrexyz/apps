import {
  IsometricCanvas,
  IsometricRectangle,
  PlaneView,
} from "@elchininet/isometric"
import { useEffect, useRef } from "react"
import useDimensions from "react-cool-dimensions"
import { useTheme } from "../Theme"
import { list, raf, shuffle } from "../utils"

const DISTRIBUTION_COLORS = [
  "#6584E0",
  "#C0BBFF",
  "#F8FFA6",
  "#A0A8C2",
  "#F597F8",
]

const RATIO = 1.3

function distributionColor(index: number): string {
  return DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length]
}

function randRound(value: number) {
  return Math.round(Math.random() * value)
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

export function Distribution({
  values = [100],
}: DistributionProps): JSX.Element {
  const containerRef = useRef(null)
  const { colors } = useTheme()
  const bounds = useDimensions()

  const { width } = bounds

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const surface = new IsometricCanvas({
      backgroundColor: "transparent",
      container: containerRef.current,
      height: (width ?? 0) / RATIO,
      scale: (width ?? 0) * 0.055,
      width: width ?? 0,
    })

    const { surfaces, surfacesToAnimate } = values.reduce<{
      cubesIndex: number
      surfaces: IsometricRectangle[]
      surfacesToAnimate: [IsometricRectangle, string][]
    }>(
      ({ cubesIndex, surfaces, surfacesToAnimate }, groupSize, groupIndex) => {
        const groupSurfaces = list(groupSize).flatMap((i) => {
          return makeCube(cubesIndex + i, colors.accent, colors.accent)
        })

        const groupColor = distributionColor(groupIndex)

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

    surface.addChildren(...surfaces)

    const _surfacesToAnimate = shuffle(surfacesToAnimate)

    const surfacesAmount = () => {
      const remaining = _surfacesToAnimate.length
      if (remaining < 10) return randRound(1.2)
      if (remaining < 20) return randRound(2)
      if (remaining < 60) return randRound(6)
      return randRound(10)
    }

    const stopAnimation = raf(() => {
      if (_surfacesToAnimate.length < 1) {
        stopAnimation()
        return
      }

      const surfacesToAnimate = _surfacesToAnimate.splice(0, surfacesAmount())

      surfacesToAnimate.forEach(([surface, color]) => {
        surface.fillColor = color
      })
    })

    return () => {
      stopAnimation()
      surface.clear()
      surface.getElement().remove()
    }
  }, [colors, values, width])

  return (
    <div ref={bounds.observe} css={{ width: "100%" }}>
      <div ref={containerRef} />
    </div>
  )
}
