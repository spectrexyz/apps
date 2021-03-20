import React from "react"
import { css } from "@emotion/react"
import { animated } from "react-spring"
import { GU, colors, fonts } from "./styles"
import { useAppear } from "./utils"
import Ascii from "./Ascii"

function ComingSoon({ label }) {
  const appearItems = useAppear(1, { delay: 200 })
  const stylizedLabel = label.replace(/ /g, "_").toUpperCase()

  return appearItems.map(({ progress }, index) => (
    <animated.div
      key={index}
      title={label}
      style={{
        opacity: progress,
        transform: progress
          .to([0, 1], [0.5 * GU, 0])
          .to((v) => `translate3d(0, ${v}px, 0)`),
      }}
      css={css`
        width: fit-content;
        margin: ${4 * GU}px 0;
        padding: 0 ${0.25 * GU}px;
        font-weight: 600;
        color: ${colors.black};
        background: ${colors.green};
      `}
    >
      <Ascii text={stylizedLabel} />
    </animated.div>
  ))
}

export default ComingSoon
