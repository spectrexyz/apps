import type { ReactNode } from "react"
import type { ButtonAreaProps } from "../ButtonArea"

import { ButtonArea } from "../ButtonArea"
import { gu, theme } from "../styles"

type ButtonIconProps = ButtonAreaProps & {
  icon: ReactNode
  mode?: "solid" | "outline"
  size?: "medium" | "small"
}

export function ButtonIcon({
  icon,
  mode = "solid",
  size = "medium",
  ...props
}: ButtonIconProps) {
  return (
    <ButtonArea
      {...props}
      css={{
        position: "relative",
        width: `${(size === "small" ? 4 : 6) * gu}px`,
        height: `${(size === "small" ? 4 : 6) * gu}px`,
        color: mode === "outline" ? theme.primary : theme.background,
        background: mode === "outline" ? theme.background : theme.primary,
        "&:active": {
          transform: "translate(1px, 1px)",
        },
        "&:before": {
          display: mode === "outline" ? "block" : "none",
          content: "\"\"",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          border: `${size === "small" ? 1 : 3}px solid ${theme.primary}`,
        },
      }}
    >
      {icon}
    </ButtonArea>
  )
}
