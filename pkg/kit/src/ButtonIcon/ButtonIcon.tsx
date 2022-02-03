import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ButtonAreaProps } from "../ButtonArea"
import { ThemeContext } from "../Theme/Theme"

import { createContext, forwardRef, useCallback, useContext } from "react"
import { css } from "@emotion/react"
import { ButtonArea } from "../ButtonArea"
import { gu } from "../styles"

type ButtonIconMode = "normal" | "outline"
type ButtonIconSize = "medium" | "small"

type ButtonIconProps = ButtonAreaProps & {
  disabled?: boolean
  external?: boolean
  href?: ComponentPropsWithoutRef<"a">["href"]
  icon: ReactNode
  label: string
  mode?: ButtonIconMode
  size?: ButtonIconSize
}

const ButtonIconContext = createContext<null | {
  size: ButtonIconSize
}>(null)

export const ButtonIcon = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonIconProps
>(function ButtonIcon(
  {
    disabled,
    external,
    href,
    icon,
    label,
    mode = "normal",
    onClick,
    size = "medium",
    ...props
  },
  ref
) {
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
  }, [disabled, external, href, onClick])

  const sharedCssStyles = ({ colors }: ThemeContext) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${size === "small" ? css`3gu` : css`5gu`};
    height: ${size === "small" ? css`3gu` : css`5gu`};
    color: ${mode === "outline" ? colors.accent : colors.content};
    background: ${mode === "outline" ? colors.background : "transparent"};
    border: ${mode === "outline" ? "1px" : "0"} solid ${colors.accent};
    outline-offset: ${mode === "outline" ? "-1px" : "-2px"};
    &:active {
      transform: translate(1px, 1px);
    }
    &:disabled {
      opacity: 0.5;
      &:active {
        transform: none;
      }
    }
  `

  return (
    <ButtonIconContext.Provider value={{ size }}>
      {href ? (
        <a {...anchorProps()} css={sharedCssStyles}>
          {icon}
        </a>
      ) : (
        <ButtonArea
          ref={ref}
          disabled={disabled}
          onClick={onClick}
          title={label}
          {...props}
          css={sharedCssStyles}
        >
          {icon}
        </ButtonArea>
      )}
    </ButtonIconContext.Provider>
  )
})

export function useButtonIconIconSize() {
  const context = useContext(ButtonIconContext)
  if (!context) return null
  return context.size === "small" ? 2 * gu : 3 * gu
}
