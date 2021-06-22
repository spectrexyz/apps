import type { SVGProps } from "react"
import React from "react"
import { useIconSize } from "../icons-utils"
type IconLifebuoyFilledProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconLifebuoyFilled({
  color = "currentColor",
  size,
  ...props
}: IconLifebuoyFilledProps) {
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M25.27 25.104a12.976 12.976 0 000-18.208.924.924 0 00-.166-.166 12.976 12.976 0 00-18.208 0 .924.924 0 00-.166.166 12.976 12.976 0 000 18.208 1.014 1.014 0 00.166.166 12.976 12.976 0 0018.208 0 .999.999 0 00.166-.166zM12 16a4 4 0 118 0 4 4 0 01-8 0zm11.035-8.45l-3.562 3.562a5.979 5.979 0 00-6.946 0L8.965 7.551a10.977 10.977 0 0114.07 0zm-14.07 16.9l3.562-3.562a5.98 5.98 0 006.946 0l3.562 3.561a10.977 10.977 0 01-14.07 0z"
        fill={color}
      />
    </svg>
  )
}
