/** @jsx jsx */
import type { ReactNode } from "react"
import type { ButtonAreaProps } from "../ButtonArea"

import { forwardRef } from "react"
import { jsx, css } from "@emotion/react"
import { ButtonArea } from "../ButtonArea"
import { gu } from "../styles"

type ButtonIconProps = ButtonAreaProps & {
  icon: ReactNode
  mode?: "solid" | "outline"
  size?: "medium" | "small"
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ButtonIcon(
    { icon, mode = "solid", size = "medium", ...props },
    ref
  ) {
    return (
      <ButtonArea
        ref={ref}
        {...props}
        css={({ colors }) => css`
          position: relative;
          width: ${(size === "small" ? 4 : 6) * gu}px;
          height: ${(size === "small" ? 4 : 6) * gu}px;
          color: ${mode === "outline" ? colors.primary : colors.background};
          background: ${mode === "outline"
            ? colors.background
            : colors.primary};
          &:active {
            transform: translate(1px, 1px);
          }
          &:before {
            display: ${mode === "outline" ? "block" : "none"};
            content: "";
            position: absolute;
            inset: 0;
            border: ${size === "small" ? 1 : 3}px solid ${colors.primary};
          }
        `}
      >
        {icon}
      </ButtonArea>
    )
  }
)
