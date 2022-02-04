import { lerp } from "kit"
import type { SpringValue } from "react-spring"
import { a } from "react-spring"

function path(
  direction: "ltr" | "rtl",
  progress: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const ip = (a: number, b: number) => lerp(progress, a, b)
  if (direction === "rtl") {
    return `
      M ${x2} ${y2}
      L ${ip(x2, x1)} ${ip(y2, y1)}
      M ${ip(x2, x1 + 4.5)} ${ip(y2, y1 - 4.5)}
      L ${ip(x2, x1)} ${ip(y2, y1)}
      L ${ip(x2, x1 + 4.5)} ${ip(y2, y1 + 4.5)}
    `
  }
  return `
    M ${x1} ${y1}
    L ${ip(x1, x2)} ${ip(y1, y2)}
    M ${ip(x1, x2 - 4.5)} ${ip(y1, y2 - 4.5)}
    L ${ip(x1, x2)} ${ip(y1, y2)}
    L ${ip(x1, x2 - 4.5)} ${ip(y1, y2 + 4.5)}
  `
}

export function Arrow({
  direction = "ltr",
  progress,
  x1,
  y1,
  x2,
  y2,
}: {
  direction?: "ltr" | "rtl"
  progress: SpringValue<number>
  x1: number
  y1: number
  x2: number
  y2: number
}) {
  return (
    <a.path
      opacity={progress}
      d={progress.to((p: number) => path(direction, p, x1, y1, x2, y2))}
      strokeWidth="1"
      stroke="white"
      fill="none"
    />
  )
}
