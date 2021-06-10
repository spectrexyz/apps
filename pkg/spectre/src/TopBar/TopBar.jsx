import { useState } from "react"
import { css } from "@emotion/react"
import { a, useSpring } from "react-spring"
import { gu, springs } from "kit"
import { useAppReady } from "../App/AppReady.jsx"
import { useAppScroll } from "../App/AppScroll.jsx"

export function TopBar() {
  const { appReadyTransition } = useAppReady()

  const [hide, setHide] = useState(false)
  useAppScroll((scroll) => {
    setHide(scroll > 2 * gu)
  })

  const { innerTransform } = useSpring({
    config: springs.appear,
    innerTransform: hide ? "translate3d(0, -100%, 0)" : "translate3d(0, 0%, 0)",
  })

  return (
    <div
      css={css`
        position: relative;
        overflow: hidden;
        height: 8gu;
      `}
    >
      {appReadyTransition(
        ({ progress, topBarTransform }, ready) =>
          ready && (
            <a.div
              style={{ opacity: progress, transform: topBarTransform }}
              css={({ colors }) => css`
                position: absolute;
                inset: auto 0 0;
                height: 100%;
                justify-content: space-between;
              `}
            >
              <a.div
                style={{ transform: innerTransform }}
                css={({ colors }) => css`
                  display: flex;
                  align-items: center;
                  height: 100%;
                  padding: 0 2gu;
                  border-bottom: 1px solid ${colors.outline2};
                `}
              >
                top
              </a.div>
            </a.div>
          )
      )}
    </div>
  )
}
