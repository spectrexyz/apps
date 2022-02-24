import type { ReactNode, RefObject } from "react"

import { colord } from "colord"
import FocusTrap from "focus-trap-react"
import { memo, useState } from "react"
import { usePopper } from "react-popper"
import { a, useTransition } from "react-spring"
import { ButtonArea } from "../ButtonArea"
import { IconX } from "../icons"
import { Root } from "../Root"
import { gu, springs } from "../styles"
import { useTheme } from "../Theme"
import { checkBackdropFilterSupport } from "../utils"

type PopupProps = {
  children: ReactNode
  closeButton?: boolean
  focusableContainer?: boolean
  mode?: "normal" | "translucid"
  onClose: () => void
  opener: RefObject<HTMLElement>
  visible: boolean
  width?: number
}

function offset({
  reference,
}: {
  reference: {
    width: number
    height: number
  }
}): [number, number] {
  return [reference.width / 2, -reference.height * 0.2]
}

export const Popup = memo(function Popup({
  children,
  closeButton = false,
  focusableContainer = true,
  mode = "normal",
  onClose,
  opener,
  visible,
  width = 40 * gu,
}: PopupProps): JSX.Element {
  const { colors } = useTheme()

  const visibility = useTransition(visible, {
    config: springs.swift,
    from: { blur: 0, opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
    enter: [{ opacity: 1, transform: "scale3d(1, 1, 1)" }, { blur: 1 }],
    leave: { blur: 0, opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
  })

  const supportsBackdropFilters = checkBackdropFilterSupport()

  return (
    <Root>
      {visibility(
        ({ blur, opacity, transform }, item) =>
          item && (
            <Position opener={opener} width={width}>
              <FocusTrap
                active={visible}
                focusTrapOptions={{
                  onDeactivate: onClose,
                  clickOutsideDeactivates: true,
                }}
              >
                <a.div
                  style={{
                    opacity,
                    pointerEvents: visible ? "auto" : "none",
                    transform,
                  }}
                  css={({ colors }) => (
                    mode === "translucid"
                      ? {
                        padding: "4gu",
                        background: colord(colors.translucid).alpha(
                          supportsBackdropFilters ? 0.6 : 1,
                        ).toHex(),
                        backdropFilter: "blur(40px)",
                        borderRadius: "6px",
                      }
                      : {
                        padding: "4gu",
                        background: colors.layer1,
                        border: `1px solid ${colors.outline}`,
                      }
                  )}
                >
                  <a.div
                    style={{
                      opacity: blur.to((v) => 1 - v),
                    }}
                    css={{
                      display: mode === "translucid" && supportsBackdropFilters
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
                    {closeButton && (
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
                          <IconX size={2.5 * gu} color={colors.contentDimmed} />
                        </ButtonArea>
                      </div>
                    )}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                    <div tabIndex={focusableContainer ? 0 : undefined}>
                      {children}
                    </div>
                  </div>
                </a.div>
              </FocusTrap>
            </Position>
          ),
      )}
    </Root>
  )
})

type PositionProps = {
  children: ReactNode
  opener: RefObject<HTMLElement>
  width: number
}

function Position({ opener, children, width }: PositionProps): JSX.Element {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const { styles: popperStyles, attributes: popperAttributes } = usePopper(
    opener.current,
    container,
    {
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset } }],
    },
  )

  return (
    <div
      ref={setContainer}
      style={popperStyles.popper}
      {...popperAttributes.popper}
      css={{
        zIndex: "2",
        width,
      }}
    >
      {children}
    </div>
  )
}
