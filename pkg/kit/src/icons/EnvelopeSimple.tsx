/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconEnvelopeSimpleProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconEnvelopeSimple({
  color,
  size,
  ...props
}: IconEnvelopeSimpleProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M4 7h24v17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 7 16 18 4 7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
