/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconShareProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconShare({
  color,
  size,
  ...props
}: IconShareProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m22 19 6-6-6-6M24 27H5a1 1 0 0 1-1-1V11"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.378 22A12.005 12.005 0 0 1 21 13h7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
