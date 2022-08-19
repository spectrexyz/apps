/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconFlameProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconFlame({
  color,
  size,
  ...props
}: IconFlameProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M26 18C26 9 16 3 16 3S6 9 6 18a10 10 0 0 0 20 0Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 23a5 5 0 1 0 10 0c0-5-5-8-5-8s-5 3-5 8Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
