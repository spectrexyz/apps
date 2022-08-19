import {
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  ReactNode,
  useContext,
} from "react"
import { ButtonArea, ButtonAreaProps } from "../ButtonArea"
import { gu } from "../styles"

export const ICON_SIZE_DEFAULT = 2.5 * gu

const ButtonTextContext = createContext(false)

type ButtonTextProps =
  & ComponentPropsWithoutRef<"button">
  & ComponentPropsWithoutRef<"a">
  & ButtonAreaProps
  & {
    icon?: ReactNode
    label: ReactNode
    onClick?: () => void
    uppercase?: boolean
  }

export const ButtonText = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonTextProps
>(function ButtonText({ icon, label, uppercase = true, ...props }, ref) {
  return (
    <ButtonArea
      ref={ref}
      {...props}
      css={({ colors }) => ({
        display: "inline-flex",
        alignItems: "center",
        textTransform: uppercase ? "uppercase" : "none",
        fontSize: "14px",
        color: colors.content,
        "&:active": {
          transform: "translate(1px, 1px)",
        },
      })}
    >
      <ButtonTextContext.Provider value={true}>
        {icon}
        <span css={{ paddingLeft: icon ? "1gu" : "0" }}>
          {label}
        </span>
      </ButtonTextContext.Provider>
    </ButtonArea>
  )
})

export function useInsideButtonText(): boolean {
  return useContext(ButtonTextContext)
}
