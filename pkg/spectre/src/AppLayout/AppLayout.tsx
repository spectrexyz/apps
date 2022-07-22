import type { ReactNode, UIEvent } from "react"

import { Global } from "@emotion/react"
import { useAppScrollUpdater } from "../App/AppScroll"
import { useLayout } from "../styles"
import { AppLayoutBottomBar } from "./AppLayoutBottomBar"
import { AppLayoutTopBar } from "./AppLayoutTopBar"

function hexAlpha(value: number) {
  return Math.round(value * 255)
    .toString(16)
    .padStart(2, "0")
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { updateAppScroll, appScrollRef } = useAppScrollUpdater()
  const handleScroll = (event: UIEvent) => {
    updateAppScroll(event.currentTarget.scrollTop)
  }

  const layout = useLayout()
  const compact = layout.below("large")

  return (
    <>
      <Global
        styles={{
          "html": {
            overflow: "hidden",
            minWidth: "360px",
            "@media (max-width: 360px)": {
              overflow: "auto",
            },
          },
        }}
      />
      <div
        css={({ colors }) => ({
          position: "relative",
          zIndex: "1",
          color: colors.content,
          background: `linear-gradient( ${
            ("," + colors.background + hexAlpha(compact ? 0.6 : 0.5)).repeat(2)
              .slice(1)
          }, ${colors.background}), fixed no-repeat url(/background.webp) ${colors.background}`,
          backgroundSize: "cover",
        })}
      >
        <div
          ref={compact ? undefined : appScrollRef}
          css={{
            position: "relative",
            minWidth: "360px",
            height: "100vh",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            overflowY: compact ? "visible" : "auto",
            scrollBehavior: "smooth",
          }}
        >
          <div
            css={{
              flex: "0 0",
            }}
          >
            <AppLayoutTopBar
              compact={compact}
              autoHideCompact={layout.name === "small"}
            />
          </div>
          <div
            ref={compact ? appScrollRef : undefined}
            onScroll={handleScroll}
            css={({ colors }) => ({
              flex: "1 1",
              display: "flex",
              flexDirection: "column",
              overflowY: compact ? "auto" : "visible",
              scrollBehavior: "smooth",

              // Using a positioned :after rather than an outline,
              // that it doesn’t get cut by the top bar.
              "&:after": {
                position: "absolute",
                inset: "8gu 0",
                zIndex: "2",
                border: `2px solid ${colors.focus}`,
              },
              "&:focus-visible:after": {
                content: "\"\"",
              },
              "&:focus:not(:focus-visible):after": {
                content: "none",
              },
            })}
          >
            {children}
          </div>
          <div
            css={{
              flex: "0 0",
            }}
          >
            <AppLayoutBottomBar compact={compact} />
          </div>
        </div>
      </div>
    </>
  )
}
