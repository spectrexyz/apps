import { ReactNode, useState } from "react"
import useDimensions from "react-cool-dimensions"
import { a, useSpring, useTransition } from "react-spring"

import { ButtonArea } from "../ButtonArea"
import { IconCaretDown } from "../icons"
import { gu, springs } from "../styles"

type DetailsProps = {
  children: ReactNode
  contextual: ReactNode
  heading: ReactNode
  headingBaseWidth?: string
}

export function Details({
  children,
  contextual,
  heading,
  headingBaseWidth,
}: DetailsProps) {
  const [opened, setOpened] = useState(false)
  const contentBounds = useDimensions()

  const fullWidth = headingBaseWidth === undefined

  const opening = useTransition(opened, {
    config: springs.snappy,
    from: { headingWidth: 0, contentHeight: 0 },
    enter: fullWidth
      ? { headingWidth: 1, contentHeight: 1 }
      : [{ headingWidth: 1 }, { contentHeight: 1 }],
    leave: fullWidth
      ? { headingWidth: 0, contentHeight: 0 }
      : [{ contentHeight: 0 }, { headingWidth: 0 }],
  })

  const { arrowRotationTransform } = useSpring({
    config: springs.snappy,
    arrowRotationTransform: opened ? "rotate(180deg)" : "rotate(0deg)",
  })

  return (
    <section
      css={{
        position: "relative",
      }}
    >
      <header
        css={({ colors }) => ({
          position: "relative",
          background: fullWidth ? colors.layer2 : "transparent",
        })}
      >
        {!fullWidth
          && opening(
            ({ headingWidth }, opened) =>
              opened && (
                <a.div
                  style={{
                    transform: headingWidth.to((v) => `scaleX(${v})`),
                  }}
                  css={({ colors }) => ({
                    position: "absolute",
                    zIndex: "1",
                    inset: "0",
                    left: "calc(50% - 5gu / 2)",
                    background: colors.layer2,
                    transformOrigin: "0 0",
                  })}
                />
              ),
          )}
        <div
          css={{
            position: "relative",
            zIndex: "2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "6gu",
          }}
        >
          <h1
            css={{
              width: headingBaseWidth ?? "100%",
            }}
          >
            <ButtonArea
              onClick={() => setOpened((v) => !v)}
              css={({ colors }) => ({
                display: "flex",
                alignItems: "center",
                gap: "1gu",
                width: "100%",
                height: "6gu",
                padding: "0 2gu",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: colors.accent2,
                background: colors.layer2,
              })}
            >
              {heading}
              <a.div
                style={{ transform: arrowRotationTransform }}
                css={{
                  display: "flex",
                  alignItems: "center",
                  transformOrigin: "50% 50%",
                }}
              >
                <IconCaretDown size={2 * gu} />
              </a.div>
            </ButtonArea>
          </h1>
          {opening(
            ({ contentHeight }, opened) =>
              opened && contextual && (
                <a.div
                  style={{ opacity: contentHeight }}
                  css={{
                    paddingRight: "2gu",
                  }}
                >
                  {contextual}
                </a.div>
              ),
          )}
        </div>
      </header>
      {opening(
        ({ contentHeight }, opened) =>
          opened && (
            <a.div
              style={{
                height: contentHeight.to(
                  (v) => `${v * contentBounds.height}px`,
                ),
              }}
              css={({ colors }) => ({
                position: "relative",
                overflow: "hidden",
                background: colors.layer2,
              })}
            >
              <div
                ref={contentBounds.observe}
                css={{
                  position: "absolute",
                  bottom: "0",
                }}
              >
                <a.div
                  style={{ opacity: contentHeight.to([0, 0.8, 1], [0, 0, 1]) }}
                  css={{
                    padding: "1gu 2gu 2gu",
                  }}
                >
                  {children}
                </a.div>
              </div>
            </a.div>
          ),
      )}
    </section>
  )
}
