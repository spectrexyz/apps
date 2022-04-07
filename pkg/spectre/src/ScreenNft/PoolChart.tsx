import type { TimeScale } from "./TimeScaleButtons"

import { gu, lerp, list, useTheme } from "kit"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useDimensions from "react-cool-dimensions"
import {
  a,
  Interpolation,
  SpringValue,
  useChain,
  useSpring,
  useSpringRef,
  useTrail,
} from "react-spring"
import { useAppReady } from "../App/AppReady"
import { TimeScaleButtons } from "./TimeScaleButtons"

export type Point = [number, number]
export type Interpolable<T> = SpringValue<T> | Interpolation<T>
export type GraphPointFn = (x: number, y: number) => [x: number, y: number]

type GraphGeometry = {
  bottom: number
  canvasHeight: number
  canvasWidth: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

export function PoolChart({
  compact = false,
  onScaleChange,
  scale,
  ethWeight,
}: {
  compact?: boolean
  onScaleChange: (scale: TimeScale) => void
  scale: TimeScale
  ethWeight: [start: number, end: number]
}) {
  const bounds = useDimensions()
  const width = bounds.width
  const height = bounds.height

  const graphGeometry = useMemo<GraphGeometry>(() => {
    const tspacing = 0 * gu // top spacing
    const bspacing = 10 * gu // bottom spacing
    const hspacing = 10 * gu // horizontal spacing
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
    (x, y): Point => [
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
            <Grid graphGeometry={graphGeometry} />
            <Frame graphPoint={graphPoint} />
            <TwoLines
              from={[ethWeight[0], 1 - ethWeight[0]]}
              graphPoint={graphPoint}
              to={[ethWeight[1], 1 - ethWeight[1]]}
            />
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

function TwoLines(
  {
    from,
    graphPoint,
    to,
  }: {
    from: [number, number]
    graphPoint: GraphPointFn
    to: [number, number]
  },
) {
  const { colors } = useTheme()
  const [showDiscs, setShowDiscs] = useState(false)
  const trail = useTrail(2, {
    delay: 600,
    config: { mass: 1, tension: 400, friction: 200 },
    from: { progress: 0 },
    to: { progress: 1 },
    onChange: ({ value: { progress } }) => {
      if (progress > 0.9) {
        setShowDiscs(true)
      }
    },
  })
  const discs = useTrail(2, {
    pause: !showDiscs,
    config: { mass: 1, tension: 1200, friction: 80 },
    from: { progress: 0 },
    to: { progress: 1 },
  })
  return (
    <g>
      {trail.map(({ progress }, index) => {
        const from_ = graphPoint(0, 10 / 11 * from[index])
        const to_ = graphPoint(1, 10 / 11 * to[index])
        return (
          <a.path
            key={index}
            d={`M${from_} L${to_}`}
            fill="transparent"
            pathLength={1}
            stroke={index === 0 ? "#F597F8" : colors.accent}
            strokeWidth={progress.to([0, 1], [0, 3])}
            strokeDasharray={1}
            opacity={progress}
            strokeDashoffset={progress.to([0, 0.9, 1], [0, 1, 1]).to((v) =>
              1 - v
            )}
          />
        )
      })}
      {discs.map(({ progress }, index) => {
        const [x, y] = graphPoint(1, 10 / 11 * to[index])
        return (
          <a.circle
            key={index}
            cx={x}
            cy={y}
            r={progress.to([0, 0.85, 1], [0, 0, 1]).to((v) => v * 7)}
            fill={index === 0 ? "#F597F8" : colors.accent}
          />
        )
      })}
    </g>
  )
}

function Frame({ graphPoint }: {
  graphPoint: GraphPointFn
}) {
  const { colors } = useTheme()
  const { progress } = useSpring({
    config: { mass: 1, tension: 800, friction: 200 },
    from: { progress: 0 },
    to: { progress: 1 },
  })
  const dashesTrail = useTrail(10, {
    config: { mass: 1, tension: 800, friction: 60 },
    from: { progress: 0 },
    to: { progress: 1 },
  })
  return (
    <g>
      <a.path
        d={`
          M${graphPoint(0, 1)}
          L${graphPoint(0, 0)}
          L${graphPoint(1, 0)}
          L${graphPoint(1, 1)}
        `}
        fill="transparent"
        pathLength={1}
        stroke={colors.contentDimmed}
        strokeWidth="2"
        strokeDasharray={1}
        strokeDashoffset={progress.to((v) => 1 - v)}
      />
      {dashesTrail.map(({ progress }, i) => (
        <DashPercent
          key={i}
          index={i}
          graphPoint={graphPoint}
          progress={progress}
        />
      ))}
    </g>
  )
}

function Grid({ graphGeometry }: { graphGeometry: GraphGeometry }) {
  const rows = 11
  const rowSize = graphGeometry.height / rows
  const rowsTrail = useTrail(
    rows,
    {
      config: { mass: 1, tension: 800, friction: 100 },
      from: { progress: 0 },
      to: { progress: 1 },
    },
  )

  const cols = Math.floor(graphGeometry.width / rowSize) - 1
  const colSize = graphGeometry.width / cols
  const colsTrail = useTrail(
    cols,
    {
      config: { mass: 1, tension: 800, friction: 100 },
      from: { progress: 0 },
      to: { progress: 1 },
    },
  )

  return (
    <g>
      {colsTrail.map(({ progress }, index) => {
        const x = graphGeometry.left + colSize * (index + 1)
        return (
          <GridLine
            key={index}
            transform={progress.to((v) => `scale(1 ${1 - v})`)}
            x1={x}
            x2={x}
            y1={graphGeometry.top}
            y2={graphGeometry.top + graphGeometry.height}
          />
        )
      })}
      {rowsTrail.map(({ progress }, index) => {
        const y = graphGeometry.bottom - rowSize * (index)
        return (
          <GridLine
            key={index}
            transform={progress.to((v) => `
              rotate(180 ${graphGeometry.left + graphGeometry.width / 2} ${y})
              scale(${1 - v} 1)
            `)}
            x1={graphGeometry.left}
            x2={graphGeometry.left + graphGeometry.width}
            y1={y}
            y2={y}
          />
        )
      })}
    </g>
  )
}

function GridLine(
  {
    x1,
    x2,
    y1,
    y2,
    transform,
  }: {
    x1: number
    x2: number
    y1: number
    y2: number
    transform: Interpolation<number, string>
  },
) {
  const { colors } = useTheme()
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#404754"
        strokeWidth={1}
        strokeDasharray={4}
        strokeDashoffset={3}
      />
      <a.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={2}
        stroke={colors.layer2}
        transform={transform}
      />
    </g>
  )
}

function DashPercent(
  {
    graphPoint,
    index,
    progress,
  }: {
    graphPoint: GraphPointFn
    index: number
    progress: Interpolable<number>
  },
) {
  const { colors } = useTheme()
  const [x, y] = graphPoint(0, 1 / 11 * (index + 1))
  const labelProgress = progress.to<number>([0, 0.9, 1], [0, 0, 1])
  return (
    <g>
      <a.path
        d={`
          M ${x} ${y}
          l -8 0
        `}
        fill="transparent"
        pathLength={1}
        stroke={colors.contentDimmed}
        strokeWidth="2"
        strokeDasharray={1}
        strokeDashoffset={progress.to((v: number) => 1 - v)}
      />
      <a.text
        fill={colors.contentDimmed}
        fontSize="14"
        textAnchor="end"
        x={x - 18}
        y={y + 4}
        opacity={labelProgress}
        transform={labelProgress.to((v) => `translate(${6 * (1 - v)})`)}
      >
        {(index + 1) * 10}%
      </a.text>
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
