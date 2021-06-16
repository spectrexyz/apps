import type { SVGProps } from "react"
import React from "react"
import { useIconSize } from "../icons-utils"
type IconArrowRightProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconArrowRight({
  color = "currentColor",
  size,
  ...props
}: IconArrowRightProps) {
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M5 16h22M18 7l9 9-9 9"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
