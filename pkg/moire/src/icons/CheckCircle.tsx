/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconCheckCircleProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconCheckCircle({
  color,
  size,
  ...props
}: IconCheckCircleProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m21.5 13-7.333 7-3.667-3.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
