/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { gu } from "../styles"

export function IconCards({ size = 6 * gu, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      css={css`
        display: block;
      `}
    >
      <rect x="12" y="12" width="15" height="15" fill={color} />
      <rect x="21" y="21" width="15" height="15" fill={color} />
    </svg>
  )
}
