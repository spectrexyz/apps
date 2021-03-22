import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { animated } from "react-spring"
import { useViewport } from "use-viewport"
import { GU, colors, springs } from "./styles"
import { useAppear } from "./utils"

function Summary({ items }) {
  const appearItems = useAppear(items.length)
  const { above } = useViewport()
  return (
    <ul
      css={css`
        margin: 0;
        padding: 0;
      `}
    >
      {appearItems.map(({ progress }, index) => {
        const [group, description] = items[index]
        return (
          <animated.li
            key={group}
            style={{
              opacity: progress,
              transform: progress
                .to([0, 1], [2 * GU, 0])
                .to((v) => `translate3d(${v}px, 0, 0)`),
            }}
            css={css`
              list-style: none;
              padding: ${above("medium") ? 0.5 * GU : 1 * GU}px 0;
              transform-origin: 50% 50%;
              &:before {
                content: "»";
                padding-right: 1em;
              }
              strong {
                padding: 0 ${0.25 * GU}px;
                font-weight: 600;
                color: ${colors.black};
                background: ${colors.cyan};
              }
            `}
          >
            <strong>{group}</strong>
            <span> {description}</span>
          </animated.li>
        )
      })}
    </ul>
  )
}

export default Summary
