import React from "react"
import { css } from "@emotion/react"
import { animated } from "react-spring"
import { GU } from "./styles"
import { useAppear } from "./utils"

function Footer({ icons }) {
  const appearItems = useAppear(icons.length)
  return (
    <footer
      css={css`
        display: flex;
        gap: ${1 * GU}px;
        a {
          display: flex;
        }
        img {
          border-radius: ${0.5 * GU}px;
        }
      `}
    >
      {appearItems.map(({ progress }, index) => {
        const [title, url, icon] = icons[index]
        return (
          <animated.a
            key={url}
            href={url}
            title={title}
            target="_blank"
            style={{
              opacity: progress.to([0, 0.5, 1], [0, 0, 1]),
              transform: progress
                .to([0, 1], [1 * GU, 0])
                .to((v) => `translate3d(0, ${v}px, 0)`),
            }}
          >
            <img src={icon} height="35" alt="" />
          </animated.a>
        )
      })}
    </footer>
  )
}

export default Footer
