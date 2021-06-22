/** @jsx jsx */
import type { ComponentPropsWithoutRef } from "react"

import { jsx, css } from "@emotion/react"
import useDimensions from "react-cool-dimensions"
import { ButtonArea } from "../ButtonArea"
import { Moire } from "../Moire"
import { gu } from "../styles"

const SHADOW_OFFSET = 3

type ButtonMode = "primary" | "secondary" | "primary-2" | "flat" | "flat-2"
type ShadowInBox = false | true | "width" | "height"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  // adjust the label alignment (i.e. makes all caps button labels appear centered)
  adjustLabelAlignment?: boolean
  disabled?: boolean
  // wether the shadow should be part of the button box or not
  shadowInBox?: ShadowInBox
  horizontalPadding?: number
  label: string
  mode: ButtonMode
  onClick?: () => void
  wide?: boolean
}

export function Button({
  horizontalPadding = 1.5 * gu,
  label,
  mode = "secondary",
  onClick = () => {},
  shadowInBox = false,
  adjustLabelAlignment = true,
  wide = false,
  ...props
}: ButtonProps): JSX.Element {
  const shadowBounds = useDimensions()
  const flat = mode === "flat" || mode === "flat-2"

  const hShift = shadowInBox === "width" || shadowInBox === true
  const vShift = shadowInBox === "height" || shadowInBox === true

  return (
    <ButtonArea
      type="button"
      onClick={onClick}
      {...props}
      css={({ colors }) => css`
        display: inline-grid;
        place-items: center;
        width: ${wide ? "100%" : "auto"};
        height: calc(4gu + ${vShift ? SHADOW_OFFSET : 0}px);
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        padding-right: ${hShift ? SHADOW_OFFSET : 0}px;
        padding-bottom: ${vShift ? SHADOW_OFFSET : 0}px;
        &:focus-visible {
          outline: 0;
          .surface {
            outline: 2px solid ${colors.focus};
            outline-offset: -1px;
          }
          .shadow {
            opacity: 0;
          }
          .active-shadow {
            opacity: 1;
            background: ${colors.focus};
          }
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
        css={css`
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          className="surface"
          css={({ colors }) => css`
            position: relative;
            z-index: 2;
            display: grid;
            place-items: center;
            width: 100%;
            height: 100%;
            padding: 0 ${horizontalPadding}px;
            font-size: 14px;
            color: ${(() => {
              if (mode === "flat") return colors.accent
              if (mode === "flat-2") return colors.accent
              if (mode === "primary") return colors.accentContent
              // secondary
              return colors.accent
            })()};
            background: ${(() => {
              if (mode === "flat") return colors.layer2
              if (mode === "flat-2") return colors.layer1
              if (mode === "primary") return colors.accent
              // secondary
              return colors.background
            })()};
            border-color: ${colors.accent};
            border-style: solid;
            border-width: ${flat ? "0" : "1px"};
          `}
        >
          <span
            css={css`
              position: relative;
              top: ${adjustLabelAlignment ? "-2px" : "0"};
            `}
          >
            {label}
          </span>
        </div>
        {!flat && (
          <div
            css={css`
              position: absolute;
              z-index: 1;
              inset: 0;
              transform: translate(${SHADOW_OFFSET}px, ${SHADOW_OFFSET}px);
              pointer-events: none;
            `}
          >
            <div
              className="active-shadow"
              css={({ colors }) => css`
                position: absolute;
                inset: 0;
                background: ${colors.accent};
                opacity: 0;
              `}
            />
            <div
              ref={shadowBounds.observe}
              className="shadow"
              css={css`
                position: absolute;
                inset: 0;
                overflow: hidden;
              `}
            >
              <Moire
                width={Math.ceil(shadowBounds.width)}
                height={Math.ceil(shadowBounds.height)}
                scale={0.8}
              />
            </div>
          </div>
        )}
      </div>
    </ButtonArea>
  )
}
