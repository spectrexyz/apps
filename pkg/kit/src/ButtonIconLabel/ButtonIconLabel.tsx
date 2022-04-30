import type { ReactNode } from "react"

import { ButtonIcon } from "../ButtonIcon"

export function ButtonIconLabel({
  compact = false,
  disabled = false,
  href,
  icon,
  label,
  labelFull = label,
  labelPosition = "bottom",
  onClick,
}: {
  compact?: boolean
  disabled?: boolean
  href?: string
  icon: ReactNode
  label: string
  labelFull?: string
  labelPosition?: "left" | "bottom"
  onClick?: () => void
}) {
  return (
    <div
      title={labelFull}
      css={{
        display: "flex",
        flexDirection: labelPosition === "bottom" ? "column" : "row-reverse",
        gap: "1.5gu",
      }}
    >
      <ButtonIcon
        disabled={disabled}
        external={Boolean(href)}
        href={href}
        icon={icon}
        label={labelFull}
        mode="outline"
        onClick={onClick}
        size={compact ? "medium" : "large"}
      />
      {!compact && (
        <div
          css={({ colors, fonts }) => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            fontFamily: fonts.sans,
            textTransform: "uppercase",
            color: colors.contentDimmed,
            userSelect: "none",
          })}
        >
          {label}
        </div>
      )}
    </div>
  )
}
