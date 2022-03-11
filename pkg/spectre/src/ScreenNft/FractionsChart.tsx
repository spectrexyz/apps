import { lerp, list, Moire, smoothPath, useTheme, useUid } from "kit"
import { ReactNode, SVGProps, useCallback, useMemo } from "react"
import {
  a,
  Interpolation,
  SpringValue,
  useChain,
  useSpring,
  useSpringRef,
} from "react-spring"

type Point = [number, number]
type Interpolable<T> = SpringValue<T> | Interpolation<T>

const BORDER = 1.5
const PADDING = { sides: 60, top: 20, graphTop: 86, bottom: 55 }
const DASH_WIDTH = 7
const LABELS_SPACING = 5

const AXES_DEFAULTS = {
  start: {
    title: "weight",
    label: (steps: number, step: number) =>
      String(Math.round((step / steps) * 10) / 10).replace(".", ","),
    steps: 10,
  },
  end: {
    title: "price",
    label: (steps: number, step: number) =>
      String(Math.round(lerp(step / steps, 0, 100))),
    steps: 10,
  },
  main: {
    title: "sERC20 supply",
    label: () => "",
    steps: 19,
    values: [
      0.35,
      0.45,
      0.5,
      0.44,
      0.42,
      0.5,
      0.55,
      0.4,
      0.5,
      0.55,
      0.67,
      0.74,
      0.5,
      0.4,
      0.5,
    ],
  },
}

type Axis = {
  title: string
  label: (steps: number, step: number) => string
  steps: number
}
type AxisMain = Axis & {
  values: number[]
}

type Axes = {
  main: AxisMain
  start: Axis
  end: Axis
}

export function FractionsChart({
  width = 660,
  height = 440,
  axes = {},
}: {
  width?: number
  height?: number
  axes?: {
    main?: AxisMain
    start?: Axis
    end?: Axis
  }
}) {
  const _axes = useMemo<Axes>(
    () => ({
      start: { ...AXES_DEFAULTS.start, ...axes.start },
      end: { ...AXES_DEFAULTS.end, ...axes.end },
      main: { ...AXES_DEFAULTS.main, ...axes.main },
    }),
    [axes],
  )

  const spRefs = [useSpringRef(), useSpringRef(), useSpringRef()]
  const spOptions = {
    config: { mass: 1, tension: 300, friction: 80 },
    from: { showProgress: 0 },
    to: { showProgress: 1 },
  }

  const spMain = useSpring({ ref: spRefs[0], ...spOptions })
  // const spStart = useSpring({ ref: spRefs[1], ...spOptions })
  // const spEnd = useSpring({ ref: spRefs[2], ...spOptions })

  useChain(spRefs, [0.7, 0.3, 0])

  // transforms 0 => 1 values into coordinates
  const graphPoint = useCallback(
    (x, y): Point => {
      const totalWidth = width - PADDING.sides * 2
      const totalHeight = height - PADDING.bottom - PADDING.graphTop
      return [
        PADDING.sides + totalWidth * x,
        height - PADDING.bottom - totalHeight * y,
      ]
    },
    [width, height],
  )

  return (
    <div css={{ position: "relative", width, height }}>
      <div css={{ position: "absolute", inset: "0" }}>
        <Moire width={width} height={height} backgroundColor="#5E4572" scale={0.8} />
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        css={{ position: "absolute", inset: "0 auto auto 0" }}
      >
        <Curve
          multiplier={1.1}
          graphPoint={graphPoint}
          height={height}
          showProgress={spMain.showProgress}
          steps={_axes.main.steps}
          values={_axes.main.values}
          width={width}
        />
        <Frame
          width={width}
          height={height}
          axes={_axes}
        />
      </svg>
    </div>
  )
}

function DashLabels({
  side,
  steps,
  label,
  width,
  height,
}: {
  side: "start" | "end"
  steps: number
  label: (step: number, steps: number) => string
  width: number
  height: number
}) {
  const top = PADDING.graphTop
  const left = PADDING.sides
  const bottom = height - PADDING.bottom
  const right = width - PADDING.sides
  const stepSize = (bottom - top) / steps
  return (
    <>
      {list(steps, (index: number) => {
        const value = index / (steps - 1)
        const hspace = DASH_WIDTH + LABELS_SPACING
        return (
          <Label
            key={index}
            size={9}
            textAnchor={side === "start" ? "end" : "start"}
            x={side === "start" ? left - hspace : right + hspace}
            y={lerp(value, bottom - stepSize, top) + 3}
          >
            {label(steps, index + 1)}
          </Label>
        )
      })}
    </>
  )
}

function Frame({
  width,
  height,
  axes,
}: {
  width: number
  height: number
  axes: Axes
}) {
  return (
    <g>
      <path
        d={`
          ${/* Frame */ ""}
          M ${PADDING.sides},${PADDING.top}
          V ${height - PADDING.bottom}
          H ${width - PADDING.sides}
          V ${PADDING.top}

          ${/* Vertical dashes (start + end axes) */ ""}
          ${
          [
            [axes.start.steps, PADDING.sides, -DASH_WIDTH],
            [axes.end.steps, width - PADDING.sides, DASH_WIDTH],
          ]
            .map(([steps, x, w]) =>
              list(steps, (index) => {
                const value = index / (steps - 1)
                const vMin = PADDING.graphTop
                const vMax = height - PADDING.bottom
                const stepSize = (vMax - vMin) / steps
                return `
                  M ${x} ${lerp(value, vMin, vMax - stepSize)}
                  h ${w}
                `
              }).join("")
            )
            .join("")
        }

          ${/* Horizontal dashes (main axis) */ ""}
          ${
          list(axes.main.steps, (index, steps) => {
            const value = index / (steps - 1)
            const hMin = PADDING.sides
            const hMax = width - PADDING.sides
            const stepSize = (hMax - hMin) / steps
            return index === steps - 1
              ? ""
              : `
                M ${lerp(value, hMin + stepSize, hMax)} ${
                height - PADDING.bottom
              }
                v ${DASH_WIDTH}
              `
          }).join("")
        }

        `}
        stroke="#DAEAEF"
        strokeWidth={BORDER}
        fill="transparent"
      />

      <Label
        x={PADDING.sides - 20}
        y={PADDING.top}
        textAnchor="end"
        transform={`rotate(-90, ${PADDING.sides - 20}, ${PADDING.top})`}
      >
        {axes.start.title}
      </Label>

      <DashLabels
        steps={axes.start.steps}
        side="start"
        label={axes.start.label}
        width={width}
        height={height}
      />

      <DashLabels
        steps={axes.end.steps}
        side="end"
        label={axes.end.label}
        width={width}
        height={height}
      />
      <Label
        x={width - PADDING.sides + 23}
        y={PADDING.top}
        textAnchor="end"
        transform={`rotate(-90, ${width - PADDING.sides + 23}, ${PADDING.top})`}
      >
        {axes.end.title}
      </Label>

      <Label x={width / 2} y={height - PADDING.sides + 36} textAnchor="middle">
        {axes.main.title}
      </Label>
    </g>
  )
}

function Label({
  children,
  color = "#fff",
  size = 11,
  ...props
}: SVGProps<SVGTextElement> & {
  children: ReactNode
  color?: string
  size?: number
}) {
  return (
    <text
      {...props}
      css={{
        fontSize: `${size}px`,
        fill: color,
      }}
    >
      {children}
    </text>
  )
}

function VariableStrokePath({
  color = "#58FFCA",
  d,
  height,
  steps = 24,
  strokeWidthMax = 2,
  strokeWidthMin = 1,
  width,
  ...props
}: SVGProps<SVGGElement> & {
  color: string
  d: string
  height: number
  steps?: number
  strokeWidthMax?: number
  strokeWidthMin?: number
  width: number
}) {
  const uid = useUid()
  return (
    <g {...props}>
      <mask id={uid}>
        <linearGradient id={`gradient-${uid}`} x1="0" x2="1" y1="0" y2="0">
          {list(steps, (index, items) => (
            <stop
              key={index}
              offset={`${(index / (items - 1)) * 100}%`}
              stopColor={index % 2 ? "#DDDDDD" : "#000000"}
            />
          ))}
        </linearGradient>
        <rect width={width} height={height} fill={`url(#gradient-${uid})`} />
      </mask>
      <a.path
        d={d}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidthMin}
        mask={`url(#${uid})`}
      />
      <a.path
        d={d}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidthMax}
        mask={`url(#${uid})`}
      />
    </g>
  )
}

function RectanglePoint({
  color = "#FCFAFA",
  label,
  pointFrom: [fromX, fromY],
  pointTo: [toX, toY],
  xEnd,
  yEnd,
  showProgress,
}: {
  color?: string
  label?: string
  pointFrom: Point
  pointTo: Point
  xEnd: number
  yEnd: number
  showProgress: Interpolable<number>
}) {
  return (
    <g>
      <a.path
        d={showProgress.to(
          (p: number) => `
            M ${lerp(p, fromX, toX)} ${yEnd}
            L ${lerp(p, fromX, toX)} ${lerp(p, fromY, toY)}
            L ${xEnd} ${lerp(p, fromY, toY)}
          `,
        )}
        stroke={color}
        strokeWidth="1"
        strokeDasharray="3"
        fill="transparent"
      />
      {label && (
        <a.g opacity={showProgress.to([0, 0.8, 1], [0, 0, 1])}>
          <TwoLinesLabel
            label={label}
            pointFrom={[fromX, fromY]}
            pointTo={[toX, toY]}
            showProgress={showProgress}
          />
        </a.g>
      )}
    </g>
  )
}

function TwoLinesLabel({
  label,
  pointFrom: [fromX, fromY],
  pointTo: [toX, toY],
  showProgress,
}: {
  label: string
  pointFrom: Point
  pointTo: Point
  showProgress: Interpolable<number>
}) {
  return (
    <a.g
      transform={showProgress.to(
        (p: number) =>
          `translate(${lerp(p, fromX, toX)} ${lerp(p, fromY, toY)})`,
      )}
    >
      <Label color="white" textAnchor="middle" dominantBaseline="auto">
        {label
          .trim()
          .split("\n")
          .map((label, index, labels) => (
            <tspan
              key={index}
              x="0"
              dy={index === 0 && labels.length > 1
                ? "-2.8em"
                : index === 1 && labels.length > 1
                ? "1.6em"
                : "0"}
              fill={index === 1 && labels.length > 1 ? "#58FFCA" : "#FCFAFA"}
            >
              {label.trim()}
            </tspan>
          ))}
      </Label>
    </a.g>
  )
}

function Disc({ color = "#58FFCA" }: { color: string }) {
  return <circle r="4" fill={color} />
}

function Curve({
  graphPoint,
  height,
  multiplier,
  showProgress,
  steps,
  values,
  width,
}: {
  graphPoint: (x: number, y: number) => Point
  height: number
  multiplier: number
  showProgress: Interpolable<number>
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
  }, [multiplier, steps, values])

  const curvePath = useCallback(
    (curvePoints: Point[], progress: number, close: boolean) => {
      const start = graphPoint(0, 0)
      let path = `
        M ${start[0]} ${start[1]}
        ${
        smoothPath(
          curvePoints.map((point) => [
            point[0],
            lerp(progress, height - PADDING.bottom, point[1]),
          ]),
          0.2,
        )
      }
      `
      if (close) {
        const lastX = curvePoints[curvePoints.length - 1][0]
        path += `
          L ${lastX} ${height - PADDING.bottom}
          L ${PADDING.sides} ${height - PADDING.bottom}
          Z
        `
      }
      return path
    },
    [height],
  )

  const endPointFrom: Point = [
    curvePoints[curvePoints.length - 1][0],
    graphPoint(1, 0)[1],
  ]
  const endPointTo: Point = [
    curvePoints[curvePoints.length - 1][0],
    curvePoints[curvePoints.length - 1][1],
  ]

  // +4 horizontally to ensure that no gradient is visible during the reveal.
  const revealRectangleInterpolation = showProgress.to(
    (p: number) => `
      M
        ${lerp(p, PADDING.sides, width - (width - endPointTo[0]))}
        ${PADDING.top}
      L
        ${width - (width - endPointTo[0]) + 4}
        ${PADDING.top}
      L
        ${width - (width - endPointTo[0]) + 4}
        ${height - PADDING.bottom}
      L
        ${lerp(p, PADDING.sides, width - (width - endPointTo[0]))}
        ${height - PADDING.bottom}

      Z
    `,
  )

  const { colors } = useTheme()

  return (
    <g>
      <g>
        <mask id={uid}>
          <rect width={width} height={height} fill="white" />
          <a.path d={curvePath(curvePoints, 1, true)} fill="black" />
          <a.path d={revealRectangleInterpolation} fill="white" />
        </mask>
        <rect
          width={width}
          height={height}
          fill={colors.layer2}
          mask={`url(#${uid})`}
        />
      </g>

      <mask id={`${uid}-mul`}>
        <rect width={width} height={height} fill="white" />
        <a.path d={curvePath(curvePoints, 1, true)} fill="black" />
        <a.path d={revealRectangleInterpolation} fill="black" />
      </mask>
      <path
        d={curvePath(curvePointsMultiplied, 1, true)}
        fill="#5E4572"
        mask={`url(#${uid}-mul)`}
      />

      <mask id={`${uid}-reveal-mask`}>
        <rect width={width} height={height} fill="white" />
        <a.path d={revealRectangleInterpolation} fill="black" />
      </mask>

      <VariableStrokePath
        d={curvePath(curvePoints, 1, false)}
        color="#58FFCA"
        width={width}
        height={height}
        strokeWidthMin={BORDER / 2}
        strokeWidthMax={BORDER}
        mask={`url(#${uid}-reveal-mask)`}
      />

      <VariableStrokePath
        d={curvePath(curvePointsMultiplied, 1, false)}
        color="#F597F8"
        width={width}
        height={height}
        strokeWidthMin={BORDER / 2}
        strokeWidthMax={BORDER}
        mask={`url(#${uid}-reveal-mask)`}
      />

      <a.rect
        opacity={showProgress.to([0, 0.2, 1], [1, 1, 0])}
        width={width}
        height={height}
        fill={colors.layer2}
      />

      <RectanglePoint
        label={`
          buyout price
          x1,5
        `}
        pointFrom={endPointFrom}
        pointTo={endPointTo}
        showProgress={showProgress.to([0, 0.8, 1], [0, 0, 1])}
        xEnd={width - PADDING.sides}
        yEnd={height - PADDING.bottom}
      />

      <a.g
        transform={showProgress.to([0, 0.8, 1], [0, 0, 1]).to(
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
      </a.g>
    </g>
  )
}
