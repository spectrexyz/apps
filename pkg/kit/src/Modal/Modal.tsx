/** @jsx jsx */
import type { ReactNode } from "react"

import FocusTrap from "focus-trap-react"
import { a, useTransition } from "react-spring"
import { css, jsx } from "@emotion/react"
import { gu, springs } from "../styles"
import { IconX } from "../icons"
import { ButtonArea } from "../ButtonArea"
import { Root } from "../Root"
import { useTheme } from "../Theme"

type ModalProps = {
  children: ReactNode
  onClose: () => void
  visible: boolean
}

export function Modal({
  children,
  onClose,
  visible,
}: ModalProps): JSX.Element | null {
  const { colors } = useTheme()

  const visibility = useTransition(visible, {
    config: springs.appear,
    from: { opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
    enter: { opacity: 1, transform: "scale3d(1, 1, 1)" },
    leave: { opacity: 0, transform: "scale3d(1.1, 1.1, 1)" },
  })

  return (
    <Root>
      {visibility(
        ({ opacity, transform }, item) =>
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
              <div
                onClick={({ target, currentTarget }) => {
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
                        background: ${colors.layer1};
                      `
                    }
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
                  </a.div>
                </FocusTrap>
              </div>
              <div
                onClick={() => onClose()}
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
