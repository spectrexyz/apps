/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconChecksProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconChecks({
  color,
  size,
  ...props
}: IconChecksProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m18.5 10.5-11 11L2 16M30 10.5l-11 11-2.922-2.922"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
