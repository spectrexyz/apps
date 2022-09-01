import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

import { theme } from "../styles"

export type ButtonAreaProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function ButtonArea(props: ButtonAreaProps) {
  return (
    <button
      {...props}
      css={{
        display: "block",
        padding: "0",
        border: "0",
        outline: "0",
        background: "none",
        cursor: "pointer",
        "&::-moz-focus-inner": {
          border: "0",
        },
        "&:focus:not(:focus-visible)": {
          outline: "0",
        },
        "&:focus-visible": {
          outline: `2px solid ${theme.background}`,
          boxShadow: `0 0 0 4px ${theme.primary}`,
        },
      }}
    />
  )
}
