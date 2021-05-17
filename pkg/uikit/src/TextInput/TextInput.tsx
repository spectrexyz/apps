/** @jsx jsx */
import type { DetailedHTMLProps, InputHTMLAttributes } from "react"

import { jsx, css } from "@emotion/react"
import { theme } from "../styles"

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export function TextInput(props: TextInputProps) {
  return (
    <input
      css={css`
        height: 5.5gu;
        padding: 0 3gu;
        background: ${theme.background};
        border: 1px solid ${theme.secondary};
        color: ${theme.content};
        &:focus {
          outline: 2px solid ${theme.link};
        }
      `}
      {...props}
    />
  )
}
