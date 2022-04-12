import type { MouseEvent, RefObject } from "react"
import type { PickAnimated, SpringValues } from "react-spring"
import type { TimeScale } from "./TimeScaleButtons"

import { co, gu, lerp, Moire, smoothPath, useTheme, useUid } from "kit"
import { useCallback, useMemo, useRef, useState } from "react"
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
import { TimeScaleButtons } from "./TimeScaleButtons"

const attr = (
  ref: RefObject<HTMLElement | SVGElement>,
  name: string,
  value: string | number,
) => {
  ref.current?.setAttribute(name, String(value))
}

export type Point = [number, number]
export type Interpolable<T> = SpringValue<T> | Interpolation<T>

type GraphGeometry = {
  canvasHeight: number
  canvasWidth: number
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

const BORDER = 1.5

export function FractionsChart({
  compact = false,
  onScaleChange,
  scale,
  values,
  multiplier = 1.1,
}: {
  compact?: boolean
  onScaleChange: (scale: TimeScale) => void
  scale: TimeScale
  values: number[] // 0 => 1 numbers
  multiplier: number
}) {
  const { colors } = useTheme()
  const bounds = useDimensions()
  const width = bounds.width
  const height = bounds.height

  const graphGeometry = useMemo<GraphGeometry>(() => {
    const tspacing = 10 * gu // top spacing
    const bspacing = 7 * gu // bottom spacing
    const hspacing = 2 * gu // horizontal spacing
    return {
      bottom: height - bspacing,
      canvasHeight: height,
      canvasWidth: width,
      height: height - tspacing - bspacing,
      left: hspacing,
      right: width - hspacing,
      top: tspacing,
      width: width - hspacing * 2,
    }
  }, [height, width])

  // transforms normalized values into coordinates
  const graphPoint = useCallback(
    (x, y): Point => [
      lerp(x, graphGeometry.left, graphGeometry.right),
      lerp(y, graphGeometry.bottom - 5 * gu, graphGeometry.top), // -5gu = move the minimum above the fadeout part
    ],
    [graphGeometry],
  )

  const {
    curveReveal1,
    curveReveal2,
    timeScaleButtonsTransition,
  } = useReveal()

  const svgRef = useRef<SVGSVGElement>(null)
  const buyoutDot = useLabelDot({
    label: (index) => {
      return [`NFT buyout price: $${825 * (index + 1)}K`]
    },
    position: "above",
  })

  const marketCapDot = useLabelDot({
    label: (index) => {
      return [
        `MOIRÉ total market cap: $${749 * (index + 1)}K`,
        `MOIRÉ token price: $${1.64 * (index + 1)}`,
      ]
    },
    position: "below",
  })

  const mouseGraphPosition = (event: MouseEvent<SVGSVGElement>) => {
    const svgRect = svgRef.current?.getBoundingClientRect()
    if (!svgRect) {
      return { inBounds: false, x: 0, y: 0 }
    }

    const x = event.pageX - svgRect.x
    const y = event.pageY - svgRect.y

    const inBounds = !(
      y < graphGeometry.top
      || y > graphGeometry.bottom
      // || x < graphGeometry.left
      // || x > graphGeometry.right
    )

    const valueIndex = Math.round(
      (x - graphGeometry.left) / graphGeometry.width * (values.length - 1),
    )

    return {
      inBounds,
      valueIndex,
      x: valueIndex / (values.length - 1),
      y: values[valueIndex],
    }
  }

  return (
    <div ref={bounds.observe} css={{ overflow: "hidden", height: "100%" }}>
      {width > 0 && (
        <div css={{ position: "relative", width, height }}>
          <div
            css={{
              position: "absolute",
              top: `${graphGeometry.top}px`,
              left: `${graphGeometry.left}px`,
            }}
          >
            <Moire
              width={graphGeometry.width}
              height={graphGeometry.height}
              backgroundColor="#5E4572"
            />
          </div>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            css={{ position: "absolute", inset: "0 auto auto 0" }}
            onMouseLeave={() => {
              buyoutDot.hide()
              marketCapDot.hide()
            }}
            onMouseMove={(event) => {
              const { inBounds, valueIndex, x, y } = mouseGraphPosition(event)

              if (inBounds) {
                buyoutDot.position(valueIndex, ...graphPoint(x, y))
                marketCapDot.position(
                  valueIndex,
                  ...graphPoint(x, y / multiplier),
                )
              } else {
                buyoutDot.hide()
                marketCapDot.hide()
              }
            }}
          >
            <Curve
              graphPoint={graphPoint}
              height={height}
              multiplier={multiplier}
              graphGeometry={graphGeometry}
              showLineProgress={curveReveal1.progress}
              showFillProgress={curveReveal2.progress}
              steps={values.length - 1}
              values={values}
              width={width}
            />
            <Dot color="rgb(245, 151, 248)" {...buyoutDot.dotProps} />
            <Dot color={colors.accent} {...marketCapDot.dotProps} />
            <RectLabel
              color="rgb(245, 151, 248)"
              {...buyoutDot.rectLabelProps}
            />
            <RectLabel color={colors.accent} {...marketCapDot.rectLabelProps} />
            {
              /*<rect
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
            />*/
            }
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

function Curve({
  graphGeometry,
  graphPoint,
  height,
  multiplier,
  showFillProgress,
  showLineProgress,
  steps,
  values,
  width,
}: {
  graphGeometry: GraphGeometry
  graphPoint: (x: number, y: number) => Point
  height: number
  multiplier: number
  showLineProgress: Interpolable<number>
  showFillProgress: Interpolable<number>
  steps: number
  values: number[]
  width: number
}) {
  const uid = useUid()

  const [curvePoints, curvePointsMultiplied] = useMemo(() => {
    return [
      values.map<Point>((value, index) =>
        graphPoint(index / steps, value * (1 / multiplier))
      ),
      values.map<Point>((value, index) => graphPoint(index / steps, value)),
    ]
  }, [multiplier, steps, values, graphPoint])

  const curvePath = useCallback(
    (curvePoints: Point[], progress: number, close: boolean) => {
      const start = graphPoint(0, 0)

      let path = `
        M ${start[0]} ${start[1]}
      `

      path += smoothPath(
        curvePoints.map((point) => [
          point[0],
          lerp(progress, graphGeometry.bottom, point[1]),
        ]),
        0.2,
      )

      if (close) {
        const lastX = curvePoints[curvePoints.length - 1][0]
        path += `
          L ${lastX} ${graphGeometry.bottom}
          L ${graphGeometry.left} ${graphGeometry.bottom}
          Z
        `
      }

      return path
    },
    [graphPoint, graphGeometry],
  )

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
          x={graphGeometry.left}
          y={0}
          width={graphGeometry.width}
          height={graphGeometry.canvasHeight}
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
        <linearGradient id={`gradient-${uid}-fadeout-sides`}>
          <stop
            offset="0%"
            stopColor={colors.layer2}
          />
          <stop
            offset="6%"
            stopColor={colors.layer2 + "00"}
          />
          <stop
            offset="94%"
            stopColor={colors.layer2 + "00"}
          />
          <stop
            offset="100%"
            stopColor={colors.layer2}
          />
        </linearGradient>
        <linearGradient
          id={`gradient-${uid}-fadeout-bottom`}
          x1="0%"
          x2="0%"
          y1="100%"
          y2="90%"
        >
          <stop
            offset="0%"
            stopColor={colors.layer2}
          />
          <stop
            offset="100%"
            stopColor={colors.layer2 + "00"}
          />
        </linearGradient>
        <rect
          fill={`url(#gradient-${uid}-fadeout-bottom)`}
          height={graphGeometry.height}
          width={graphGeometry.width}
          x={graphGeometry.left}
          y={graphGeometry.top + 1 /* rounding fix */}
        />
        <rect
          fill={`url(#gradient-${uid}-fadeout-sides)`}
          height={graphGeometry.height}
          width={graphGeometry.width}
          x={graphGeometry.left}
          y={graphGeometry.top}
        />
      </g>
    </g>
  )
}

function useLabelDot(
  { label, position }: {
    label: (index: number) => string[]
    position: "above" | "below"
  },
) {
  const circleRef = useRef<SVGCircleElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const lastPosition = useRef([0, 0])

  const [animate, setAnimate] = useState(false)
  const [rectPosition, setRectPosition] = useState([0, 0])
  const [textLines, setTextLines] = useState([""])

  const { transform: rectTransform } = useSpring({
    config: { mass: 1, tension: 800, friction: 50 },
    immediate: !animate,
    transform: `translate(${rectPosition.join(" ")})`,
    position: rectPosition,
  })

  const opacity = (opacity: number) => {
    attr(circleRef, "opacity", opacity)
    attr(rectRef, "opacity", opacity)
  }

  return {
    hide: () => {
      // opacity(0)
      // setAnimate(false)
    },
    position: (valueIndex: number, x: number, y: number) => {
      if (lastPosition.current[0] === x && lastPosition.current[1] === y) {
        return
      }

      lastPosition.current = [x, y]

      attr(circleRef, "cx", x)
      attr(circleRef, "cy", y)

      let rectX = x - 180
      let rectY = y + (position === "above" ? -34 : 0)

      if (rectX < 40) {
        rectX += 200
      }

      setTextLines(label(valueIndex))
      setRectPosition([rectX, rectY])
      setAnimate(true)
      opacity(1)
    },
    rectLabelProps: { circleRef, rectRef, rectTransform, textLines },
    dotProps: { circleRef, rectRef, rectTransform },
  }
}

function RectLabel(
  { color, rectRef, rectTransform, textLines }: {
    color: string
    rectRef: RefObject<SVGRectElement>
    rectTransform: SpringValue<string>
    textLines: string[]
  },
) {
  return (
    <g>
      <a.rect
        ref={rectRef}
        fill="#141D2F"
        height="30"
        opacity="0"
        stroke={color}
        strokeWidth={1}
        transform={rectTransform}
        width="160"
        x="0"
        y="0"
      />
      {
        /*textLines.map((line, i) => (
        <a.text
          key={i}
          fill={color}
          transform={rectTransform}
          x="0"
          y="0"
        >
          {line}
        </a.text>
      ))*/
      }
    </g>
  )
}

function Dot(
  { circleRef, color }: {
    circleRef: RefObject<SVGCircleElement>
    color: string
  },
) {
  return (
    <circle
      ref={circleRef}
      fill={color}
      opacity="0"
      r={0.75 * gu}
      stroke={co(color).alpha(0.4).toHex()}
      strokeWidth="10px"
    />
  )
}

function useReveal() {
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
    config: { mass: 1, tension: 800, friction: 80 },
    delay: 400,
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  })

  const appReady = useAppReady()

  useChain(
    appReady.transitionEnded
      ? [curveReveal1Ref, curveReveal2Ref, timeScaleButtonsTransitionRef]
      : [],
    appReady.transitionEnded
      ? [0, 0.5, 0.5]
      : [],
  )

  return { curveReveal1, curveReveal2, timeScaleButtonsTransition }
}
