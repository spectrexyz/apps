/** @jsx jsx */
import type { ReactNode } from "react"
import type { ButtonAreaProps } from "../ButtonArea"

import { createContext, forwardRef, useContext } from "react"
import { jsx, css } from "@emotion/react"
import { ButtonArea } from "../ButtonArea"
import { gu } from "../styles"

export const ICON_SIZE_DEFAULT = 3 * gu

const ButtonIconContext = createContext(false)

type ButtonIconProps = ButtonAreaProps & {
  icon: ReactNode
  label: string
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ButtonIcon({ icon, label, ...props }, ref) {
    return (
      <ButtonIconContext.Provider value={true}>
        <ButtonArea
          ref={ref}
          {...props}
          title={label}
          css={({ colors }) => css`
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 1gu;
            color: ${colors.content};
            outline-offset: -2px;
            &:active {
              transform: translate(1px, 1px);
            }
          `}
        >
          {icon}
        </ButtonArea>
      </ButtonIconContext.Provider>
    )
  }
)

export function useInsideButtonIcon() {
  return useContext(ButtonIconContext)
}
