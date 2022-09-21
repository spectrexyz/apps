/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconShieldCheckProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconShieldCheck({
  color,
  size,
  ...props
}: IconShieldCheckProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M5 13.333V6a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v7.333c0 10.502-8.913 13.982-10.693 14.572a.944.944 0 0 1-.614 0C13.913 27.315 5 23.835 5 13.333Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m21.5 12-7.333 7-3.667-3.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
