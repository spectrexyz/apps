import type { SpringValue } from "react-spring"

import React, { memo, useRef } from "react"
import { a, to, useSpring } from "react-spring"
import { Label } from "./Label"
import { spSlow, WIDTH } from "./shared"

type Props = { progress: SpringValue<number> }

export const Item2 = memo(function Item2({ progress }: Props) {
  const id = useRef(`clip_${Math.random()}`)

  const text = useSpring({
    delay: 400,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })

  const logoSpring = useSpring({
    delay: 200,
    config: {
      mass: 2,
      tension: 1000,
      friction: 90,
    },
    from: { rotate: -80, opacity: 0, scale: 0.7 },
    to: { rotate: 0, opacity: 1, scale: 1 },
  })

  return (
    <g transform={`translate(${WIDTH / 2 - 75 / 2}, 116)`}>
      <g transform="translate(37, -70)">
        <a.g
          opacity={text.opacity}
          transform-origin="0 30"
          transform={text.transform}
        >
          <Label
            text={
              <>
                <tspan x="0" dy="1.6em">
                  Spectre contracts lock
                </tspan>
                <tspan x="0" dy="1.6em">
                  the ERC721 & wraps its
                </tspan>
                <tspan x="0" dy="1.6em">
                  metadata into a ERC1155
                </tspan>
              </>
            }
          />
        </a.g>
      </g>

      <a.g
        clipPath={`url(#${id.current})`}
        fill="none"
        opacity={progress}
        transform-origin="50 50"
        transform={progress.to([0, 1], [0.7, 1]).to((v) => `scale(${v})`)}
      >
        <path
          d={`
            M73.53 100H1.47c-.39 0-.764-.15-1.04-.418a1.408 1.408 0 0
            1-.43-1.01V1.428c0-.38.155-.743.43-1.01C.707.15 1.08 0 1.47
            0h58.825L75 14.286V98.57c0 .38-.155.743-.43
            1.01-.276.269-.65.419-1.04.419z
          `}
          fill="#343C50"
        />
        <path
          d="M59.576.5v14.321h14.74"
          stroke="#C0BBFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform={`translate(${75 / 2 - 40 / 2}, ${100 / 2 - 48 / 2})`}>
          <a.image
            width="40"
            height="48"
            href="/diagram/spectre-logo.png"
            opacity={logoSpring.opacity}
            transform-origin={`${75 / 2 - 40 / 2} ${100 / 2 - 48 / 2}`}
            transform={to(
              [logoSpring.rotate, logoSpring.scale],
              (rotate, scale) => {
                return `
                  scale(${scale})
                  rotate(${rotate})
                `
              },
            )}
          />
        </g>
      </a.g>
      <defs>
        <clipPath id={id.current}>
          <path fill="#fff" d="M0 0h75v100H0z" />
        </clipPath>
      </defs>
    </g>
  )
})
