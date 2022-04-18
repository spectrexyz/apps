import type { MouseEvent, RefObject } from "react"
import type { Interpolation, SpringValue } from "react-spring"
import type { TimeScale } from "../types"

import {
  clamp,
  co,
  gu,
  lerp,
  Moire,
  smoothPath,
  useFocus,
  useKey,
  useTheme,
  useUid,
} from "kit"
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import useDimensions from "react-cool-dimensions"
import { a, useChain, useSpring, useSpringRef } from "react-spring"
import { useAppReady } from "../App/AppReady"
import { TimeScaleButtons } from "./TimeScaleButtons"

const attr = (
  ref: RefObject<HTMLElement | SVGElement>,
  name: string,
  value: string | number,
) => {
  ref.current?.setAttribute(name, String(value))
}

export type Point = [x: number, y: number]
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
  labels,
  multiplier,
  onScaleChange,
  scale,
  values,
}: {
  compact?: boolean
  labels: (index: number) => {
    buyoutPrice: string
    marketCap: string
    price: string
  }
  multiplier: number
  onScaleChange: (scale: TimeScale) => void
  scale: TimeScale
  values: number[] // 0 => 1 numbers
}) {
  const { colors } = useTheme()
  const bounds = useDimensions()
  const width = bounds.width
  const height = bounds.height

  const graphGeometry = useMemo<GraphGeometry>(() => {
    const tspacing = 18 * gu // top spacing
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
    (x: number, y: number): Point => {
      return [
        lerp(x, graphGeometry.left, graphGeometry.right),
        lerp(y, graphGeometry.bottom - 5 * gu, graphGeometry.top), // -5gu = move the minimum above the fadeout part
      ]
    },
    [graphGeometry],
  )

  const {
    curveReveal1,
    curveReveal2,
    timeScaleButtonsTransition,
  } = useReveal()

  const peekHistory = usePeekHistory({
    graphGeometry,
    graphPoint,
    labels,
    multiplier,
    values,
  })

  return (
    <div
      ref={bounds.observe}
      tabIndex={0}
      {...peekHistory.bindFocusEvents}
      css={({ colors }) => ({
        overflow: "hidden",
        height: "100%",
        "&:focus": {
          outline: 0, // the focus state is represented by the curve dot
        },
      })}
    >
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
            ref={peekHistory.svgRef}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            {...peekHistory.bindSvgEvents}
            css={{ position: "absolute", inset: "0 auto auto 0" }}
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

            <Label
              label="Fraction Price"
              row={0}
              value={"$1.64"}
              valueRef={peekHistory.labelRefPrice}
            />

            <Label
              label="Total Market Cap"
              row={1}
              value={"$749K"}
              valueRef={peekHistory.labelRefMarketCap}
            />

            <Label
              color={colors.accent3}
              label="NFT Buyout Price"
              row={2}
              value={"$825K"}
              valueRef={peekHistory.labelRefBuyoutPrice}
            />

            <Dot
              ref={peekHistory.dotRefBuyoutPrice}
              color={colors.accent3}
            />
            <Dot
              ref={peekHistory.dotRefMarketCap}
              color={colors.accent}
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

// Handles the hover (+ touch & keyboard) behavior on the graph
function usePeekHistory(
  {
    graphGeometry,
    graphPoint,
    labels,
    multiplier,
    values,
  }: {
    graphGeometry: GraphGeometry
    graphPoint: (x: number, y: number) => Point
    labels: (index: number) => {
      buyoutPrice: string
      marketCap: string
      price: string
    }
    multiplier: number
    values: number[] // 0 => 1 numbers
  },
) {
  const svgRef = useRef<SVGSVGElement>(null)

  const dotRefBuyoutPrice = useRef<SVGCircleElement>(null)
  const dotRefMarketCap = useRef<SVGCircleElement>(null)

  const labelRefBuyoutPrice = useRef<SVGTSpanElement>(null)
  const labelRefMarketCap = useRef<SVGTSpanElement>(null)
  const labelRefPrice = useRef<SVGTSpanElement>(null)

  const lastIndex = values.length - 1

  const positionFromIndex = useCallback((index: number): Point => {
    return [index / lastIndex, values[index]]
  }, [lastIndex, values])

  const mouseGraphPosition = useCallback((event: MouseEvent<SVGSVGElement>) => {
    const svgRect = svgRef.current?.getBoundingClientRect()
    if (!svgRect) {
      return { inBounds: false, valueIndex: -1, x: 0, y: 0 }
    }

    const x = event.pageX - svgRect.x
    const y = event.pageY - svgRect.y

    const inBounds = y > graphGeometry.top && y < graphGeometry.bottom

    const valueIndex = clamp(
      Math.round(
        (x - graphGeometry.left) / graphGeometry.width * lastIndex,
      ),
      0,
      lastIndex,
    )

    return {
      inBounds,
      valueIndex,
    }
  }, [graphGeometry, lastIndex])

  const updateLabels = useCallback((index: number) => {
    const positionLabels = labels(index)
    const labelRefData: Array<[RefObject<SVGTSpanElement>, string]> = [
      [labelRefBuyoutPrice, positionLabels.buyoutPrice],
      [labelRefMarketCap, positionLabels.marketCap],
      [labelRefPrice, positionLabels.price],
    ]
    labelRefData.forEach(([ref, content]) => {
      if (ref.current) {
        ref.current.innerHTML = content
      }
    })
  }, [
    labelRefBuyoutPrice,
    labelRefMarketCap,
    labelRefPrice,
    labels,
  ])

  const visible = useRef(false)
  const lastVisibleIndex = useRef(lastIndex)

  const show = useCallback((index: number) => {
    if (lastVisibleIndex.current === index && visible.current) {
      return
    }

    visible.current = true
    lastVisibleIndex.current = index

    const [x, y] = positionFromIndex(index)
    const buyoutPoint = graphPoint(x, y)
    const marketCapPoint = graphPoint(x, y / multiplier)

    attr(dotRefBuyoutPrice, "cx", buyoutPoint[0])
    attr(dotRefBuyoutPrice, "cy", buyoutPoint[1])
    attr(dotRefBuyoutPrice, "opacity", 1)

    attr(dotRefMarketCap, "cx", marketCapPoint[0])
    attr(dotRefMarketCap, "cy", marketCapPoint[1])
    attr(dotRefMarketCap, "opacity", 1)

    updateLabels(index)
  }, [dotRefBuyoutPrice, dotRefMarketCap, graphPoint, multiplier, updateLabels])

  const hide = useCallback(() => {
    visible.current = false
    attr(dotRefBuyoutPrice, "opacity", 0)
    attr(dotRefMarketCap, "opacity", 0)
    updateLabels(lastIndex)
  }, [
    dotRefBuyoutPrice,
    dotRefMarketCap,
    lastIndex,
    updateLabels,
  ])

  const bindSvgEvents = {
    onMouseLeave: () => {
      if (!focused) {
        hide()
      }
    },
    onMouseMove: (event: MouseEvent<SVGSVGElement>) => {
      const { inBounds, valueIndex } = mouseGraphPosition(event)
      if (inBounds) {
        show(valueIndex)
      } else {
        hide()
      }
    },
  }

  const { focused, bindEvents: bindFocusEvents } = useFocus()
  useKey("ArrowLeft", () => {
    show(Math.max(0, lastVisibleIndex.current - 1))
  }, focused)
  useKey("ArrowRight", () => {
    show(Math.min(lastIndex, lastVisibleIndex.current + 1))
  }, focused)

  useEffect(() => {
    if (focused) {
      show(lastVisibleIndex.current)
    } else {
      hide()
    }
  }, [focused, hide, show])

  return {
    bindFocusEvents,
    bindSvgEvents,
    dotRefBuyoutPrice,
    dotRefMarketCap,
    hide,
    labelRefBuyoutPrice,
    labelRefMarketCap,
    labelRefPrice,
    show,
    svgRef,
  }
}

const Dot = forwardRef<SVGCircleElement, { color: string }>(
  function Dot({ color }, ref) {
    return (
      <circle
        ref={ref}
        fill={color}
        opacity="0"
        r={0.75 * gu}
        stroke={co(color).alpha(0.4).toHex()}
        strokeWidth="10px"
      />
    )
  },
)

function Label(
  { label, value, valueRef, color, row }: {
    color?: string
    label: string
    row: number
    value: string
    valueRef: RefObject<SVGTSpanElement>
  },
) {
  const { colors } = useTheme()
  return (
    <text
      fill={colors.contentDimmed}
      fontSize="12"
      x="24"
      y={10 * gu + 3 * gu * row}
    >
      {label}:{" "}
      <tspan
        ref={valueRef}
        fill={color ?? colors.accent}
      >
        {value}
      </tspan>
    </text>
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
