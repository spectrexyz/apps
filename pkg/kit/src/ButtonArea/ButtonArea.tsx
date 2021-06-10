/** @jsx jsx */
import type { ComponentPropsWithRef } from "react"

import { forwardRef } from "react"
import { jsx, css } from "@emotion/react"

export type ButtonAreaProps = ComponentPropsWithRef<"button"> & {
  onClick?: () => void
}

export const ButtonArea = forwardRef<HTMLButtonElement, ButtonAreaProps>(
  function ButtonArea({ onClick = () => {}, ...props }, ref) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        {...props}
        css={({ colors }) => css`
          display: block;
          padding: 0;
          border: 0;
          outline: 0;
          background: none;
          cursor: pointer;
          &::-moz-focus-inner {
            border: 0;
          }
          &:focus:not(:focus-visible) {
            outline: 0;
          }
          &:focus-visible {
            outline: 2px solid ${colors.focus};
          }
        `}
      />
    )
  }
)
