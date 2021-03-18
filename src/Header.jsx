import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { animated } from "react-spring"
import { useViewport } from "use-viewport"
import { GU, colors, fonts, viewports, springs } from "./styles"
import { useAppear } from "./utils"
import Square from "./Square"
import Type from "./Type"

function Header({ tagline }) {
  const { above } = useViewport()
  const appearHeadlines = useAppear(2)
  const appearSquare = useAppear(1, { config: springs.slowAppear, delay: 1000 })
  return (
    <header
      css={css`
        display: flex;
        flex-direction: column;
        width: ${18 * GU}px;
        height: ${above(viewports.medium) ? `${19 * GU}px` : "auto"};
        padding-top: ${above(viewports.medium) ? 4.5 * GU : 3 * GU}px;
        padding-bottom: ${4 * GU}px;
        position: relative;
        user-select: none;
        pointer-events: none;
        color: ${colors.green};
        h1 {
          font-size: ${fonts.sizes.large};
        }
        h2:before {
          content: "» ";
        }
      `}
    >
      {appearSquare.map(({ progress }, index) => {
        return (
          above(viewports.medium) && (
            <animated.div
              key={index}
              style={{ opacity: progress }}
              css={css`
                position: absolute;
                top: ${-2 * GU}px;
                left: ${6 * GU}px;
                flex-shrink: 0;
              `}
            >
              <Square />
            </animated.div>
          )
        )
      })}
      {appearHeadlines.map(({ progress }, index) => {
        return (
          <animated.div
            key={index}
            style={{
              opacity: progress.to([0, 0.5, 1], [0, 0, 1]),
              transform: progress
                .to([0, 1], [1 * GU, 0])
                .to((v) => `translate3d(0, ${v}px, 0)`),
            }}
          >
            {index === 0 ? (
              <h1 title="spectre">
                <Type text="spectre" keepCursor />
              </h1>
            ) : (
              <h2>
                <Type text={tagline} />
              </h2>
            )}
          </animated.div>
        )
      })}
    </header>
  )
}

export default Header
