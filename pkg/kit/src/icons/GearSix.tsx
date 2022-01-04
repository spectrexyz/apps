/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconGearSixProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconGearSix({
  color,
  size,
  ...props
}: IconGearSixProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.538 11.45c.225-.475.487-.925.787-1.362l-.05-3.25c0-.3.125-.588.363-.788a12.968 12.968 0 0 1 3.95-2.288c.287-.1.6-.075.85.088l2.787 1.675a11.04 11.04 0 0 1 1.575 0l2.788-1.675c.262-.15.575-.188.862-.088a12.904 12.904 0 0 1 3.95 2.275.991.991 0 0 1 .35.788l-.05 3.25c.3.438.563.888.788 1.363l2.837 1.574c.263.15.45.4.5.7a12.94 12.94 0 0 1 0 4.55c-.05.3-.237.55-.5.7l-2.837 1.576A9.879 9.879 0 0 1 24.7 21.9l.05 3.25c0 .3-.125.588-.362.788a12.968 12.968 0 0 1-3.95 2.287c-.288.1-.6.075-.85-.088L16.8 26.462a11.04 11.04 0 0 1-1.575 0l-2.787 1.675c-.263.15-.575.188-.863.088a12.904 12.904 0 0 1-3.95-2.275.991.991 0 0 1-.35-.787l.05-3.25a9.879 9.879 0 0 1-.787-1.363L3.7 18.975a.997.997 0 0 1-.5-.7 12.94 12.94 0 0 1 0-4.55c.05-.3.238-.55.5-.7l2.838-1.575Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
