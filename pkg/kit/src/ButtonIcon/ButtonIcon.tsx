import {
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
} from "react"
import { ButtonAreaProps } from "../ButtonArea"
import { ButtonArea } from "../ButtonArea"
import { gu } from "../styles"
import { ThemeContext } from "../Theme/Theme"

type ButtonIconMode = "normal" | "outline"
type ButtonIconSize = "large" | "medium" | "small"

type ButtonIconProps = ButtonAreaProps & {
  disabled?: boolean
  external?: boolean
  href?: ComponentPropsWithoutRef<"a">["href"]
  icon: ReactNode
  label: string
  mode?: ButtonIconMode
  size?: ButtonIconSize
}

const ButtonIconContext = createContext<
  null | {
    size: ButtonIconSize
  }
>(null)

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
    size = "large",
    ...props
  },
  ref,
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

  let cssSize = "5gu"
  if (size === "small") cssSize = "3gu"
  if (size === "medium") cssSize = "4gu"

  const sharedCssStyles = ({ colors }: ThemeContext) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: cssSize,
    height: cssSize,
    color: mode === "outline" ? colors.accent : colors.content,
    background: mode === "outline" ? colors.background : "transparent",
    border: `${mode === "outline" ? "1px" : "0"} solid ${colors.accent}`,
    outlineOffset: mode === "outline" ? "-1px" : "-2px",
    "&:active": {
      transform: "translate(1px, 1px)",
    },
    "&:disabled": {
      color: colors.contentDimmed,
      borderColor: colors.contentDimmed,
      "&:active": {
        transform: "none",
      },
    },
  })

  return (
    <ButtonIconContext.Provider value={{ size }}>
      {href
        ? (
          <a {...anchorProps()} css={sharedCssStyles}>
            {icon}
          </a>
        )
        : (
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
  if (context.size === "small") return 2.5 * gu
  if (context.size === "medium") return 2.5 * gu
  return 3 * gu
}
