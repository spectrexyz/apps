import type { ReactNode } from "react"

import { colord } from "colord"
import FocusTrap from "focus-trap-react"
import { a, useTransition } from "react-spring"
import { css } from "@emotion/react"
import { gu, springs } from "../styles"
import { IconX } from "../icons"
import { ButtonArea } from "../ButtonArea"
import { Root } from "../Root"
import { useTheme } from "../Theme"
import { checkBackdropFilterSupport } from "../utils"

type ModalProps = {
  children: ReactNode
  onClose: () => void
  mode?: "normal" | "large" | "translucid"
  visible: boolean
}

export function Modal({
  children,
  onClose,
  visible,
  mode = "normal",
}: ModalProps): JSX.Element | null {
  const { colors } = useTheme()

  const visibility = useTransition(visible, {
    config: springs.appear,
    from: { blur: 0, opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },

    // blur: 1 as a separate step is being used to reveal the blurred
    // background, after having let enough time for engines to render it.
    enter: [{ opacity: 1, transform: "scale3d(1, 1, 1)" }, { blur: 1 }],

    leave: { blur: 0, opacity: 0, transform: "scale3d(1.1, 1.1, 1)" },
  })

  const supportsBackdropFilters = checkBackdropFilterSupport()

  return (
    <Root>
      {visibility(
        ({ blur, opacity, transform }, item) =>
          item && (
            <a.section
              style={{ opacity, pointerEvents: visible ? "auto" : "none" }}
              css={css`
                position: absolute;
                z-index: 2;
                inset: 0;
                overflow: auto;
                background: ${colord(colors.background)
                  .alpha(mode === "large" ? 0.8 : 0.6)
                  .toHex()};
              `}
            >
              {/* No need for keyboard support here since this is handled elsewhere */}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                onMouseDown={({ target, currentTarget }) => {
                  if (target === currentTarget) {
                    onClose()
                  }
                }}
                css={css`
                  display: grid;
                  place-items: center;
                  min-height: 100%;
                `}
              >
                {/* No need for keyboard support here since this is handled elsewhere */}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                  onMouseDown={({ target, currentTarget }) => {
                    if (target === currentTarget) {
                      onClose()
                    }
                  }}
                  css={css`
                    position: relative;
                    z-index: 2;
                    padding: 4gu;
                    @media (max-width: 600px) {
                      padding: ${mode === "large" ? "0" : css`4gu`};
                    }
                  `}
                >
                  <FocusTrap
                    active={visible}
                    focusTrapOptions={{
                      onDeactivate: onClose,
                      allowOutsideClick: true,
                    }}
                  >
                    <a.div
                      style={{ transform }}
                      css={({ colors }) =>
                        css`
                          width: ${mode === "large" ? "600px" : "auto"};
                          @media (max-width: 600px) {
                            width: ${mode === "large" ? "100%" : "auto"};
                          }

                          max-width: ${mode === "large" ? "100%" : "360px"};
                          padding: ${mode === "large"
                            ? css`3gu 5gu 5gu`
                            : css`3gu`};
                          @media (max-width: 600px) {
                            padding: 3gu;
                          }
                          ${mode === "translucid"
                            ? css`
                                background: ${colord(colors.translucid)
                                  .alpha(supportsBackdropFilters ? 0.6 : 1)
                                  .toHex()};
                                backdrop-filter: blur(40px);
                                border-radius: 6px;
                              `
                            : css`
                                background: ${mode === "large"
                                  ? colors.background
                                  : colors.layer1};
                              `}
                        `
                      }
                    >
                      <a.div
                        style={{
                          opacity: blur.to((v) => 1 - v),
                        }}
                        css={css`
                          display: ${mode === "translucid" &&
                          supportsBackdropFilters
                            ? "block"
                            : "none"};
                          position: absolute;
                          z-index: 1;
                          inset: 0;
                          background: rgb(43, 44, 97);
                          border-radius: 6px;
                        `}
                      />
                      <div
                        css={css`
                          position: relative;
                          z-index: 2;
                        `}
                      >
                        <div
                          css={css`
                            display: flex;
                            justify-content: flex-end;
                          `}
                        >
                          <ButtonArea
                            onClick={onClose}
                            css={css`
                              position: relative;
                              display: flex;
                              width: 2.5gu;
                              height: 2.5gu;
                              &:active {
                                top: 1px;
                                left: 1px;
                              }
                            `}
                          >
                            <IconX
                              size={2.5 * gu}
                              color={colors.contentDimmed}
                            />
                          </ButtonArea>
                        </div>
                        {children}
                      </div>
                    </a.div>
                  </FocusTrap>
                </div>
              </div>
            </a.section>
          )
      )}
    </Root>
  )
}
