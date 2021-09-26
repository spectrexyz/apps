/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import React from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconLifebuoyProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconLifebuoy({
  color,
  size,
  ...props
}: IconLifebuoyProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21a5 5 0 100-10 5 5 0 000 10zM12.464 12.464l-4.95-4.95M19.535 12.464l4.95-4.95M19.535 19.535l4.95 4.95M12.464 19.535l-4.95 4.95"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
