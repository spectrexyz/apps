import type { ReactNode } from "react"

import { createContext, useContext } from "react"
import { css } from "@emotion/react"
import { useTheme } from "../Theme"
import { gu } from "../styles"

const InfoTitleContext = createContext(false)

type InfoProps = {
  children: ReactNode
  icon?: ReactNode
  title: ReactNode
}

export function Info({ children, icon, title }: InfoProps): JSX.Element {
  return (
    <section
      css={({ colors }) => css`
        padding: 3gu;
        background: ${colors.layer2};
      `}
    >
      <InfoTitleContext.Provider value={true}>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 2gu;
            padding-bottom: 2gu;
          `}
        >
          {icon && (
            <div
              css={({ colors }) => css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 4gu;
                height: 4gu;
                background: ${colors.background};
                border: 1px solid ${colors.accent};
              `}
            >
              {icon}
            </div>
          )}
          <h1
            css={css`
              text-transform: uppercase;
              font-size: 20px;
            `}
          >
            {title}
          </h1>
        </div>
      </InfoTitleContext.Provider>
      <div
        css={({ colors, fonts }) => css`
          font-size: 14px;
          line-height: 1.8;
          color: ${colors.contentHeading2};
          font-family: ${fonts.families.sans};
        `}
      >
        {children}
      </div>
    </section>
  )
}

export function useInsideInfoTitle(): boolean {
  return useContext(InfoTitleContext)
}

export function useInfoTitleIconSize(): number {
  return 3 * gu
}

export function useInfoTitleIconColor(): string {
  return useTheme().colors.accent
}
