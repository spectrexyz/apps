/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconArrowsDownUpProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconArrowsDownUp({
  color,
  size,
  ...props
}: IconArrowsDownUpProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M14 24l-4 4-4-4M10 4v24M18 8l4-4 4 4M22 28V4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
