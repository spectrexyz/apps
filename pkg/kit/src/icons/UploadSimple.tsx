import type { SVGProps } from "react"
import React from "react"
import { useIconSize } from "../icons-utils"
type IconUploadSimpleProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconUploadSimple({
  color = "currentColor",
  size,
  ...props
}: IconUploadSimpleProps) {
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M10.75 10.249L16 5l5.25 5.249M16 19V5.004M27 19v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
