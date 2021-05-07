/** @jsx jsx */
import type { ReactNode } from "react"
import type { ButtonAreaProps } from "../ButtonArea"

import { jsx, css } from "@emotion/react"
import { ButtonArea } from "../ButtonArea"
import { theme } from "../styles"

type ButtonIconProps = ButtonAreaProps & {
  icon: ReactNode
  mode?: "solid" | "outline"
}

export function ButtonIcon({
  icon,
  mode = "solid",
  ...props
}: ButtonIconProps) {
  return (
    <ButtonArea
      {...props}
      css={css`
        position: relative;
        width: 6gu;
        height: 6gu;
        color: ${mode === "outline" ? theme.primary : theme.background};
        background: ${mode === "outline" ? theme.background : theme.primary};
        &:active {
          transform: translate(1px, 1px);
        }
        &:before {
          display: ${mode === "outline" ? "block" : "none"};
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 3px solid ${theme.primary};
        }
      `}
    >
      {icon}
    </ButtonArea>
  )
}
