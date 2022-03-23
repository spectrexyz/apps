import { ButtonText, lerp, Moire, smoothPath, useTheme, useUid } from "kit"
import { useCallback, useMemo } from "react"
import useDimensions from "react-cool-dimensions"
import {
  a,
  Interpolation,
  SpringValue,
  useChain,
  useSpring,
  useSpringRef,
} from "react-spring"
import { useAppReady } from "../App/AppReady"

type Point = [number, number]
type Interpolable<T> = SpringValue<T> | Interpolation<T>
type Padding = { sides: number; top: number; graphTop: number; bottom: number }

const BORDER = 1.5
const PADDING: Padding = { sides: 60, top: 20, graphTop: 86, bottom: 55 }

const VALUES_DEFAULTS = [0.74, 0.5, 0.4, 0.5]

type TimeScale = "ALL" | "YEAR" | "MONTH" | "WEEK" | "DAY"

export const TIME_SCALES = new Map<
  TimeScale,
  [label: string, labelShort: string]
>([
  ["DAY", ["1 day", "1D"]],
  ["WEEK", ["1 week", "1W"]],
  ["MONTH", ["1 month", "1M"]],
  ["YEAR", ["1 year", "1Y"]],
  ["ALL", ["All", "All"]],
])

const TIME_SCALES_AS_ENTRIES = Array.from(TIME_SCALES.entries())

export function FractionsChart({
  compact = false,
  onScaleChange,
  scale,
  values = VALUES_DEFAULTS,
}: {
  compact?: boolean
  scale: TimeScale
  onScaleChange: (scale: TimeScale) => void
  values: number[]
}) {
  const { colors } = useTheme()
  const bounds = useDimensions()
  const width = bounds.width
  const height = bounds.height
  const padding = compact
    ? { sides: 0, top: 0, graphTop: 0, bottom: 0 }
    : PADDING

  const curveReveal1Ref = useSpringRef()
  const curveReveal1 = useSpring({
    ref: curveReveal1Ref,
    config: { mass: 1, tension: 300, friction: 80 },
    from: { progress: 0 },
    to: { progress: 1 },
  })

  const curveReveal2Ref = useSpringRef()
  const curveReveal2 = useSpring({
    ref: curveReveal2Ref,
    config: { mass: 1, tension: 300, friction: 280 },
    from: { progress: 0 },
    to: { progress: 1 },
  })

  const timeScaleButtonsTransitionRef = useSpringRef()
  const timeScaleButtonsTransition = useSpring({
    ref: timeScaleButtonsTransitionRef,
    config: { mass: 1, tension: 800, friction: 150 },
    delay: 400,
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0px)",
    },
  })

  const appReady = useAppReady()
  useChain(
    appReady.transitionEnded
      ? [curveReveal1Ref, curveReveal2Ref, timeScaleButtonsTransitionRef]
      : [],
    appReady.transitionEnded
      ? [0, 0.5, 0.7]
      : [],
  )

  // transforms 0 => 1 values into coordinates
  const graphPoint = useCallback(
    (x, y): Point => {
      const totalWidth = width - padding.sides * 2
      const totalHeight = height - padding.bottom - padding.graphTop
      return [
        padding.sides + totalWidth * x,
        height - padding.bottom - totalHeight * y,
      ]
    },
    [width, height],
  )

  return (
    <div ref={bounds.observe} css={{ height: "100%" }}>
      {width > 0 && (
        <div css={{ position: "relative", width, height }}>
          <div css={{ position: "absolute", inset: "0" }}>
            <Moire
              width={width - 1}
              height={height - 1}
              backgroundColor="#5E4572"
              scale={1}
            />
          </div>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            css={{ position: "absolute", inset: "0 auto auto 0" }}
          >
            <Curve
              graphPoint={graphPoint}
              height={height}
              multiplier={1.1}
              padding={padding}
              showLineProgress={curveReveal1.progress}
              showFillProgress={curveReveal2.progress}
              steps={values.length - 1}
              values={values}
              width={width}
            />
          </svg>
          <a.div
            style={timeScaleButtonsTransition}
            css={{
              position: "absolute",
              inset: `
                ${height - 40}px
                ${padding.sides}px
                auto
                ${padding.sides}px
              `,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            {TIME_SCALES_AS_ENTRIES.map(
              ([name, [label, labelShort]], index) => {
                return (
                  <div key={index}>
                    <ButtonText
                      title={label}
                      label={labelShort}
                      css={{
                        color: name === scale
                          ? colors.content
                          : colors.contentDimmed,
                      }}
                      onClick={() => onScaleChange(name)}
                    />
                  </div>
                )
              },
            )}
          </a.div>
        </div>
      )}
    </div>
  )
}

function Disc({ color = "#58FFCA" }: { color: string }) {
  return <circle r="4" fill={color} />
}

function Curve({
  graphPoint,
  height,
  multiplier,
  padding,
  showLineProgress,
  showFillProgress,
  steps,
  values,
  width,
}: {
  graphPoint: (x: number, y: number) => Point
  height: number
  multiplier: number
  padding: Padding
  showLineProgress: Interpolable<number>
  showFillProgress: Interpolable<number>
  steps: number
  values: number[]
  width: number
}) {
  const uid = useUid()

  const [curvePoints, curvePointsMultiplied] = useMemo(() => {
    return [
      values.map<Point>((value, index) => graphPoint(index / steps, value)),
      values.map<Point>((value, index) =>
        graphPoint(index / steps, value * multiplier)
      ),
    ]
  }, [multiplier, steps, values, graphPoint])

  const curvePath = useCallback(
    (curvePoints: Point[], progress: number, close: boolean) => {
      const start = graphPoint(0, 0)
      let path = `
        M ${start[0]} ${start[1]}
        ${
        smoothPath(
          curvePoints.map((point) => [
            point[0],
            lerp(progress, height - padding.bottom, point[1]),
          ]),
          0.2,
        )
      }
      `
      if (close) {
        const lastX = curvePoints[curvePoints.length - 1][0]
        path += `
          L ${lastX} ${height - padding.bottom}
          L ${padding.sides} ${height - padding.bottom}
          Z
        `
      }
      return path
    },
    [height, graphPoint],
  )

  // const endPointFrom: Point = [
  //   curvePoints[curvePoints.length - 1][0],
  //   graphPoint(1, 0)[1],
  // ]
  // const endPointTo: Point = [
  //   curvePoints[curvePoints.length - 1][0],
  //   curvePoints[curvePoints.length - 1][1],
  // ]

  // +4 horizontally to ensure that no gradient is visible during the reveal.
  // -1 horizontally to prevent pixel rounding issues.
  // +1 vertically to prevent pixel rounding issues.
  // const revealRectangleInterpolation = showLineProgress.to(
  //   (p: number) => `
  //     M
  //       ${lerp(p, padding.sides, width - (width - endPointTo[0])) - 1}
  //       ${padding.top}
  //     L
  //       ${width - (width - endPointTo[0]) + 4}
  //       ${padding.top}
  //     L
  //       ${width - (width - endPointTo[0]) + 4}
  //       ${height - padding.bottom + 1}
  //     L
  //       ${lerp(p, padding.sides, width - (width - endPointTo[0])) - 1}
  //       ${height - padding.bottom + 1}
  //     Z
  //   `,
  // )

  const { colors } = useTheme()

  return (
    <g>
      <g>
        <mask id={uid}>
          <rect width={width} height={height} fill="white" />
          <path d={curvePath(curvePoints, 1, true)} fill="black" />
        </mask>
        <a.rect
          width={width}
          height={height}
          fill={colors.layer2}
          mask={`url(#${uid})`}
        />
      </g>

      <mask id={`${uid}-mul`}>
        <rect width={width} height={height} fill="white" />
        <a.path d={curvePath(curvePoints, 1, true)} fill="black" />
      </mask>

      <mask id={`${uid}-reveal-mask`}>
        <a.rect
          x={padding.sides}
          y={padding.top}
          width={width - padding.sides * 2}
          height={height - padding.bottom - padding.top}
          transform={showLineProgress.to((v: number) => `scale(${v}, 1)`)}
          fill="white"
        />
      </mask>

      {/* pink fill */}
      <path
        d={curvePath(curvePointsMultiplied, 1, true)}
        fill="#5E4572"
        mask={`url(#${uid}-mul)`}
      />

      <a.rect
        width={width}
        height={height}
        fill={colors.layer2}
        opacity={showFillProgress.to([0, 1], [1, 0])}
      />

      <a.path
        d={curvePath(curvePoints, 1, false)}
        fill="transparent"
        stroke="#58FFCA"
        strokeWidth={BORDER}
        mask={`url(#${uid}-reveal-mask)`}
      />

      <a.path
        d={curvePath(curvePointsMultiplied, 1, false)}
        fill="transparent"
        stroke="#F597F8"
        strokeWidth={BORDER}
        mask={`url(#${uid}-reveal-mask)`}
      />

      <g>
        <mask id={`${uid}-fadeout-mask`}>
          <linearGradient id={`gradient-${uid}-fadeout`}>
            <stop
              offset="0%"
              stopColor="#fff"
            />
            <stop
              offset="10%"
              stopColor="#000"
            />
            <stop
              offset="90%"
              stopColor="#000"
            />
            <stop
              offset="100%"
              stopColor="#fff"
            />
          </linearGradient>
          <rect
            fill={`url(#gradient-${uid}-fadeout)`}
            height={height - padding.bottom - padding.top}
            width={width - padding.sides * 2}
            x={padding.sides}
            y={padding.top}
          />
        </mask>
        <rect
          width={width}
          height={height}
          fill={colors.layer2}
          mask={`url(#${uid}-fadeout-mask)`}
        />
      </g>

      {
        /*<a.g
        transform={showLineProgress.to([0, 0.8, 1], [0, 0, 1]).to(
          (p) => `
            translate(
              ${lerp(p as number, endPointFrom[0], endPointTo[0])}
              ${lerp(p as number, endPointFrom[1], endPointTo[1])}
            )
            scale(${p} ${p})
          `,
        )}
      >
        <Disc color="#58FFCA" />
      </a.g>*/
      }
    </g>
  )
}
