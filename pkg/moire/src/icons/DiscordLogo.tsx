/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconDiscordLogoProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconDiscordLogo({
  color,
  size,
  ...props
}: IconDiscordLogoProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M12 19.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM20 19.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        fill={color}
      />
      <path
        d="M9.3 10A21.917 21.917 0 0 1 16 9a21.916 21.916 0 0 1 6.7 1M22.7 22a21.917 21.917 0 0 1-6.7 1 21.917 21.917 0 0 1-6.7-1"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m19.38 22.761 1.504 3.006a.997.997 0 0 0 1.123.526c3.068-.75 5.712-2.057 7.638-3.73a1.008 1.008 0 0 0 .31-1.05L25.706 7.358a1.002 1.002 0 0 0-.578-.639c-1.2-.491-2.44-.875-3.708-1.148a1.002 1.002 0 0 0-1.165.66l-.997 2.99M12.62 22.76l-1.504 3.007a.997.997 0 0 1-1.124.526c-3.067-.75-5.711-2.057-7.637-3.73a1.007 1.007 0 0 1-.309-1.05L6.293 7.358a1.003 1.003 0 0 1 .578-.64c1.2-.49 2.44-.874 3.708-1.147a1.002 1.002 0 0 1 1.165.66l.997 2.99"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
