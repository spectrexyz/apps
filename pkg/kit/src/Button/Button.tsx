/** @jsx jsx */
import type { ComponentPropsWithoutRef } from "react"

import { jsx, css } from "@emotion/react"
import useMeasure from "react-use-measure"
import { ButtonArea } from "../ButtonArea"
import { Moire } from "../Moire"
import { useTheme } from "../Theme"

type ButtonMode = "primary" | "secondary" | "primary-2" | "flat"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  disabled: boolean
  label: string
  mode: ButtonMode
}

export function Button({
  mode = "primary",
  label,
  ...props
}: ButtonProps): JSX.Element {
  const [buttonRef, buttonBounds] = useMeasure()

  const { colors } = useTheme()
  const baseColor = mode.endsWith("-alt") ? colors.secondary : colors.primary
  const filled = mode.startsWith("filled")

  return (
    <ButtonArea
      type="button"
      ref={buttonRef}
      {...props}
      css={css`
        position: relative;
        display: inline-grid;
        place-items: center;
        height: 4gu;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        &:focus-visible {
          outline: 0;
        }
        &:active {
          .surface {
            transform: translate(1.5px, 1.5px);
          }
          .shadow {
            opacity: 0;
          }
          .active-shadow {
            opacity: 1;
          }
          &:focus-visible {
            outline: 0;
            border-color: ${colors.focus};
          }
          &:disabled {
            .surface {
              transform: none;
            }
            .active-shadow {
              opacity: 0;
            }
            .shadow {
              opacity: 1;
            }
          }
        }
      `}
    >
      <div
        className="surface"
        css={css`
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          padding: 0 1.5gu;
          font-size: 14px;
          color: ${filled ? colors.background : baseColor};
          background: ${filled ? baseColor : colors.background};
          border: 1px solid ${baseColor};
        `}
      >
        <span
          css={css`
            position: relative;
            top: -2px;
          `}
        >
          {label}
        </span>
      </div>
      <div
        css={css`
          position: absolute;
          z-index: 1;
          inset: 0;
          transform: translate(3px, 3px);
          pointer-events: none;
        `}
      >
        <div
          className="active-shadow"
          css={css`
            position: absolute;
            inset: 0;
            background: ${baseColor};
            opacity: 0;
          `}
        />
        <div
          className="shadow"
          css={css`
            position: absolute;
            inset: 0;
          `}
        >
          <Moire
            width={buttonBounds.width}
            height={buttonBounds.height}
            scale={0.8}
          />
        </div>
      </div>
    </ButtonArea>
  )
}
