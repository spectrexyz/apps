/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconArrowCounterClockwiseProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconArrowCounterClockwise({
  color,
  size,
  ...props
}: IconArrowCounterClockwiseProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M9.98 12.464h-6v-6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.222 23.778a11 11 0 1 0 0-15.556l-4.243 4.242"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
