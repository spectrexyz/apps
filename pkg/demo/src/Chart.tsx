import { css } from "@emotion/react"
import { gu, lerp, list, Moire, smoothPath, useTheme, useUid } from "kit"
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
const PADDING = {
  sides: 60,
  top: 20,
  graphTop: 86,
  bottom: 55,
}
const ARROW = [5, 5]
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

function crisp(value: number) {
  return Math.round(value) + 0.5
}

export function Chart({
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
  const spStart = useSpring({ ref: spRefs[1], ...spOptions })
  const spEnd = useSpring({ ref: spRefs[2], ...spOptions })

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
    <div
      css={css`
        width: ${width}px;
        height: ${height}px;
        position: relative;
      `}
    >
      <Moire width={width} height={height} speed={0.2} />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
        `}
      >
        <Curve
          graphPoint={graphPoint}
          height={height}
          showProgress={spMain.showProgress}
          steps={_axes.main.steps}
          values={_axes.main.values}
          width={width}
        />

        <a.g opacity={spStart.showProgress}>
          <LinePoint
            start={graphPoint(0, 0.2)}
            end={graphPoint(17 / _axes.main.steps, 0.9)}
            xEnd={width - PADDING.sides}
            yEnd={height - PADDING.bottom}
            color="#EF79F8"
            label="ETH weight"
            labelPosition="end"
            showProgress={spStart.showProgress}
          />
          <TwoLinesLabel
            label={`
            supply cap
            1M sERC20
          `}
            pointFrom={graphPoint(1, 0)}
            pointTo={graphPoint(17 / _axes.main.steps, 0.9)}
            showProgress={spStart.showProgress}
          />
        </a.g>

        <a.g opacity={spEnd.showProgress}>
          <LinePoint
            start={graphPoint(0, 0.8)}
            end={graphPoint((_axes.main.steps - 2) / _axes.main.steps, 0.2)}
            xEnd={width - PADDING.sides}
            yEnd={height - PADDING.bottom}
            color="#635AC3"
            label="sERC20 weight"
            labelPosition="start"
            showProgress={spEnd.showProgress}
          />
        </a.g>

        <Frame width={width} height={height} axes={_axes} />
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
      {list(steps, (index) => {
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
          ${/* Left arrow */ ""}
          M ${PADDING.sides - ARROW[0]} ${PADDING.top + ARROW[1]}
          L ${PADDING.sides} ${PADDING.top}
          L ${PADDING.sides + ARROW[0]},${PADDING.top + ARROW[1]}

          ${/* Right arrow */ ""}
          M ${width - PADDING.sides - ARROW[0]} ${PADDING.top + ARROW[1]}
          L ${width - PADDING.sides} ${PADDING.top}
          L ${width - PADDING.sides + ARROW[0]},${PADDING.top + ARROW[1]}

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
      css={css`
        font-size: ${size}px;
        fill: ${color};
      `}
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

function twoPointsAngle([xStart, yStart]: Point, [xEnd, yEnd]: Point) {
  return (Math.atan2(yEnd - yStart, xEnd - xStart) * 180) / Math.PI
}

function LinePoint({
  color,
  start,
  end,
  xEnd,
  yEnd,
  label,
  labelPosition,
  showProgress,
}: {
  color: string
  start: Point
  end: Point
  xEnd: number
  yEnd: number
  label: string
  labelPosition: "start" | "end"
  showProgress: Interpolable<number>
}) {
  const uid = useUid()
  const startPos = labelPosition === "start"

  return (
    <g>
      <RectanglePoint
        pointFrom={[xEnd, yEnd]}
        pointTo={end}
        showProgress={showProgress}
        xEnd={xEnd}
        yEnd={yEnd}
      />
      <a.path
        id={uid}
        stroke={color}
        strokeWidth="2"
        d={showProgress.to(
          (p: number) => `
            M ${start[0]} ${start[1]}
            L ${lerp(p, start[0], end[0])} ${lerp(p, start[1], end[1])}
          `,
        )}
      />
      <a.g
        transform={showProgress.to(
          (p: number) => `
              translate(
                ${startPos ? start[0] : lerp(p, start[0], end[0])}
                ${startPos ? start[1] : lerp(p, start[1], end[1])}
              )
              rotate(${twoPointsAngle(start, end)})
              translate(${startPos ? lerp(p, 0, 6 * gu) : -6 * gu} -${1.5 * gu})
            `,
        )}
      >
        <Label color={color} textAnchor={startPos ? "start" : "end"}>
          {label}
        </Label>
      </a.g>

      <a.g
        transform={showProgress.to(
          (p: number) => `
            translate(${lerp(p, start[0], end[0])}, ${
            lerp(
              p,
              start[1],
              end[1],
            )
          })
          `,
        )}
      >
        <Disc color={color} />
      </a.g>
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
  width,
  height,
  showProgress,
  values,
  steps,
  graphPoint,
}: {
  width: number
  height: number
  showProgress: Interpolable<number>
  values: number[]
  steps: number
  graphPoint: (x: number, y: number) => Point
}) {
  const uid = useUid()

  const curvePoints = useMemo(() => {
    return values.map<Point>((value, index) => graphPoint(index / steps, value))
  }, [values, steps])

  const curvePath = useCallback(
    (progress: number, close: boolean) => {
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
    [height, curvePoints],
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
          <a.path d={curvePath(1, true)} fill="black" />
          <a.path d={revealRectangleInterpolation} fill="white" />
        </mask>
        <rect
          width={width}
          height={height}
          fill={colors.background}
          mask={`url(#${uid})`}
        />
        <VariableStrokePath
          d={curvePath(1, false)}
          color="#58FFCA"
          width={width}
          height={height}
          strokeWidthMin={BORDER / 2}
          strokeWidthMax={BORDER}
          mask={`url(#${uid}-reveal-mask)`}
        />
      </g>

      <mask id={`${uid}-reveal-mask`}>
        <rect width={width} height={height} fill="white" />
        <a.path d={revealRectangleInterpolation} fill="black" />
      </mask>

      <a.rect
        opacity={showProgress.to([0, 0.2, 1], [1, 1, 0])}
        width={width}
        height={height}
        fill={colors.background}
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
