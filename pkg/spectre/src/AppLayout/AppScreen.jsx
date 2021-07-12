import { useState } from "react"
import { css } from "@emotion/react"
import { a, useSpring } from "react-spring"
import { Button, ButtonIcon, IconArrowLeft, gu, springs, useTheme } from "kit"
import { useLayout } from "../styles.js"
import { useAppScroll } from "../App/AppScroll.jsx"
import { useAppReady } from "../App/AppReady.jsx"
import { AppScreenCompactHeader } from "./AppScreenCompactHeader.jsx"

export function AppScreen({ onBack, title, contextual, children }) {
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
  const compactMenu = layout.below("large")
  const fullWidth = layout.below(601)

  return appReadyTransition(
    ({ progress, screenTransform }, ready) =>
      ready && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding-bottom: ${compactMenu ? 0 : 8 * gu}px;
          `}
        >
          {title && compactMenu ? (
            <div
              css={css`
                height: 8gu;
              `}
            >
              <a.div
                style={{ transform: headerTransform }}
                css={({ colors }) => css`
                  position: ${snapHeader ? "absolute" : "static"};
                  z-index: 2;
                  inset: 8gu 0 auto;
                  display: flex;
                  align-items: center;
                  height: 8gu;
                `}
              >
                <a.div
                  style={{ opacity: progress, transform: screenTransform }}
                  css={css`
                    display: flex;
                    width: 100%;
                    height: 100%;
                    transform-origin: 50% 0;
                    user-select: none;
                  `}
                >
                  <AppScreenCompactHeader
                    title={title}
                    start={
                      onBack && (
                        <ButtonIcon
                          onClick={onBack}
                          icon={<IconArrowLeft color={colors.accent} />}
                          label="Back"
                          css={css`
                            height: 100%;
                            padding: 0 2gu;
                          `}
                        />
                      )
                    }
                    end={contextual}
                  />
                  <a.div
                    style={{ opacity: headerBorderVisibility }}
                    css={({ colors }) => css`
                      position: absolute;
                      inset: auto 0 0;
                      border-bottom: 1px solid ${colors.outline2};
                    `}
                  />
                </a.div>
              </a.div>
            </div>
          ) : (
            <div
              css={css`
                display: flex;
                width: 100%;
                max-width: calc(142gu + 4gu * 2);
                margin: 0 auto;
                padding: 5.25gu 4gu 0;
              `}
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
            css={({ colors }) => css`
              flex-grow: 1;
              transform-origin: 50% 0;
              width: 100%;
              max-width: ${fullWidth ? "none" : "500px"};
              margin: 0 auto;
              background: ${fullWidth ? "none" : colors.background};
            `}
          >
            {!compactMenu && (
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 3gu 4gu;
                `}
              >
                <h1
                  css={css`
                    text-transform: uppercase;
                  `}
                >
                  {title}
                </h1>
                <div>{contextual}</div>
              </div>
            )}
            <div
              css={css`
                padding: ${compactMenu ? 2 * gu : 4 * gu}px;
              `}
            >
              {children}
            </div>
          </a.div>
        </div>
      )
  )
}
