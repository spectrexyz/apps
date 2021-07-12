import { useEffect, useRef } from "react"
import { useTransition } from "react-spring"
import { css } from "@emotion/react"
import { useLayout } from "../styles.js"
import { useAppScrollUpdater } from "../App/AppScroll.jsx"
import { AppLayoutTopBar } from "./AppLayoutTopBar.jsx"
import { AppLayoutBottomBar } from "./AppLayoutBottomBar.jsx"

const hexAlpha = (value) =>
  Math.round(value * 255)
    .toString(16)
    .padStart(2, "0")

export function AppLayout({ children }) {
  const updateAppScroll = useAppScrollUpdater()
  const handleScroll = (event) => {
    updateAppScroll(event.currentTarget.scrollTop)
  }

  const layout = useLayout()
  const compact = layout.below("large")

  return (
    <div
      css={({ colors }) => css`
        position: relative;
        z-index: 1;
        color: ${colors.content};
        background: linear-gradient(
            ${("," + colors.background + hexAlpha(compact ? 0.6 : 0.5))
              .repeat(2)
              .slice(1)},
            ${colors.background}
          ),
          fixed no-repeat url(/background.webp) ${colors.background};
        background-size: cover;
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
          overflow-y: ${compact ? "visible" : "auto"};
        `}
      >
        <div
          css={css`
            flex: 0 0;
          `}
        >
          <AppLayoutTopBar compact={compact} />
        </div>
        <div
          onScroll={handleScroll}
          css={({ colors }) => css`
            flex: 1 1;
            display: flex;
            flex-direction: column;
            overflow-y: ${compact ? "auto" : "visible"};

            /* Using a positioned :after rather than an outline,
             * so that it doesn’t get cut by the top bar. */
            &:after {
              position: absolute;
              inset: 8gu 0;
              z-index: 2;
              border: 2px solid ${colors.focus};
            }
            &:focus-visible:after {
              content: "";
            }
            &:focus:not(:focus-visible):after {
              content: none;
            }
          `}
        >
          {children}
        </div>
        <div
          css={css`
            flex: 0 0;
          `}
        >
          <AppLayoutBottomBar />
        </div>
      </div>
    </div>
  )
}
