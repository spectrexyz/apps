import type { ReactNode } from "react"

import { colord } from "colord"
import FocusTrap from "focus-trap-react"
import { a, useTransition } from "react-spring"
import { ButtonArea } from "../ButtonArea"
import { IconX } from "../icons"
import { Root } from "../Root"
import { gu, springs } from "../styles"
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
              css={{
                position: "absolute",
                zIndex: "2",
                inset: "0",
                overflow: "auto",
                background: colord(colors.background).alpha(
                  mode === "large" ? 0.8 : 0.6,
                ).toHex(),
              }}
            >
              {/* No need for keyboard support here since this is handled elsewhere */}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                onMouseDown={({ target, currentTarget }) => {
                  if (target === currentTarget) {
                    onClose()
                  }
                }}
                css={{
                  display: "grid",
                  placeItems: "center",
                  minHeight: "100%",
                }}
              >
                {/* No need for keyboard support here since this is handled elsewhere */}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                  onMouseDown={({ target, currentTarget }) => {
                    if (target === currentTarget) {
                      onClose()
                    }
                  }}
                  css={{
                    position: "relative",
                    zIndex: "2",
                    padding: "4gu",
                    "@media (max-width: 600px)": {
                      padding: mode === "large" ? "0" : "4gu",
                    },
                  }}
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
                      css={({ colors }) => ({
                        width: mode === "large" ? "600px" : "auto",
                        maxWidth: mode === "large" ? "100%" : "360px",
                        padding: mode === "large" ? "3gu 5gu 5gu" : "3gu",
                        outline: `2px solid ${colors.contrast}`,
                        "@media (max-width: 600px)": {
                          width: mode === "large" ? "100%" : "auto",
                          padding: "3gu",
                          outline: "0",
                        },
                        ...(
                          mode === "translucid"
                            ? {
                              background: colord(colors.translucid).alpha(
                                supportsBackdropFilters ? 0.6 : 1,
                              ).toHex(),
                              backdropFilter: "blur(40px)",
                              borderRadius: "6px",
                            }
                            : {
                              background: mode === "large"
                                ? colors.background
                                : colors.layer1,
                            }
                        ),
                      })}
                    >
                      <a.div
                        style={{
                          opacity: blur.to((v) => 1 - v),
                        }}
                        css={{
                          display:
                            mode === "translucid" && supportsBackdropFilters
                              ? "block"
                              : "none",
                          position: "absolute",
                          zIndex: "1",
                          inset: "0",
                          background: "rgb(43, 44, 97)",
                          borderRadius: "6px",
                        }}
                      />
                      <div
                        css={{
                          position: "relative",
                          zIndex: "2",
                        }}
                      >
                        <div
                          css={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <ButtonArea
                            onClick={onClose}
                            css={{
                              position: "relative",
                              display: "flex",
                              width: "2.5gu",
                              height: "2.5gu",
                              "&:active": {
                                top: "1px",
                                left: "1px",
                              },
                            }}
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
          ),
      )}
    </Root>
  )
}
