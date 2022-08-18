/* eslint-disable import/no-default-export */
import type { SVGProps } from "react"
import { useIconColor, useIconSize } from "../icons-utils"
type IconGearSixFilledProps = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}
export default function IconGearSixFilled({
  color,
  size,
  ...props
}: IconGearSixFilledProps): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M29.783 13.544a1.995 1.995 0 0 0-1-1.399l-2.565-1.424c-.164-.319-.344-.63-.537-.933l.049-2.936a1.991 1.991 0 0 0-.71-1.564 13.94 13.94 0 0 0-4.255-2.452 1.995 1.995 0 0 0-1.712.166l-2.516 1.51a11.511 11.511 0 0 0-1.076-.001L12.943 3a1.992 1.992 0 0 0-1.71-.167A13.94 13.94 0 0 0 6.982 5.29a1.995 1.995 0 0 0-.712 1.565l.05 2.934c-.195.302-.375.614-.54.932l-2.567 1.425a1.996 1.996 0 0 0-1 1.402 13.942 13.942 0 0 0 .004 4.907 1.995 1.995 0 0 0 1 1.399l2.565 1.424c.164.319.344.63.537.933l-.05 2.936a1.991 1.991 0 0 0 .711 1.564 13.942 13.942 0 0 0 4.255 2.453 1.995 1.995 0 0 0 1.711-.167l2.516-1.51c.359.018.72.018 1.077.002L19.057 29a1.989 1.989 0 0 0 1.71.167 13.94 13.94 0 0 0 4.251-2.458 1.995 1.995 0 0 0 .712-1.565l-.05-2.934c.195-.302.375-.614.54-.932l2.567-1.425a1.997 1.997 0 0 0 1-1.402 13.942 13.942 0 0 0-.004-4.907ZM21.5 16a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
        fill={color}
      />
    </svg>
  )
}
