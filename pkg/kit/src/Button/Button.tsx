import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { createContext, forwardRef, useContext, useMemo } from "react"
import useDimensions from "react-cool-dimensions"
import { ButtonArea } from "../ButtonArea"
import { Moire } from "../Moire"
import { gu } from "../styles"
import { useTheme } from "../Theme"

export const ICON_SIZE_DEFAULT = 3 * gu
export const ICON_SIZE_DEFAULT_SMALL = 2.5 * gu
export const ICON_SIZE_DEFAULT_COMPACT = 2.5 * gu

const SHADOW_OFFSET = 3

type ButtonContextType = null | { size: string }

const ButtonContext = createContext<ButtonContextType>(null)

export type ButtonMode =
  | "primary"
  | "primary-2"
  | "secondary"
  | "secondary-2"
  | "flat" // layer1
  | "flat-2" // layer2 (lighter)
  | "flat-3" // dark blue
  | "outline" // green
  | "outline-2" // purple
  | "outline-3" // orange
export type ButtonSize =
  | "medium"
  | "compact" // "compact" is a small button with large text
  | "small"
  | "mini"
export type ShadowInBox = false | true | "width" | "height"

export type ButtonProps =
  & ComponentPropsWithoutRef<"button">
  & ComponentPropsWithoutRef<"a">
  & {
    // adjust the label alignment (i.e. makes all caps button labels appear centered)
    adjustLabelAlignment?: boolean
    disabled?: boolean
    external?: boolean
    horizontalPadding?: number
    href?: ComponentPropsWithoutRef<"a">["href"]
    icon?: ReactNode
    label: string
    mode?: ButtonMode
    onClick?: () => void
    selected?: boolean
    // wether the shadow should be part of the button box or not
    shadowInBox?: ShadowInBox
    size?: ButtonSize
    uppercase?: boolean
    wide?: boolean
  }

export const Button = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    adjustLabelAlignment = true,
    disabled,
    external,
    horizontalPadding,
    href,
    icon,
    label,
    mode = "secondary",
    onClick,
    selected = false,
    shadowInBox = false,
    size = "medium",
    uppercase = false,
    wide = false,
    ...props
  },
  ref,
): JSX.Element {
  const hShift = shadowInBox === "width" || shadowInBox === true
  const vShift = shadowInBox === "height" || shadowInBox === true

  const heightBase = useMemo(() => {
    if (size === "mini") return 3 * gu
    if (size === "small") return 4 * gu
    if (size === "compact") return 4 * gu
    return 5.5 * gu
  }, [size])

  const fontSize = useMemo(() => {
    if (size === "mini") return "14px"
    if (size === "small") return "14px"
    if (size === "compact") return "16px"
    return "18px"
  }, [size])

  const { colors } = useTheme()
  const color = useMemo(() => {
    if (mode === "flat") return colors.accent
    if (mode === "flat-2") return colors.accent
    if (mode === "flat-3") return colors.accent
    if (mode === "primary") return colors.accentContent
    if (mode === "primary-2") return colors.accent2Content
    if (mode === "secondary-2") return colors.accent2
    if (mode === "outline-2") {
      return selected ? colors.accent2Content : colors.accent2
    }
    if (mode === "outline-3") return colors.warning
    return colors.accent // secondary
  }, [mode, selected])

  return (
    <ButtonContext.Provider value={{ size }}>
      <ButtonArea
        ref={ref}
        disabled={disabled}
        external={external}
        href={href}
        onClick={onClick}
        type={href ? undefined : "button"}
        {...props}
        css={({ colors, fonts }) => ({
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: wide ? "100%" : "auto",
          height: `${heightBase + (vShift ? SHADOW_OFFSET : 0)}px`,
          paddingRight: `${hShift ? SHADOW_OFFSET : 0}px`,
          paddingBottom: `${vShift ? SHADOW_OFFSET : 0}px`,
          textDecoration: "none",
          whiteSpace: "nowrap",
          fontSize: fontSize,
          fontFamily: fonts.mono,
          textTransform: uppercase ? "uppercase" : "none",
          color,
          "&:focus-visible": {
            outline: 0,
            ".surface": {
              outline: `2px solid ${colors.focus}`,
              outlineOffset: "-1px",
            },
            ".shadow": { opacity: 0 },
            ".active-shadow": {
              opacity: 1,
              background: colors.focus,
            },
          },
          "&:active": {
            ".surface": { transform: "translate(1.5px, 1.5px)" },
            ".shadow": { opacity: 0 },
            ".active-shadow": { opacity: 1 },
            "&:disabled": {
              ".surface": { transform: "none" },
              ".active-shadow": { opacity: 0 },
              ".shadow": { opacity: 1 },
            },
          },
        })}
      >
        <ButtonIn
          adjustLabelAlignment={adjustLabelAlignment}
          horizontalPadding={horizontalPadding}
          icon={icon}
          label={label}
          mode={mode}
          selected={selected}
          size={size}
        />
      </ButtonArea>
    </ButtonContext.Provider>
  )
})

type ButtonInProps =
  & Pick<
    ButtonProps,
    | "adjustLabelAlignment"
    | "horizontalPadding"
    | "icon"
    | "label"
    | "selected"
    | "size"
  >
  & Pick<Required<ButtonProps>, "mode">

function ButtonIn({
  adjustLabelAlignment,
  horizontalPadding,
  icon,
  label,
  mode,
  selected,
  size,
}: ButtonInProps) {
  const flat = mode.startsWith("flat")
  const shadowBounds = useDimensions()
  const { colors } = useTheme()

  const _horizontalPadding = useMemo(() => {
    if (horizontalPadding !== undefined) return horizontalPadding
    if (size === "mini") return 1 * gu
    if (size === "small") return 1.5 * gu
    if (size === "compact") return 1.25 * gu
    return 3 * gu
  }, [size, horizontalPadding])

  const background = useMemo(() => {
    if (mode === "flat") return colors.layer2
    if (mode === "flat-2") return colors.layer1
    if (mode === "flat-3") return colors.background
    if (mode === "primary") return colors.accent
    if (mode === "primary-2") return colors.accent2
    if (mode === "outline-2") return selected ? colors.accent2 : colors.layer2
    if (mode === "outline-3") return colors.background
    return colors.background // secondary, secondary-2
  }, [mode, selected])

  const borderColor = useMemo(() => {
    if (mode === "primary-2") return colors.accent2
    if (mode === "secondary-2") return colors.accent2
    if (mode === "outline-2") return colors.accent2
    if (mode === "outline-3") return colors.warning
    return colors.accent
  }, [mode])

  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="surface"
        css={{
          position: "relative",
          zIndex: "2",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: `0 ${_horizontalPadding}px`,
          background,
          borderStyle: "solid",
          borderWidth: flat ? "0" : "1px",
          borderColor,
        }}
      >
        {icon && (
          <div
            css={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              paddingRight: "1gu",
            }}
          >
            {icon}
          </div>
        )}
        <div
          css={{
            position: "relative",
            top: adjustLabelAlignment ? "-1px" : "0",
            flexGrow: "1",
            textAlign: "center",

            // ellipsis
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      </div>
      {!flat
        && mode !== "outline"
        && mode !== "outline-2"
        && mode !== "outline-3"
        && (
          <div
            css={{
              position: "absolute",
              zIndex: "1",
              inset: "0",
              transform: `translate(${SHADOW_OFFSET}px, ${SHADOW_OFFSET}px)`,
              pointerEvents: "none",
            }}
          >
            <div
              className="active-shadow"
              css={({ colors }) => ({
                position: "absolute",
                inset: "0",
                background: mode === "primary-2" || mode === "secondary-2"
                  ? colors.accent2
                  : colors.accent,
                opacity: "0",
              })}
            />
            <div
              ref={shadowBounds.observe}
              className="shadow"
              css={{
                position: "absolute",
                inset: "0",
                overflow: "hidden",
              }}
            >
              <Moire
                width={Math.ceil(shadowBounds.width)}
                height={Math.ceil(shadowBounds.height)}
                linesColor={mode === "primary-2" || mode === "secondary-2"
                  ? colors.accent2
                  : undefined}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export function useInsideButton(): ButtonContextType {
  return useContext(ButtonContext)
}
