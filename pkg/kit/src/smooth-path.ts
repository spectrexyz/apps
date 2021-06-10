// From https://francoisromain.medium.com/smooth-a-svg-path-with-functional-programming-1b9876b8bf7e

type Point = [number, number]
type Line = { length: number; angle: number }

function line(pointA: Point, pointB: Point): Line {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

function controlPoint(
  lineCalc: (a: Point, b: Point) => Line,
  smoothing: number
) {
  return (
    current: Point,
    previous: Point | undefined,
    next: Point | undefined,
    reverse = false
  ): Point => {
    const p = previous ?? current
    const n = next ?? current
    const l = lineCalc(p, n)
    const angle = l.angle + (reverse ? Math.PI : 0)
    const length = l.length * smoothing
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
  }
}

function bezierCommand(
  controlPointCalc: (
    current: Point,
    previous: Point | undefined,
    next: Point | undefined,
    reverse?: boolean
  ) => Point
) {
  return (point: Point, i: number, a: Point[]) => {
    const [cpsX, cpsY] = controlPointCalc(a[i - 1], a[i - 2], point)
    const [cpeX, cpeY] = controlPointCalc(point, a[i - 1], a[i + 1], true)
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
  }
}

export function smoothPath(
  points: Array<[number, number]>,
  smoothing = 0.2
): string {
  const bezier = bezierCommand(controlPoint(line, smoothing))
  return points.reduce(
    (path, [x, y], index, points) =>
      index === 0
        ? `M ${x},${y}`
        : `
          ${path}
          ${bezier([x, y], index, points)}
        `,
    ""
  )
}
