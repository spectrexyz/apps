/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { gu } from "../styles"

export function IconClose({
  size = 6 * gu,
  color = "currentColor",
}: {
  size: number
  color: string
}): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      css={css`
        display: block;
      `}
    >
      <path
        d="M15.667 4 4 15.667M15.667 15.667 4 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
