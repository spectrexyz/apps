import type { ReactNode } from "react"
import type { SpringValue } from "react-spring"

import { css } from "@emotion/react"
import { useState } from "react"
import { a, useTransition } from "react-spring"
import { Arrow } from "./Arrow"
import { Chain } from "./Chain"
import { Item1 } from "./Item1"
import { Item2 } from "./Item2"
import { Item3 } from "./Item3"
import { Item4 } from "./Item4"
import { Item5 } from "./Item5"
import { Item6 } from "./Item6"
import { Serc20 } from "./Serc20"
import { HEIGHT, WIDTH } from "./shared"

const animatedItems: Array<(p: SpringValue<number>) => ReactNode> = [
  (p) => <Item1 progress={p} />,
  (p) => (
    <Arrow
      x1={84 + 100 + 20}
      y1={116 + 100 / 2}
      x2={WIDTH / 2 - 75 / 2 - 20}
      y2={116 + 100 / 2}
      progress={p}
    />
  ),
  (p) => <Item2 progress={p} />,
  (p) => (
    <Arrow
      x1={WIDTH / 2 + 75 / 2 + 20}
      y1={116 + 100 / 2}
      x2={WIDTH - 110 - 75 - 20}
      y2={116 + 100 / 2}
      progress={p}
    />
  ),
  (p) => <Item3 progress={p} />,
  (p) => <Chain x={WIDTH - 140} y={238} progress={p} />,
  (p) => (
    <g transform="translate(0, -30)">
      <Item4 progress={p} />
    </g>
  ),
  (p) => (
    <g transform="translate(0, -30)">
      <Arrow
        x1={WIDTH / 2 + 75 / 2 + 30}
        y1={HEIGHT - 250 + 40 + 125 / 2}
        x2={WIDTH - 125 - 75 - 15}
        y2={HEIGHT - 250 + 40 + 125 / 2}
        progress={p}
        direction="rtl"
      />
    </g>
  ),
  () => (
    <g transform="translate(0, -30)">
      <Item5 />
    </g>
  ),
  (p) => (
    <g transform="translate(0, -30)">
      <Arrow
        x1={84 + 100 + 20}
        y1={HEIGHT - 250 + 40 + 125 / 2}
        x2={WIDTH / 2 - 75 / 2 - 30}
        y2={HEIGHT - 250 + 40 + 125 / 2}
        progress={p}
        direction="rtl"
      />
    </g>
  ),
  (p) => (
    <g transform="translate(0, -30)">
      <g transform={`translate(${234}, ${HEIGHT - 250 + 125 / 2})`}>
        <a.g
          opacity={p}
          transform-origin={`${33 / 2} ${22.5 / 2}`}
          transform={p.to((v) => `scale(${v})`)}
        >
          <Serc20 x={0} y={0} />
        </a.g>
      </g>
    </g>
  ),
  (p) => (
    <g transform="translate(0, -30)">
      <Item6 progress={p} />
    </g>
  ),
]

const startedAnims = animatedItems.map(() => false)

export function Diagram() {
  const [started, setStarted] = useState(startedAnims)

  const transition = useTransition(animatedItems, {
    keys: animatedItems.map((_, i) => i),
    trail: 100,
    config: {
      mass: 1,
      tension: 600,
      friction: 60,
    },
    from: { progress: 0 },
    enter: { progress: 1 },
    onStart(_result, _spring, item) {
      setStarted((started) =>
        started.map((value, index) =>
          index === animatedItems.indexOf(item) ? true : value
        )
      )
    },
  })

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width={WIDTH}
      height={HEIGHT}
      css={css`
        background: #141d2f;
      `}
    >
      {transition(({ progress }, item) => {
        const index = animatedItems.indexOf(item)
        return <g key={index}>{started[index] && item(progress)}</g>
      })}
    </svg>
  )
}
