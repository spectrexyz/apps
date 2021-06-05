import React from "react"
import { a, useSpring, useTransition } from "react-spring"
import { spSlow } from "./shared"
import { Label } from "./Label"

const links = Array.from({ length: 5 }).map((_, i) => i)

export function Chain({ progress, x, y }) {
  const chain = useTransition(links, {
    trail: 40,
    config: {
      mass: 1,
      tension: 800,
      friction: 30,
    },
    from: { scale: 0.7, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
  })

  const text = useSpring({
    delay: 100,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform="translate(-120, 22)">
        <a.g
          opacity={text.opacity}
          transform-origin="20 10"
          transform={text.transform}
        >
          <Label
            textAnchor="left"
            text={
              <>
                <tspan x="0" dy="1.2em">
                  ERC721 & ERC1155
                </tspan>
                <tspan x="0" dy="1.2em">
                  share the same
                </tspan>
                <tspan x="0" dy="1.2em">
                  metadata
                </tspan>
              </>
            }
          />
        </a.g>
      </g>
      {chain(({ opacity, scale }, index) => (
        <a.g
          transform-origin="12 12"
          transform={scale.to((v) => `scale(${v})`)}
          opacity={opacity}
        >
          <Link key={index} x={0} y={15 * index} />
        </a.g>
      ))}
    </g>
  )
}

function Link({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path
          d={`
            M8.91429 10.2133L8.91429 8.39161C8.91412 8.01558 8.98803 7.6432
            9.13181 7.29574C9.27559 6.94828 9.48642 6.63256 9.75225
            6.3666C10.0181 6.10065 10.3337 5.88967 10.6811 5.74573C11.0285
            5.60179 11.4008 5.5277 11.7769 5.5277C12.1529 5.5277 12.5252 5.60179
            12.8726 5.74573C13.22 5.88967 13.5357 6.10065 13.8015 6.3666C14.0673
            6.63256 14.2781 6.94828 14.4219 7.29574C14.5657 7.6432 14.6396
            8.01558 14.6394 8.39161L14.6394 10.994C14.6394 11.3699 14.5654
            11.7421 14.4215 12.0894C14.2777 12.4367 14.0668 12.7523 13.801
            13.0181C13.5352 13.2839 13.2196 13.4948 12.8723 13.6386C12.525
            13.7825 12.1528 13.8565 11.7769 13.8565
          `}
          stroke="#FCFAFA"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`
            M14.6394 14.8975L14.6394 16.7191C14.6396 17.0951 14.5657 17.4675
            14.4219 17.815C14.2781 18.1624 14.0673 18.4782 13.8015
            18.7441C13.5356 19.0101 13.22 19.2211 12.8726 19.365C12.5252 19.5089
            12.1529 19.583 11.7768 19.583C11.4008 19.583 11.0285 19.5089 10.6811
            19.365C10.3337 19.2211 10.018 19.0101 9.75221 18.7441C9.48638 18.4782
            9.27555 18.1624 9.13177 17.815C8.98799 17.4675 8.91408 17.0951
            8.91425 16.7191L8.91425 14.1168C8.91425 13.7409 8.9883 13.3686
            9.13215 13.0213C9.27601 12.674 9.48687 12.3584 9.75268
            12.0926C10.0185 11.8268 10.3341 11.616 10.6814 11.4721C11.0287
            11.3282 11.4009 11.2542 11.7768 11.2542
          `}
          stroke="#FCFAFA"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </g>
  )
}
