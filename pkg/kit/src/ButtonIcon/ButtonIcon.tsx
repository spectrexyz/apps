import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ButtonAreaProps } from "../ButtonArea"
import { ThemeContext } from "../Theme/Theme"

import { createContext, forwardRef, useCallback, useContext } from "react"
import { css } from "@emotion/react"
import { ButtonArea } from "../ButtonArea"
import { gu } from "../styles"

export const ICON_SIZE_DEFAULT = 3 * gu

const ButtonIconContext = createContext(false)

type ButtonIconMode = "normal" | "outline"

type ButtonIconProps = ButtonAreaProps & {
  disabled?: boolean
  external?: boolean
  href?: ComponentPropsWithoutRef<"a">["href"]
  icon: ReactNode
  label: string
  mode?: ButtonIconMode
}

export const ButtonIcon = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonIconProps
>(function ButtonIcon(
  { disabled, external, href, icon, label, mode = "normal", onClick, ...props },
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
    width: 5gu;
    height: 5gu;
    color: ${mode === "outline" ? colors.accent : colors.content};
    background: ${mode === "outline" ? colors.background : "transparent"};
    border: ${mode === "outline" ? "1px" : "0"} solid ${colors.accent};
    outline-offset: ${mode === "outline" ? "-1px" : "-2px"};
    &:active {
      transform: translate(1px, 1px);
    }
  `

  return (
    <ButtonIconContext.Provider value={true}>
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

export function useInsideButtonIcon(): boolean {
  return useContext(ButtonIconContext)
}
