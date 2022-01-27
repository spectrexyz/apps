import { ReactNode, useState } from "react"
import { css } from "@emotion/react"
import { a, useTransition } from "react-spring"
import {
  ButtonArea,
  IconCaretDown,
  IconCaretUp,
  gu,
  springs,
  useDimensions,
} from "kit"

export function Details({
  children,
  contextual,
  heading,
}: {
  children: ReactNode
  contextual: ReactNode
  heading: ReactNode
}) {
  const [opened, setOpened] = useState(false)

  const contentBounds = useDimensions()

  const opening = useTransition(opened, {
    config: {
      mass: 1,
      tension: 1600,
      friction: 80,
    },
    from: { headingWidth: 0, contentHeight: 0 },
    enter: [
      { headingWidth: 1, contentHeight: 0 },
      { headingWidth: 1, contentHeight: 1 },
    ],
    leave: [
      { headingWidth: 1, contentHeight: 0 },
      { headingWidth: 0, contentHeight: 0 },
    ],
  })

  return (
    <section
      css={css`
        position: relative;
      `}
    >
      <header
        css={css`
          position: relative;
        `}
      >
        {opening(
          ({ headingWidth }, opened) =>
            opened && (
              <a.div
                style={{
                  transform: headingWidth.to((v) => `scaleX(${v})`),
                }}
                css={({ colors }) => css`
                  position: absolute;
                  z-index: 1;
                  inset: 0;
                  left: calc(50% - 5gu / 2);
                  background: ${colors.layer2};
                  transform-origin: 0 0;
                `}
              />
            )
        )}
        <div
          css={css`
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 6gu;
          `}
        >
          <h1
            css={css`
              /* follow ContentLayoutSection with "two-parts" */
              width: calc(50% - 5gu / 2);
            `}
          >
            <ButtonArea
              onClick={() => setOpened((v) => !v)}
              css={({ colors }) => css`
                display: flex;
                align-items: center;
                gap: 1gu;
                width: 100%;
                height: 6gu;
                padding: 0 2gu;
                text-transform: uppercase;
                color: ${colors.accent2};
                background: ${colors.layer2};
              `}
            >
              {heading}
              {opened ? (
                <IconCaretUp size={2 * gu} />
              ) : (
                <IconCaretDown size={2 * gu} />
              )}
            </ButtonArea>
          </h1>
          {opening(
            ({ contentHeight }, opened) =>
              opened && (
                <a.div
                  style={{ opacity: contentHeight }}
                  css={css`
                    padding-right: 2gu;
                  `}
                >
                  {contextual}
                </a.div>
              )
          )}
        </div>
      </header>
      {opening(
        ({ contentHeight }, opened) =>
          opened && (
            <a.div
              style={{
                height: contentHeight.to(
                  (v) => `${v * contentBounds.height}px`
                ),
              }}
              css={({ colors }) => css`
                position: relative;
                overflow: hidden;
                background: ${colors.layer2};
              `}
            >
              <div
                ref={contentBounds.observe}
                css={css`
                  position: absolute;
                  bottom: 0;
                `}
              >
                <a.div
                  style={{ opacity: contentHeight }}
                  css={css`
                    padding: 1gu 2gu 2gu;
                  `}
                >
                  {children}
                </a.div>
              </div>
            </a.div>
          )
      )}
    </section>
  )
}
