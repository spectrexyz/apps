/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconGithubLogoProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconGithubLogo({
  color,
  size,
  ...props
}: IconGithubLogoProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M10.5 29a3 3 0 0 0 3-3v-6M21.5 29a3 3 0 0 1-3-3v-6M19 20h2a3 3 0 0 1 3 3v1a3 3 0 0 0 3 3M13 20h-2a3 3 0 0 0-3 3v1a3 3 0 0 1-3 3M8.064 9.588A6.488 6.488 0 0 1 8.5 4a6.495 6.495 0 0 1 5.478 3v0h4.044v0A6.495 6.495 0 0 1 23.5 4a6.487 6.487 0 0 1 .436 5.588v0A5.972 5.972 0 0 1 25 13v1a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6v-1a5.972 5.972 0 0 1 1.064-3.412h0Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
