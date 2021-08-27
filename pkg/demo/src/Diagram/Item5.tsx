import React, { memo } from "react"
import { a, useSpring, useTransition } from "react-spring"
import { Label } from "./Label"
import { WIDTH, HEIGHT, spSlow } from "./shared"
import { Serc20 } from "./Serc20"

const X = WIDTH / 2 - 105 / 2
const Y = HEIGHT - 250 + 40 + 12.5

export const Item5 = memo(function Item5() {
  const text = useSpring({
    delay: 300,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })

  const coins = Array.from({ length: 3 * 4 }).map((_, index) => index)

  const coinsTransition = useTransition(coins, {
    trail: 20,
    delay: 0,
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
      <g>
        {coinsTransition(({ opacity, scale }, index) => {
          const row = Math.floor(index / 3)
          const col = index % 3
          const x = 33 * col + 1
          const y = 22.5 * row + 6
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

      <g transform={`translate(${105 / 2}, ${105 + 15})`}>
        <a.g opacity={text.opacity} transform={text.transform}>
          <Label
            text={
              <>
                <tspan x="0" dy="1.6em">
                  Ownership of the erc1155 is
                </tspan>
                <tspan x="0" dy="1.6em">
                  represented by sERC20 tokens
                </tspan>
                <tspan x="0" dy="1.6em">
                  that anyone can mint/buy/sell
                </tspan>
              </>
            }
          />
        </a.g>
      </g>
    </g>
  )
})
