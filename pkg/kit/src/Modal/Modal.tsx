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
  mode?: "normal" | "translucid"
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
                display: grid;
                align-items: center;
                justify-content: center;
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
                        max-width: 360px;
                        padding: 3gu;
                        ${mode === "translucid"
                          ? css`
                              background: ${colord(colors.translucid)
                                .alpha(supportsBackdropFilters ? 0.6 : 1)
                                .toHex()};
                              backdrop-filter: blur(40px);
                              border-radius: 6px;
                            `
                          : css`
                              background: ${colors.layer1};
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
                          <IconX size={2.5 * gu} color={colors.contentDimmed} />
                        </ButtonArea>
                      </div>
                      {children}
                    </div>
                  </a.div>
                </FocusTrap>
              </div>
              {/* No need for keyboard support here since this is handled elsewhere */}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                onMouseDown={() => onClose()}
                css={({ colors }) => css`
                  position: fixed;
                  z-index: 1;
                  inset: 0;
                  background: ${colors.background};
                  opacity: 0.6;
                `}
              />
            </a.section>
          )
      )}
    </Root>
  )
}
