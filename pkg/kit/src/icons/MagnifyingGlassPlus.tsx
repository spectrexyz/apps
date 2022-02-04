/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconMagnifyingGlassPlusProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconMagnifyingGlassPlus({
  color,
  size,
  ...props
}: IconMagnifyingGlassPlusProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M10.5 14.5h8M14.5 10.5v8M14.5 25C20.299 25 25 20.299 25 14.5 25 8.7 20.299 4 14.5 4 8.7 4 4 8.7 4 14.5 4 20.299 8.7 25 14.5 25ZM21.924 21.925 28 28"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
