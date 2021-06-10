/** @jsx jsx */
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

import { jsx, css } from "@emotion/react"
import useMeasure from "react-use-measure"
import { Moire } from "../Moire"
import { theme } from "../styles"

type ButtonMode = "outline" | "filled" | "outline-alt" | "filled-alt"

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label: string
  mode: ButtonMode
}

export function Button({ mode = "outline", label, ...props }: ButtonProps) {
  const baseColor = mode.endsWith("-alt") ? theme.secondary : theme.primary
  const filled = mode.startsWith("filled")
  const [buttonRef, buttonBounds] = useMeasure()

  return (
    <button
      type="button"
      ref={buttonRef}
      {...props}
      css={css`
        position: relative;
        display: inline-grid;
        place-items: center;
        height: 5.5gu;
        cursor: pointer;
        outline: 0;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        padding: 0;
        border: 0;
        background: none;
        &::-moz-focus-inner {
          border: 0;
        }
        &:active {
          .label {
            transform: translate(2.5px, 2.5px);
          }
          .active-shadow {
            opacity: 1;
          }
          &:disabled {
            .label {
              transform: none;
            }
            .active-shadow {
              opacity: 0;
            }
          }
        }
      `}
    >
      <div
        className="label"
        css={css`
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          padding: 0 1.5gu;
          color: ${filled ? theme.background : theme.content};
          background: ${filled ? baseColor : theme.background};
          border: 1px solid ${baseColor};
        `}
      >
        {label}
      </div>
      <div
        css={css`
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translate(5px, 5px);
          pointer-events: none;
        `}
      >
        <div
          className="active-shadow"
          css={css`
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${baseColor};
            opacity: 0;
          `}
        />
        <Moire
          width={buttonBounds.width}
          height={buttonBounds.height}
          scale={0.8}
        />
      </div>
    </button>
  )
}
