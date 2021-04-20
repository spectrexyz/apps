/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Moire } from "../Moire"
import { colors } from "../styles"

type ButtonProps = {
  label: string
}

export function Button({ label }: ButtonProps) {
  return (
    <button
      type="button"
      css={css`
        position: relative;
        display: inline-grid;
        place-items: center;
        height: 5gu;
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
        &:active .label {
          transform: translate(2.5px, 2.5px);
        }
        &:active .active-shadow {
          opacity: 1;
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
          height: 100%;
          padding: 0 1.5gu;
          background: ${colors.background};
          border: 1px solid ${colors.primary};
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
            background: ${colors.primary};
            opacity: 0;
          `}
        />
        <Moire duration={6 * 60 * 1000} />
      </div>
    </button>
  )
}
