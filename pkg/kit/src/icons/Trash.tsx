/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconTrashProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconTrash({
  color,
  size,
  ...props
}: IconTrashProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M27 7H5M13 13v8M19 13v8M25 7v19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7M21 7V5a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
