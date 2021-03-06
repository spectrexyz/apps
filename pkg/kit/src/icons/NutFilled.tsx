/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconNutFilledProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconNutFilled({
  color,
  size,
  ...props
}: IconNutFilledProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m27.484 8.342-10.5-5.934a2.01 2.01 0 0 0-1.968 0l-10.5 5.934A2.003 2.003 0 0 0 3.5 10.083v11.833a2.004 2.004 0 0 0 1.016 1.742l10.5 5.934a2.011 2.011 0 0 0 1.968 0l10.5-5.934a2.004 2.004 0 0 0 1.016-1.742V10.083a2.004 2.004 0 0 0-1.016-1.74ZM16 20.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
        fill={color}
      />
    </svg>
  )
}
