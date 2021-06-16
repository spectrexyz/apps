import type { SVGProps } from "react"
import React from "react"
import { useIconSize } from "../icons-utils"
type IconChecksProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconChecks({
  color = "currentColor",
  size,
  ...props
}: IconChecksProps) {
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M18.5 10.5l-11 11L2 16M30 10.5l-11 11-2.922-2.922"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
