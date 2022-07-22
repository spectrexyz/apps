/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconTwitterLogoProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconTwitterLogo({
  color,
  size,
  ...props
}: IconTwitterLogoProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M6 25s5-1 6-4c0 0-8-3-6-14 0 0 4 5 10 6v-2a5 5 0 0 1 9.584-2H30l-4 4c0 7-5 14-14 14-4 0-6-2-6-2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
