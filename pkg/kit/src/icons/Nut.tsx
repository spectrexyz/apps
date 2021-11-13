/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconNutProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconNut({
  color,
  size,
  ...props
}: IconNutProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M27.5 21.916V10.084a1 1 0 00-.508-.871l-10.5-5.935a1 1 0 00-.984 0l-10.5 5.935a1 1 0 00-.508.87v11.833a1 1 0 00.508.871l10.5 5.935a1 1 0 00.984 0l10.5-5.935a1 1 0 00.508-.87v0z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 20.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
