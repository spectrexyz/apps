/** @jsx jsx */
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import type { ThemeContextValue } from "../Theme/Theme"

import { createContext, useCallback, useContext, useMemo } from "react"
import { jsx, css } from "@emotion/react"
import useDimensions from "react-cool-dimensions"
import { ButtonArea } from "../ButtonArea"
import { Moire } from "../Moire"
import { gu } from "../styles"
import { useTheme } from "../Theme"

export const ICON_SIZE_DEFAULT = 3 * gu
export const ICON_SIZE_DEFAULT_SMALL = 2.5 * gu
export const ICON_SIZE_DEFAULT_COMPACT = 2.5 * gu

const SHADOW_OFFSET = 3

const ButtonContext = createContext<null | { size: string }>(null)

type ButtonMode =
  | "primary"
  | "primary-2"
  | "secondary"
  | "flat"
  | "flat-2"
  | "flat-3" // dark blue
  | "outline"
type ButtonSize =
  | "medium"
  | "compact" // "compact" is a small button with large text
  | "small"
type ShadowInBox = false | true | "width" | "height"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  // adjust the label alignment (i.e. makes all caps button labels appear centered)
  adjustLabelAlignment?: boolean
  disabled?: boolean
  external?: boolean
  horizontalPadding?: number
  href?: ComponentPropsWithoutRef<"a">["href"]
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
  disabled,
  external,
  horizontalPadding,
  href,
  icon,
  label,
  mode = "secondary",
  onClick = () => {},
  shadowInBox = false,
  size = "medium",
  wide = false,
  ...props
}: ButtonProps): JSX.Element {
  const hShift = shadowInBox === "width" || shadowInBox === true
  const vShift = shadowInBox === "height" || shadowInBox === true

  const heightBase = useMemo(() => {
    if (size === "small") return 4 * gu
    if (size === "compact") return 4 * gu
    return 5.5 * gu
  }, [size])

  const anchorProps = useCallback<() => ComponentPropsWithoutRef<"a">>(() => {
    if (disabled) {
      return {}
    }
    const props = {
      href,
      onClick,
      rel: "noopener noreferrer",
    }
    return external ? { ...props, target: "_blank" } : props
  }, [disabled, external])

  const sharedCssStyles = ({ colors }: ThemeContextValue) => css`
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
  `

  return (
    <ButtonContext.Provider value={{ size }}>
      {href ? (
        <a href={href} {...anchorProps()} css={sharedCssStyles}>
          <ButtonIn
            adjustLabelAlignment={adjustLabelAlignment}
            horizontalPadding={horizontalPadding}
            icon={icon}
            label={label}
            mode={mode}
            size={size}
          />
        </a>
      ) : (
        <ButtonArea
          disabled={disabled}
          type="button"
          onClick={onClick}
          {...props}
          css={sharedCssStyles}
        >
          <ButtonIn
            adjustLabelAlignment={adjustLabelAlignment}
            horizontalPadding={horizontalPadding}
            icon={icon}
            label={label}
            mode={mode}
            size={size}
          />
        </ButtonArea>
      )}
    </ButtonContext.Provider>
  )
}

function ButtonIn({
  adjustLabelAlignment,
  horizontalPadding,
  icon,
  label,
  mode,
  size,
}: {
  adjustLabelAlignment: ButtonProps["adjustLabelAlignment"]
  horizontalPadding: ButtonProps["horizontalPadding"]
  icon: ButtonProps["icon"]
  label: ButtonProps["label"]
  mode: ButtonProps["mode"]
  size: ButtonProps["size"]
}) {
  const flat = mode.startsWith("flat")
  const shadowBounds = useDimensions()
  const { colors } = useTheme()

  const fontSize = useMemo(() => {
    if (size === "small") return "14px"
    return "18px"
  }, [size])

  const _horizontalPadding = useMemo(() => {
    if (horizontalPadding !== undefined) return horizontalPadding
    if (size === "small") return 1.5 * gu
    if (size === "compact") return 1.25 * gu
    return 2 * gu
  }, [size, horizontalPadding])

  return (
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
        css={({ colors, fonts }) => css`
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 0 ${_horizontalPadding}px;
          font-size: ${fontSize};
          font-family: ${fonts.families.mono};
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
      {!flat && mode !== "outline" && (
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
  )
}

export function useInsideButton() {
  return useContext(ButtonContext)
}
