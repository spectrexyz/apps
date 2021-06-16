import type { SVGProps } from "react"
import React from "react"
import { useIconSize } from "../icons-utils"
type IconArrowLeftProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconArrowLeft({
  color = "currentColor",
  size,
  ...props
}: IconArrowLeftProps) {
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M27 16H5M14 7l-9 9 9 9"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
