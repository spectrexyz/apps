import type { SVGProps } from "react"
import React from "react"
import { useIconSize } from "../icons-utils"
type IconCheckProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconCheck({
  color = "currentColor",
  size,
  ...props
}: IconCheckProps) {
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M27 9L13 23l-7-7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
