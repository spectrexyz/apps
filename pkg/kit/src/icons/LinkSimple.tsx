/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconLinkSimpleProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconLinkSimple({
  color,
  size,
  ...props
}: IconLinkSimpleProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m11.757 20.241 8.485-8.485M18.12 22.364l-3.535 3.535A6 6 0 0 1 6.1 17.414l3.535-3.536M22.364 18.12l3.535-3.535A6 6 0 0 0 17.414 6.1l-3.536 3.535"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
