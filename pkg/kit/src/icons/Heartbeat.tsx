/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconHeartbeatProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconHeartbeat({
  color,
  size,
  ...props
}: IconHeartbeatProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M4 16h5l2-3 4 6 2-3h3"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.514 12a8.827 8.827 0 0 1-.014-.5A6.501 6.501 0 0 1 16 8.996h0A6.501 6.501 0 0 1 28.5 11.5C28.5 20 16 27 16 27s-4.993-2.796-8.668-7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
