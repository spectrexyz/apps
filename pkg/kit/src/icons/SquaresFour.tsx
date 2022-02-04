/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconSquaresFourProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconSquaresFour({
  color,
  size,
  ...props
}: IconSquaresFourProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M14 6H6v8h8V6ZM26 6h-8v8h8V6ZM14 18H6v8h8v-8ZM26 18h-8v8h8v-8Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
