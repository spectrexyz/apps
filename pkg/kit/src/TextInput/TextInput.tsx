/** @jsx jsx */
import type { DetailedHTMLProps, InputHTMLAttributes } from "react"

import { jsx, css } from "@emotion/react"

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export function TextInput(props: TextInputProps): JSX.Element {
  return (
    <input
      css={({ colors }) => css`
        height: 5.5gu;
        padding: 0 3gu;
        background: ${colors.background};
        border: 1px solid ${colors.secondary};
        color: ${colors.content};
        &:focus {
          outline: 2px solid ${colors.link};
        }
      `}
      {...props}
    />
  )
}
