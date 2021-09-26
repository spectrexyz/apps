/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import React from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconSquaresFourProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconSquaresFour({
  color,
  size,
  ...props
}: IconSquaresFourProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M14 6H6v8h8V6zM26 6h-8v8h8V6zM14 18H6v8h8v-8zM26 18h-8v8h8v-8z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
