/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconTelegramLogoProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconTelegramLogo({
  color,
  size,
  ...props
}: IconTelegramLogoProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m11 16.859 11.24 9.89a1 1 0 0 0 1.635-.526l4.702-20.517a1 1 0 0 0-1.34-1.154l-23.07 9.063a1 1 0 0 0 .17 1.911L11 16.86ZM11 16.86 28.014 4.57"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m16.613 21.799-3.906 3.906A1 1 0 0 1 11 24.998v-8.139"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
