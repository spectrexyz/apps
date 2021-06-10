/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { gu } from "../styles"

export function IconArrowDown({
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
      viewBox="0 0 48 48"
      fill="none"
      css={css`
        display: block;
      `}
    >
      <path
        d="M23.0288 12.9695L23.0288 35.0305C23.0288 35.5659 23.4629 36 23.9983 36C24.5337 36 24.9677 35.5659 24.9677 35.0305L24.9677 12.9695C24.9677 12.434 24.5337 12 23.9983 12C23.4629 12 23.0288 12.434 23.0288 12.9695Z"
        fill={color}
        stroke={color}
      />
      <path
        d="M24.0002 33.6585L16.4128 26.0711C16.0342 25.6925 15.4203 25.6925 15.0417 26.0711C14.6632 26.4498 14.6632 27.0636 15.0417 27.4422L23.3146 35.7151C23.6932 36.0937 24.307 36.0937 24.6857 35.7151L32.9585 27.4422C33.1479 27.2529 33.2425 27.0048 33.2425 26.7566C33.2425 26.5085 33.1479 26.2604 32.9585 26.0711C32.5799 25.6925 31.9661 25.6925 31.5875 26.0711L24.0002 33.6585Z"
        fill={color}
        stroke={color}
      />
    </svg>
  )
}
