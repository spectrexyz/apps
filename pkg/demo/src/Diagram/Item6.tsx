import type { SpringValue } from "react-spring"

import React, { memo } from "react"
import { a, useSpring, useTransition } from "react-spring"
import { Label } from "./Label"
import { Serc20 } from "./Serc20"
import { HEIGHT, spSlow } from "./shared"

type Props = { progress: SpringValue<number> }

const X = 84
const Y = HEIGHT - 250 + 40 + 2.5

export const Item6 = memo(function Item6({ progress }: Props) {
  const text = useSpring({
    delay: 300,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })

  const coins = Array.from({ length: 2 * 2 }).map((_, index) => index)

  const coinsTransition = useTransition(coins, {
    trail: 20,
    delay: 200,
    config: {
      mass: 1,
      tension: 1200,
      friction: 40,
    },
    from: { scale: 0.7, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
  })

  return (
    <g transform={`translate(${X}, ${Y})`}>
      <a.g
        transform-origin={`${94 / 2} ${125 / 2}`}
        transform={progress.to([0, 1], [0.8, 1]).to((v) => `scale(${v})`)}
      >
        <Device />
      </a.g>
      <g>
        {coinsTransition(({ opacity, scale }, index) => {
          const row = Math.floor(index / 2)
          const col = index % 2
          const x = 33 * col + 12
          const y = 22.5 * row + 36
          return (
            <a.g
              key={index}
              opacity={opacity}
              transform-origin={`${x + 33 / 2} ${y + 22.5 / 2}`}
              transform={scale.to((v) => `scale(${v})`)}
            >
              <Serc20 key={index} x={x} y={y} />
            </a.g>
          )
        })}
      </g>
      <g transform={`translate(${94 / 2}, ${105 + 30})`}>
        <a.g opacity={text.opacity} transform={text.transform}>
          <Label
            text={
              <>
                <tspan x="0" dy="1.6em">
                  sERC20 tokens will be
                </tspan>
                <tspan x="0" dy="1.6em">
                  displayed in any ERC1155
                </tspan>
                <tspan x="0" dy="1.6em">
                  compatible wallets
                </tspan>
              </>
            }
          />
        </a.g>
      </g>
    </g>
  )
})

function Device() {
  return (
    <svg width="94" height="125" fill="none">
      <rect
        x="1"
        y="1"
        width="92"
        height="123"
        rx="7"
        stroke="#C0BBFF"
        strokeWidth="2"
      />
      <path d="M2.005 20h89.99v85H2.005V20z" fill="#343C50" />
      <ellipse cx="47" cy="114.318" rx="2.005" ry="2" fill="#C0BBFF" />
      <path
        stroke="#C0BBFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M37.973 10.568h18.054"
      />
    </svg>
  )
}
