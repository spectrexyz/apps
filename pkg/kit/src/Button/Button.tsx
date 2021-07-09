/** @jsx jsx */
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { createContext, useContext } from "react"
import { jsx, css } from "@emotion/react"
import useDimensions from "react-cool-dimensions"
import { ButtonArea } from "../ButtonArea"
import { Moire } from "../Moire"
import { gu } from "../styles"
import { useTheme } from "../Theme"

export const ICON_SIZE_DEFAULT = 3 * gu

const SHADOW_OFFSET = 3

const ButtonContext = createContext(false)

type ButtonMode =
  | "primary"
  | "primary-2"
  | "secondary"
  | "flat"
  | "flat-2"
  | "flat-3" // dark blue
type ButtonSize = "medium" | "small"
type ShadowInBox = false | true | "width" | "height"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  // adjust the label alignment (i.e. makes all caps button labels appear centered)
  adjustLabelAlignment?: boolean
  disabled?: boolean
  horizontalPadding?: number
  icon?: ReactNode
  label: string
  mode: ButtonMode
  onClick?: () => void
  // wether the shadow should be part of the button box or not
  shadowInBox?: ShadowInBox
  size?: ButtonSize
  wide?: boolean
}

export function Button({
  adjustLabelAlignment = true,
  horizontalPadding,
  icon,
  label,
  mode = "secondary",
  onClick = () => {},
  shadowInBox = false,
  size = "medium",
  wide = false,
  ...props
}: ButtonProps): JSX.Element {
  const { colors } = useTheme()
  const shadowBounds = useDimensions()
  const flat = mode === "flat" || mode === "flat-2" || mode === "flat-3"

  const hShift = shadowInBox === "width" || shadowInBox === true
  const vShift = shadowInBox === "height" || shadowInBox === true

  const heightBase = size === "small" ? 4 * gu : 5.5 * gu
  const fontSize = size === "small" ? "14px" : "18px"
  if (horizontalPadding === undefined) {
    horizontalPadding = size === "small" ? 1.5 * gu : 2 * gu
  }

  return (
    <ButtonContext.Provider value={true}>
      <ButtonArea
        type="button"
        onClick={onClick}
        {...props}
        css={({ colors }) => css`
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${wide ? "100%" : "auto"};
          height: ${heightBase + (vShift ? SHADOW_OFFSET : 0)}px;
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
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          `}
        >
          <div
            className="surface"
            css={({ colors }) => css`
              position: relative;
              z-index: 2;
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              padding: 0 ${horizontalPadding}px;
              font-size: ${fontSize};
              color: ${(() => {
                if (mode === "flat") return colors.accent
                if (mode === "flat-2") return colors.accent
                if (mode === "flat-3") return colors.accent
                if (mode === "primary") return colors.accentContent
                if (mode === "primary-2") return colors.accent2Content
                // secondary
                return colors.accent
              })()};
              background: ${(() => {
                if (mode === "flat") return colors.layer2
                if (mode === "flat-2") return colors.layer1
                if (mode === "flat-3") return colors.background
                if (mode === "primary") return colors.accent
                if (mode === "primary-2") return colors.accent2
                // secondary
                return colors.background
              })()};
              border-style: solid;
              border-width: ${flat ? "0" : "1px"};
              border-color: ${(() => {
                if (mode === "primary-2") return colors.accent2
                return colors.accent
              })()};
            `}
          >
            {icon && (
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  height: 100%;
                  padding-right: 1gu;
                `}
              >
                {icon}
              </div>
            )}
            <div
              css={css`
                position: relative;
                top: ${adjustLabelAlignment ? "-1px" : "0"};
                flex-grow: 1;
                text-align: center;

                /* ellipsis */
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              `}
            >
              {label}
            </div>
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
                  background: ${mode === "primary-2"
                    ? colors.accent2
                    : colors.accent};
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
                  linesColor={mode === "primary-2" ? colors.accent2 : undefined}
                  scale={0.8}
                />
              </div>
            </div>
          )}
        </div>
      </ButtonArea>
    </ButtonContext.Provider>
  )
}

export function useInsideButton() {
  return useContext(ButtonContext)
}
