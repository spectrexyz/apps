/** @jsx jsx */
import { useEffect, useRef } from "react"
import { jsx } from "@emotion/react"
import {
  IsometricCanvas,
  IsometricRectangle,
  PlaneView,
} from "@elchininet/isometric"
import { list, raf, shuffle } from "../utils"
import { gu } from "../styles"
import { useTheme } from "../Theme"

const SURFACE_DIMENSIONS = [52 * gu, 40 * gu]

const DISTRIBUTION_COLORS = [
  "#6584E0",
  "#C0BBFF",
  "#F8FFA6",
  "#A0A8C2",
  "#F597F8",
]

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
  strokeColor: string
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
  strokeColor: string
): IsometricRectangle[] {
  const col = 10 - (index % 10)
  const row = Math.floor(index / 10)

  const x = row + col - 10
  const y = col - 4.5

  const rects: IsometricRectangle[] = []

  // top
  rects.push(makeRect(PlaneView.TOP, x, y, baseColor, strokeColor))

  // left
  if (row === 9)
    rects.push(makeRect(PlaneView.SIDE, x + 1, y - 1, baseColor, strokeColor))

  // right
  if (col === 1)
    rects.push(makeRect(PlaneView.FRONT, x - 1, y - 2, baseColor, strokeColor))

  return rects
}

type DistributionProps = {
  values: number[]
}

export function Distribution({
  values = [100],
}: DistributionProps): JSX.Element {
  const ref = useRef(null)
  const { colors } = useTheme()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const surface = new IsometricCanvas(ref.current, {
      width: SURFACE_DIMENSIONS[0],
      height: SURFACE_DIMENSIONS[1],
      scale: SURFACE_DIMENSIONS[0] * 0.055,
      backgroundColor: "transparent",
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
            ] as [IsometricRectangle, string]
        )

        return {
          surfaces: [...surfaces, ...groupSurfaces],
          surfacesToAnimate: [...surfacesToAnimate, ...groupSurfacesToAnimate],
          cubesIndex: cubesIndex + groupSize,
        }
      },
      { cubesIndex: 0, surfaces: [], surfacesToAnimate: [] }
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
  }, [colors, values])

  return <div ref={ref} />
}