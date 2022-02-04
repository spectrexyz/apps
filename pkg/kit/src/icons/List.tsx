/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconListProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconList({
  color,
  size,
  ...props
}: IconListProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M5 16h22M5 8h22M5 24h22"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
