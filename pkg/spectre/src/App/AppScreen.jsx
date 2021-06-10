import { useState } from "react"
import { css } from "@emotion/react"
import { a, useSpring } from "react-spring"
import { gu, springs } from "kit"
import { useAppScroll } from "../App/AppScroll.jsx"

export function AppScreen({ header, children }) {
  const [snapHeader, setSnapHeader] = useState(false)
  useAppScroll((scroll) => {
    setSnapHeader(scroll > 2 * gu)
  })

  const { headerTransform, headerBorderVisibility } = useSpring({
    config: springs.appear,
    headerTransform: snapHeader
      ? "translate3d(0, -100%, 0)"
      : "translate3d(0, 0%, 0)",
    headerBorderVisibility: Number(snapHeader),
  })

  return (
    <div>
      <a.div
        style={{ transform: headerTransform }}
        css={css`
          position: absolute;
          inset: 8gu 0 auto;
          display: flex;
          align-items: center;
          height: 8gu;
          padding: 0 2gu;
        `}
      >
        {header}
        <a.div
          style={{ opacity: headerBorderVisibility }}
          css={({ colors }) => css`
            position: absolute;
            inset: auto 0 0;
            border-bottom: 1px solid ${colors.outline2};
          `}
        />
      </a.div>
      <div
        css={css`
          padding-top: 8gu;
        `}
      >
        {children}
      </div>
    </div>
  )
}
