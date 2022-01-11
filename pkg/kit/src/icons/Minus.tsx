/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconMinusProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconMinus({
  color,
  size,
  ...props
}: IconMinusProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M5 16h22"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
