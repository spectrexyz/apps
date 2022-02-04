/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconFlameFilledProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconFlameFilled({
  color,
  size,
  ...props
}: IconFlameFilledProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M21.724 6.435a27.614 27.614 0 0 0-5.21-4.293 1 1 0 0 0-1.028 0 27.614 27.614 0 0 0-5.21 4.293C6.824 10.06 5 14.058 5 18a11 11 0 1 0 22 0c0-3.942-1.824-7.94-5.276-11.565ZM12 23c0-3.46 2.816-5.91 4-6.787 1.185.878 4 3.328 4 6.787a4 4 0 1 1-8 0Z"
        fill={color}
      />
    </svg>
  )
}
