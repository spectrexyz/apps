/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconWarningOctagonProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconWarningOctagon({
  color,
  size,
  ...props
}: IconWarningOctagonProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 10v7M20.556 4h-9.112a1 1 0 0 0-.708.293l-6.443 6.443a1 1 0 0 0-.293.708v9.112a1 1 0 0 0 .293.707l6.443 6.444a1 1 0 0 0 .708.293h9.112a1 1 0 0 0 .707-.293l6.444-6.444a1 1 0 0 0 .293-.707v-9.112a1 1 0 0 0-.293-.708l-6.444-6.443A1 1 0 0 0 20.556 4Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 22.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        fill={color}
      />
    </svg>
  )
}
