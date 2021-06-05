import React from "react"
import { a } from "react-spring"
import { lerp } from "uikit"

function path(direction, progress, x1, y1, x2, y2) {
  const ip = (a, b) => lerp(progress, a, b)
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
  progressRef,
  progress,
  x1,
  y1,
  x2,
  y2,
}) {
  return (
    <a.path
      opacity={progress}
      d={progress.to((p) => path(direction, p, x1, y1, x2, y2))}
      strokeWidth="1"
      stroke="white"
      fill="none"
    />
  )
}
