import type { ReactNode } from "react"

import { createContext, useContext, useMemo } from "react"
import { Button } from "../Button"
import { ButtonText } from "../ButtonText"
import { IconInfo } from "../icons"
import { gu } from "../styles"
import { useTheme } from "../Theme"

export const ICON_SIZE_DEFAULT = 2.25 * gu

const TipContext = createContext<null | number>(null)

export function Tip(
  {
    cancelLabel = "Cancel",
    children,
    confirmLabel = "Confirm",
    icon,
    onCancel,
    onConfirm,
    title,
    type = "info",
  }: {
    cancelLabel?: string
    children: ReactNode
    confirmLabel?: string
    icon?: ReactNode
    onCancel?: () => void
    onConfirm?: () => void
    title: ReactNode
    type?: "info" | "warning"
  },
) {
  const { colors } = useTheme()

  const [color, background] = useMemo(() => {
    if (type === "warning") {
      return [colors.warning, colors.warningSurface]
    }
    // info
    return [colors.accent2, "#1F244D"]
  }, [type])

  return (
    <TipContext.Provider value={ICON_SIZE_DEFAULT}>
      <section
        css={({ fonts }) => ({
          padding: "2gu",
          color,
          fontFamily: fonts.sans,
          fontSize: "14px",
          background,
          borderRadius: type === "warning" ? "0px" : "6px",
        })}
      >
        <h1
          css={{
            display: "flex",
            gap: "1gu",
            alignItems: "center",
            paddingBottom: "1.5gu",
            textTransform: "uppercase",
          }}
        >
          <span css={{ display: "flex", transform: "translateY(1px)" }}>
            {icon ?? <IconInfo />}
          </span>
          {title}
        </h1>
        <div>
          {children}
        </div>
        {(onCancel || onConfirm) && (
          <div
            css={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "3gu",
              paddingTop: "1gu",
            }}
          >
            {onCancel && (
              <ButtonText
                css={({ colors }) => ({ color: colors.warning })}
                label={cancelLabel}
                onClick={onCancel}
                uppercase
              />
            )}
            {onConfirm && (
              <Button
                label={confirmLabel}
                mode="outline-3"
                onClick={onConfirm}
                size="small"
                uppercase
              />
            )}
          </div>
        )}
      </section>
    </TipContext.Provider>
  )
}

export function useTipIconSize() {
  return useContext(TipContext)
}
