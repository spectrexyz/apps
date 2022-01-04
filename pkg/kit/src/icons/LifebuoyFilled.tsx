/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconSize, useIconColor } from "../icons-utils"
type IconLifebuoyFilledProps = SVGProps<SVGSVGElement> & {
  color?: string,
  size?: number,
}
export default function IconLifebuoyFilled({
  color,
  size,
  ...props
}: IconLifebuoyFilledProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M25.27 25.104a12.976 12.976 0 0 0 0-18.208.924.924 0 0 0-.166-.166 12.976 12.976 0 0 0-18.208 0 .924.924 0 0 0-.166.166 12.976 12.976 0 0 0 0 18.208 1.014 1.014 0 0 0 .166.166 12.976 12.976 0 0 0 18.208 0 .999.999 0 0 0 .166-.166ZM12 16a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm11.035-8.45-3.562 3.562a5.979 5.979 0 0 0-6.946 0L8.965 7.551a10.977 10.977 0 0 1 14.07 0Zm-14.07 16.9 3.562-3.562a5.98 5.98 0 0 0 6.946 0l3.562 3.561a10.977 10.977 0 0 1-14.07 0Z"
        fill={color}
      />
    </svg>
  )
}
