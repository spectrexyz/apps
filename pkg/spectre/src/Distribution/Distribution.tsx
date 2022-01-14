import React, { useEffect, useRef } from "react"
import {
  IsometricCanvas,
  IsometricPath,
  IsometricRectangle,
  PlaneView,
} from "@elchininet/isometric"
import { list, gu } from "kit"

const SURFACE_DIMENSIONS = [52 * gu, 40 * gu]

const DISTRIBUTION_COLORS = [
  "#6584E0",
  "#C0BBFF",
  "#F8FFA6",
  "#A0A8C2",
  "#F597F8",
]

function distributionColor(index) {
  return DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length]
}

function rotateMatrix() {
  matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse())
}

function makeRect(planeView, x, y, color) {
  const rect = new IsometricRectangle({
    height: 1,
    width: 1,
    planeView,
    fillColor: color,
    strokeColor: "#58FFCA",
  })
  rect.left = x
  rect.top = y
  return rect
}

function makeCube(index, color) {
  const col = 10 - (index % 10)
  const row = Math.floor(index / 10)

  const x = row + col - 10
  const y = col - 4.5

  const top = makeRect(PlaneView.TOP, x, y, color)
  const right = makeRect(PlaneView.FRONT, x - 1, y - 2, "#050E1F")
  const left = makeRect(PlaneView.SIDE, x + 1, y - 1, "#050E1F")

  const rects = [top]
  if (row === 9) rects.push(left)
  if (col === 1) rects.push(right)
  return rects
}

export function Distribution({ values = [100] }) {
  const ref = useRef()

  useEffect(() => {
    const surface = new IsometricCanvas(ref.current, {
      width: SURFACE_DIMENSIONS[0],
      height: SURFACE_DIMENSIONS[1],
      scale: SURFACE_DIMENSIONS[0] * 0.055,
      backgroundColor: "transparent",
    })

    const { cubes } = values.reduce(
      ({ cubes, cubesIndex }, groupSize, groupIndex) => {
        return {
          cubes: cubes.concat(
            list(groupSize).flatMap((i) => {
              return makeCube(cubesIndex + i, distributionColor(groupIndex))
            })
          ),
          cubesIndex: cubesIndex + groupSize,
        }
      },
      { cubesIndex: 0, cubes: [] }
    )

    surface.addChildren(...cubes)

    return () => {
      surface.clear()
      surface.getElement().remove()
    }
  }, [values])

  return <div ref={ref} />
}
