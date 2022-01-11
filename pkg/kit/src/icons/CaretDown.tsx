/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconCaretDownProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconCaretDown({
  color,
  size,
  ...props
}: IconCaretDownProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M26 12 16 22 6 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
