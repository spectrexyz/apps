import type { ReactNode } from "react"

import { css } from "@emotion/react"
import { colord as co } from "colord"
import { createContext, useContext } from "react"
import { gu } from "../styles"
import { useTheme } from "../Theme"

type Mode = "normal" | "translucid"

type InfoProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  mode?: Mode
  title: ReactNode
}

const InfoTitleContext = createContext<null | { mode: Mode }>(null)

export function Info({
  children,
  className,
  icon,
  mode = "normal",
  title,
}: InfoProps): JSX.Element {
  return (
    <section
      className={className}
      css={({ colors }) =>
        css`
        padding: 3gu;
        background: ${
          mode === "translucid"
            ? co(colors.translucid).alpha(0.7).toHex()
            : colors.layer2
        };
        border-radius: ${mode === "translucid" ? "6px" : "0"};
      `}
    >
      <InfoTitleContext.Provider value={{ mode }}>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: ${mode === "translucid" ? css`1gu` : css`2gu`};
            padding-bottom: ${mode === "translucid" ? css`1gu` : css`2gu`};
          `}
        >
          {icon && (
            <div
              css={({ colors }) =>
                css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: ${mode === "translucid" ? css`3gu` : css`4gu`};
                height: ${mode === "translucid" ? css`3gu` : css`4gu`};
                color: ${
                  mode === "translucid"
                    ? colors.accent2
                    : colors.accent
                };
                background: ${
                  mode === "translucid"
                    ? "none"
                    : colors.background
                };
                border: ${
                  mode === "translucid"
                    ? "0"
                    : `1px solid ${colors.accent}`
                };
              `}
            >
              {icon}
            </div>
          )}
          <h1
            css={({ colors }) =>
              css`
              text-transform: uppercase;
              font-size: ${mode === "translucid" ? "16px" : "20px"};
              color: ${mode === "translucid" ? colors.accent2 : colors.content};
            `}
          >
            {title}
          </h1>
        </div>
      </InfoTitleContext.Provider>
      <div
        css={({ colors, fonts }) =>
          css`
          font-size: 14px;
          line-height: 1.8;
          color: ${
            mode === "translucid"
              ? colors.content
              : colors.contentHeading2
          };
          font-family: ${fonts.sans};
        `}
      >
        {children}
      </div>
    </section>
  )
}

export function useInsideInfoTitle(): boolean {
  return useContext(InfoTitleContext) !== null
}

export function useInfoTitleIconSize(): number | null {
  const context = useContext(InfoTitleContext)
  return context === null ? null : 3 * gu
}

export function useInfoTitleIconColor(): string | null {
  const context = useContext(InfoTitleContext)
  const { colors } = useTheme()
  if (!context) return null
  return context.mode === "translucid" ? colors.accent2 : colors.accent
}
