import type { Interpolation, SpringValue } from "react-spring"
import type { TimeScale } from "../types"

import { gu, lerp, useTheme } from "kit"
import { useCallback, useMemo } from "react"
import useDimensions from "react-cool-dimensions"
import { a, useChain, useSpring, useSpringRef } from "react-spring"
import { useAppReady } from "../App/AppReady"
import { TimeScaleButtons } from "./TimeScaleButtons"

export type Point = [number, number]
export type Interpolable<T> = SpringValue<T> | Interpolation<T>

export function MintedChart({
  compact = false,
  onScaleChange,
  scale,
  values,
}: {
  compact?: boolean
  onScaleChange: (scale: TimeScale) => void
  scale: TimeScale
  values: number[] // 0 => 1 numbers
}) {
  const bounds = useDimensions()
  const width = bounds.width
  const height = bounds.height

  const graphGeometry = useMemo(() => {
    const tspacing = 10 * gu // top spacing
    const bspacing = 10 * gu // bottom spacing
    const hspacing = 2 * gu // horizontal spacing
    return ({
      bottom: height - bspacing,
      canvasHeight: height,
      canvasWidth: width,
      height: height - tspacing - bspacing,
      left: hspacing,
      right: width - hspacing,
      top: tspacing,
      width: width - hspacing * 2,
    })
  }, [height, width])

  // transforms normalized values into coordinates
  const graphPoint = useCallback(
    (x: number, y: number): Point => [
      Math.round(lerp(x, graphGeometry.left, graphGeometry.right)),
      Math.round(lerp(y, graphGeometry.bottom, graphGeometry.top)),
    ],
    [graphGeometry],
  )

  const { timeScaleButtonsTransition } = useReveal()

  return (
    <div ref={bounds.observe} css={{ overflow: "hidden", height: "100%" }}>
      {width > 0 && (
        <div css={{ position: "relative", width, height }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            css={{ position: "absolute", inset: "0 auto auto 0" }}
          >
            <Levels values={values} graphPoint={graphPoint} />
            {null && (
              <g>
                <rect
                  x={0}
                  y={0}
                  width={graphGeometry.canvasWidth}
                  height={graphGeometry.canvasHeight}
                  fill="transparent"
                  stroke="yellow"
                  strokeWidth="0.5"
                />
                <rect
                  x={graphGeometry.left}
                  y={graphGeometry.top}
                  width={graphGeometry.width}
                  height={graphGeometry.height}
                  fill="transparent"
                  stroke="red"
                  strokeWidth="0.5"
                />
              </g>
            )}
          </svg>
          <a.div
            style={timeScaleButtonsTransition}
            css={{
              position: "absolute",
              inset: `
                ${height - 40}px
                auto
                auto
                ${graphGeometry.left}px
              `,
              width: `${graphGeometry.width}px`,
            }}
          >
            <TimeScaleButtons
              compact={compact}
              onChange={onScaleChange}
              value={scale}
            />
          </a.div>
        </div>
      )}
    </div>
  )
}

function Levels(
  {
    graphPoint,
    values,
  }: {
    graphPoint: (x: number, y: number) => [x: number, y: number]
    values: number[]
  },
) {
  const { colors } = useTheme()

  const valuesPath = values.map((v, i) => {
    const pos = i / values.length
    const prev = i > 0 ? values[i - 1] : 0

    let path = ""

    // first
    if (i === 0) {
      path += `M${graphPoint(0, 0)}`
    }

    // step (angle)
    path += ` L${graphPoint(pos, prev)}`
    if (v !== prev) path += ` L${graphPoint(pos, v)}`

    // last
    if (i === values.length - 1) {
      path += `
        L${graphPoint(1, v)}
        L${graphPoint(1, 0)}
        Z
      `
    }

    return path
  }).join("")

  const { progress } = useSpring({
    config: { mass: 1, tension: 200, friction: 80 },
    from: { progress: 0 },
    to: { progress: 1 },
  })

  return (
    <g>
      <a.path
        d={valuesPath}
        fill="#343C50"
        opacity={progress.to([0, 0.75, 1], [0, 0, 1])}
      />
      <a.path
        d={valuesPath}
        fill="transparent"
        pathLength={1}
        stroke={colors.accent}
        strokeDasharray={1}
        strokeDashoffset={progress.to((v) => 1 - v)}
        strokeWidth={2}
      />
    </g>
  )
}

function useReveal() {
  const timeScaleButtonsTransitionRef = useSpringRef()
  const timeScaleButtonsTransition = useSpring({
    ref: timeScaleButtonsTransitionRef,
    config: { mass: 1, tension: 800, friction: 80 },
    delay: 1000,
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  })

  const appReady = useAppReady()

  useChain(
    appReady.transitionEnded ? [timeScaleButtonsTransitionRef] : [],
    appReady.transitionEnded ? [0] : [],
  )

  return { timeScaleButtonsTransition }
}
