import { Button, ButtonIcon, gu, IconArrowLeft, springs, useTheme } from "kit"
import { ReactNode, useMemo, useState } from "react"
import { a, useSpring } from "react-spring"
import { useAppReady } from "../App/AppReady"
import { useAppScroll } from "../App/AppScroll"
import { useLayout } from "../styles"

export function AppScreen({
  children,
  contextual,
  mode = "normal",
  onBack,
  title,
}: {
  children: ReactNode
  contextual?: ReactNode
  mode?: "normal" | "minimal"
  onBack: () => void
  title: ReactNode
}) {
  const { colors } = useTheme()
  const { appReadyTransition } = useAppReady()

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

  const layout = useLayout()
  const compactMenuActive = layout.below("large")
  const fullWidthActive = layout.below(601)

  const contentPadding = useMemo(() => {
    if (mode === "minimal") return "0px"
    if (compactMenuActive) return `${2 * gu}px`
    return `0 ${4 * gu}px ${4 * gu}px`
  }, [])

  return appReadyTransition(
    ({ progress, screenTransform }, ready) =>
      ready && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            paddingBottom: `${compactMenuActive ? 0 : 8 * gu}px`,
          }}
        >
          {title && compactMenuActive
            ? (
              <div
                css={{
                  height: "8gu",
                }}
              >
                <a.div
                  style={{ transform: headerTransform }}
                  css={{
                    position: snapHeader ? "absolute" : "static",
                    zIndex: "2",
                    inset: "8gu 0 auto",
                    display: "flex",
                    alignItems: "center",
                    height: "8gu",
                  }}
                >
                  <a.div
                    style={{ opacity: progress, transform: screenTransform }}
                    css={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      transformOrigin: "50% 0",
                      userSelect: "none",
                    }}
                  >
                    <HeaderCompact
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
            )
            : (
              <div
                css={{
                  display: "flex",
                  width: "100%",
                  maxWidth: "calc(160gu + 4gu * 2)",
                  margin: "0 auto",
                  padding: "5.25gu 4gu 0",
                }}
              >
                {onBack && (
                  <Button
                    label="Back"
                    onClick={onBack}
                    size="compact"
                    mode="outline"
                    icon={<IconArrowLeft />}
                  />
                )}
              </div>
            )}
          <a.div
            style={{ opacity: progress, transform: screenTransform }}
            css={({ colors }) => ({
              flexGrow: "1",
              transformOrigin: "50% 0",
              width: "100%",
              maxWidth: fullWidthActive || mode === "minimal"
                ? "none"
                : "500px",
              margin: "0 auto",
              background: fullWidthActive || mode === "minimal"
                ? "none"
                : colors.background,
            })}
          >
            {!compactMenuActive && mode !== "minimal" && (
              <div
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "3gu 4gu",
                }}
              >
                <h1
                  css={{
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </h1>
                <div
                  css={{
                    height: "100%",
                    flexGrow: "0",
                    flexShrink: "0",
                  }}
                >
                  {contextual}
                </div>
              </div>
            )}
            <div
              css={{
                padding: contentPadding,
              }}
            >
              {children}
            </div>
          </a.div>
        </div>
      ),
  )
}

function HeaderCompact({
  end,
  start,
  title,
}: {
  end: ReactNode
  start: ReactNode
  title: ReactNode
}) {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
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
        <div
          css={({ fonts }) => ({
            fontFamily: fonts.mono,
            fontSize: "16px",
            textTransform: "uppercase",
          })}
        >
          {title}
        </div>
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
