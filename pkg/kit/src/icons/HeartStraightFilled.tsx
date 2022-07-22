/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconHeartStraightFilledProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconHeartStraightFilled({
  color,
  size,
  ...props
}: IconHeartStraightFilledProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M28.078 6.488a7.443 7.443 0 0 0-5.382-2.486 7.587 7.587 0 0 0-5.498 2.194L16 7.394l-.937-.937C12.147 3.538 7.4 3.293 4.49 5.92a7.497 7.497 0 0 0-.292 10.884l10.388 10.388a2.002 2.002 0 0 0 2.828 0l10.13-10.129c2.917-2.918 3.157-7.663.534-10.575Z"
        fill={color}
      />
    </svg>
  )
}
