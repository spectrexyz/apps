import { ReactNode } from "react"
import { gu } from "../styles"

type BadgeProps = {
  alt?: string
  background?: string
  color?: string
  fontSize?: string
  icon?: string | ReactNode
  label: ReactNode
  uppercase?: boolean
}

export function Badge(
  {
    alt,
    background,
    color,
    icon,
    label,
    uppercase = true,
    fontSize = "18px",
  }: BadgeProps,
): JSX.Element {
  if (typeof icon === "string") {
    icon = <img alt="" src={icon} width={3 * gu} height={3 * gu} />
  }
  return (
    <div
      title={alt ?? (typeof label === "string" ? label : undefined)}
      css={({ colors }) => ({
        display: "flex",
        alignItems: "center",
        gap: "0.75gu",
        height: "4gu",
        padding: icon ? "0 2gu 0 0.5gu" : "0 1.5gu",
        color: color ? colors[color] ?? color : colors.accent2,
        background: background
          ? colors[background] ?? background
          : colors.translucid,
        borderRadius: "10gu",
        userSelect: "none",

        // ellipsis
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      })}
    >
      {icon}
      {typeof label === "string"
        ? (
          <span
            css={{
              fontSize,
              textTransform: uppercase ? "uppercase" : "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {label}
          </span>
        )
        : (
          label
        )}
    </div>
  )
}
