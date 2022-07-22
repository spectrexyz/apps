/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconPencilProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconPencil({
  color,
  size,
  ...props
}: IconPencilProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M11.586 27H6a1 1 0 0 1-1-1v-5.586a1 1 0 0 1 .293-.707l15-15a1 1 0 0 1 1.414 0l5.586 5.586a1 1 0 0 1 0 1.414l-15 15a1.002 1.002 0 0 1-.707.293ZM17 8l7 7M11.936 26.936l-6.872-6.872"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
