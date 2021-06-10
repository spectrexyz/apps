import { useEffect, useRef } from "react"
import { useTransition } from "react-spring"
import { css } from "@emotion/react"
import { useAppScrollUpdater } from "./AppScroll.jsx"

export function AppLayout({ topBar, bottomBar, children }) {
  const updateAppScroll = useAppScrollUpdater()
  const handleScroll = (event) => {
    updateAppScroll(event.target.scrollTop)
  }
  return (
    <div
      css={({ colors }) => css`
        color: ${colors.content};
        background: ${colors.background};
      `}
    >
      <div
        css={css`
          position: relative;
          min-width: 360px;
          height: 100vh;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            flex: 0 0;
          `}
        >
          {topBar}
        </div>
        <div
          onScroll={handleScroll}
          css={css`
            flex: 1 1;
            overflow-y: auto;
          `}
        >
          <div
            css={css`
              height: 4000px;
            `}
          >
            {children}
          </div>
        </div>
        <div
          css={css`
            flex: 0 0;
          `}
        >
          {bottomBar}
        </div>
      </div>
    </div>
  )
}
