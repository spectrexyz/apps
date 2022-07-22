/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconHeartStraightProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconHeartStraight({
  color,
  size,
  ...props
}: IconHeartStraightProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m16.707 26.485 10.13-10.129c2.488-2.489 2.855-6.583.5-9.199a6.501 6.501 0 0 0-9.433-.253L16 8.808l-1.644-1.644c-2.489-2.489-6.583-2.856-9.199-.5a6.5 6.5 0 0 0-.253 9.432l10.389 10.39a1 1 0 0 0 1.414 0v0Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
