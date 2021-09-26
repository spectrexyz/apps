/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import React from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconCopyProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconCopy({
  color,
  size,
  ...props
}: IconCopyProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M21 21h6V5H11v6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 11H5v16h16V11z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
