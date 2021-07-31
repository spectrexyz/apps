import type { SVGProps } from "react"
import React from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconArrowSquareOutProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconArrowSquareOut({
  color,
  size,
  ...props
}: IconArrowSquareOutProps) {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M27 12.5l-.001-7.499L19.5 5M17.996 14.004l9-9M23 18v8a1 1 0 01-1 1H6a1 1 0 01-1-1V10a1 1 0 011-1h8"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
