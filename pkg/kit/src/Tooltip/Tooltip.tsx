/** @jsx jsx */
import type { ReactNode, RefObject } from "react"

import { memo } from "react"
import FocusTrap from "focus-trap-react"
import { a, useTransition } from "react-spring"
import { css, jsx } from "@emotion/react"
import { usePopper } from "react-popper"
import { useState } from "react"
import { Root } from "../Root"
import { springs } from "../styles"

type TooltipProps = {
  children: ReactNode
  onClose: () => void
  opener: RefObject<HTMLElement>
  visible: boolean
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

export const Tooltip = memo(function Tooltip({
  children,
  onClose,
  opener,
  visible,
}: TooltipProps): JSX.Element {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const { styles: popperStyles, attributes: popperAttributes } = usePopper(
    opener.current,
    container,
    {
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset } }],
    }
  )

  const visibility = useTransition(visible, {
    config: springs.swift,
    from: { opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
    enter: { opacity: 1, transform: "scale3d(1, 1, 1)" },
    leave: { opacity: 0, transform: "scale3d(1.1, 1.1, 1)" },
  })

  return (
    <Root>
      {visibility(
        ({ opacity, transform }, item) =>
          item && (
            <FocusTrap
              active={visible}
              focusTrapOptions={{
                onDeactivate: onClose,
                clickOutsideDeactivates: true,
              }}
            >
              <div
                ref={setContainer}
                style={popperStyles.popper}
                {...popperAttributes.popper}
                css={css`
                  z-index: 2;
                  width: 40gu;
                `}
              >
                <a.div
                  style={{
                    opacity,
                    pointerEvents: visible ? "auto" : "none",
                    transform,
                  }}
                  css={({ colors }) => css`
                    background: ${colors.layer1};
                    border: 1px solid ${colors.outline};
                  `}
                >
                  <div>
                    <div tabIndex={0}>{children}</div>
                  </div>
                </a.div>
              </div>
            </FocusTrap>
          )
      )}
    </Root>
  )
})
