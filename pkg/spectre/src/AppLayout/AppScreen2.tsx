import { useState, ReactNode } from "react"
import { css } from "@emotion/react"
import { a, useSpring } from "react-spring"
import { ButtonIcon, IconArrowLeft, gu, springs, useTheme } from "kit"
import { useLayout } from "../styles"
import { useAppScroll } from "../App/AppScroll"
import { useAppReady } from "../App/AppReady"

type AppScreenProps = {
  children: ReactNode
  compactBar: {
    contextual: ReactNode
    onBack: () => void
    title: string
    extraRow: boolean
  }
}

export function AppScreen({ children, compactBar }: AppScreenProps) {
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

  const layout = useLayout()
  const compactMenuActive = layout.below("large")
  const fullWidthActive = layout.below(601)

  return appReadyTransition(
    ({ progress, screenTransform }, ready) =>
      ready && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding-bottom: ${compactMenuActive ? 0 : 8 * gu}px;
          `}
        >
          {title && compactMenuActive && (
            <div
              css={css`
                height: 8gu;
              `}
            >
              <a.div
                style={{ transform: headerTransform }}
                css={({ colors }) => css`
                  position: ${snapHeader ? "absolute" : "static"};
                  inset: 8gu 0 auto;
                  z-index: 2;
                  display: flex;
                  align-items: center;
                  height: ${extraRow ? css`14gu` : css`8gu`};
                  background: ${colors.background};
                `}
              >
                <a.div
                  style={{ opacity: progress, transform: screenTransform }}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    transform-origin: 50% 0;
                    user-select: none;
                  `}
                >
                  <CompactBarHeader
                    title={title}
                    start={
                      onBack && (
                        <ButtonIcon
                          onClick={onBack}
                          icon={<IconArrowLeft color={colors.accent} />}
                          label="Back"
                          css={css`
                            width: 7gu;
                            height: 100%;
                          `}
                        />
                      )
                    }
                    end={contextual}
                  />
                  <div
                    css={css`
                      width: 100%;
                      height: 6gu;
                    `}
                  >
                    {extraRow}
                  </div>
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
          )}
          <a.div
            style={{ opacity: progress, transform: screenTransform }}
            css={css`
              flex-grow: 1;
              width: 100%;
              margin: 0 auto;
            `}
          >
            <div>{children}</div>
          </a.div>
        </div>
      )
  )
}

export function CompactBarHeader({ start, title, end }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 8gu;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        `}
      >
        {start && (
          <div
            css={css`
              display: flex;
              align-items: center;
              height: 100%;
            `}
          >
            {start}
          </div>
        )}
        <h1
          css={({ fonts }) => css`
            font-family: ${fonts.families.mono};
            font-size: 16px;
            text-transform: uppercase;
          `}
        >
          {title}
        </h1>
      </div>
      {end && (
        <div
          css={css`
            display: flex;
            width: 7gu;
            height: 100%;
            align-items: center;
            justify-content: center;
          `}
        >
          {end}
        </div>
      )}
    </div>
  )
}
