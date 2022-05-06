import type { ReactNode } from "react"

import { ButtonIcon, gu, IconArrowLeft, springs, useTheme } from "kit"
import { useEffect, useRef, useState } from "react"
import { a, useSpring, useTransition } from "react-spring"
import { useAppReady } from "../App/AppReady"
import { useAppScroll } from "../App/AppScroll"
import { useLayout } from "../styles"

type AppScreenProps = {
  children: ReactNode
  compactBar:
    | false
    | null
    | {
      contextual?: ReactNode
      onBack: () => void
      title?: ReactNode
      extraRow?: ReactNode
    }
  loading?: boolean | ReactNode
}

export function AppScreen(
  { children, compactBar, loading = false }: AppScreenProps,
) {
  const { colors } = useTheme()
  const { appReadyTransition } = useAppReady()

  const hasCompactBar = Boolean(compactBar)

  const [shouldSnapHeader, setShouldSnapHeader] = useState(false)
  useAppScroll((scroll) => setShouldSnapHeader(scroll > 2 * gu))
  const snapHeader = shouldSnapHeader && hasCompactBar

  const { contextual, onBack, title, extraRow } = compactBar || {}

  const { headerTransform, headerBorderVisibility } = useSpring({
    config: springs.appear,
    headerTransform: snapHeader
      ? `translate3d(0, -${8 * gu}px, 0)`
      : "translate3d(0, 0px, 0)",
    headerBorderVisibility: Number(snapHeader),
  })

  const [hasBeenLoading, setHasBeenLoading] = useState(false)
  useEffect(() => {
    if (loading) {
      setHasBeenLoading(true)
    }
  }, [loading])

  const childrenTransitions = useTransition(!loading, {
    from: hasBeenLoading
      ? {
        opacity: 0,
        transformOrigin: "50% 0",
        transform: "translateY(2px) scale(0.98)",
      }
      : undefined,
    enter: {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
  })
  const loaderTransitions = useTransition(Boolean(loading), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  })

  const layout = useLayout()
  const compactMenuActive = layout.below("large")

  return appReadyTransition(
    ({ progress, screenTransform }, ready) =>
      ready && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            paddingBottom: `${compactMenuActive ? 4 * gu : 8 * gu}px`,
          }}
        >
          {title && compactMenuActive && (
            <div css={{ height: "8gu" }}>
              <a.div
                style={{ transform: headerTransform }}
                css={({ colors }) => ({
                  position: snapHeader ? "absolute" : "static",
                  inset: "8gu 0 auto",
                  zIndex: "2",
                  display: "flex",
                  alignItems: "center",
                  height: extraRow ? "14gu" : "8gu",
                  background: colors.background,
                })}
              >
                <a.div
                  style={{ opacity: progress, transform: screenTransform }}
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    transformOrigin: "50% 0",
                    userSelect: "none",
                  }}
                >
                  <CompactBarHeader
                    title={title}
                    start={onBack && (
                      <ButtonIcon
                        onClick={onBack}
                        icon={<IconArrowLeft color={colors.accent} />}
                        label="Back"
                        css={{
                          width: "7gu",
                          height: "100%",
                        }}
                      />
                    )}
                    end={contextual}
                  />
                  {extraRow && (
                    <div
                      css={{
                        width: "100%",
                        height: "6gu",
                      }}
                    >
                      {extraRow}
                    </div>
                  )}
                  <a.div
                    style={{ opacity: headerBorderVisibility }}
                    css={({ colors }) => ({
                      position: "absolute",
                      inset: "auto 0 0",
                      borderBottom: `1px solid ${colors.outline2}`,
                    })}
                  />
                </a.div>
              </a.div>
            </div>
          )}
          <a.div
            style={{ opacity: progress, transform: screenTransform }}
            css={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
              }}
            >
              {childrenTransitions((styles, item) =>
                item && (
                  <a.div style={styles}>
                    {children}
                  </a.div>
                )
              )}
              {loaderTransitions((styles, item) =>
                item && (
                  <a.div
                    style={styles}
                    css={({ colors }) => ({
                      position: "absolute",
                      inset: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      color: colors.content,
                    })}
                  >
                    Loading…
                  </a.div>
                )
              )}
            </div>
          </a.div>
        </div>
      ),
  )
}

export function CompactBarHeader({
  end,
  start,
  title,
}: {
  end?: ReactNode
  start?: ReactNode
  title: ReactNode
}) {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "8gu",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {start && (
          <div
            css={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            {start}
          </div>
        )}
        <h1
          css={({ fonts }) => ({
            fontFamily: fonts.mono,
            fontSize: "16px",
            textTransform: "uppercase",
          })}
        >
          {title}
        </h1>
      </div>
      {end && (
        <div
          css={{
            display: "flex",
            width: "7gu",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {end}
        </div>
      )}
    </div>
  )
}
