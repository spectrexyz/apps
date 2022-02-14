import { MoireLabel, useTheme } from "kit"
import { ReactNode } from "react"

type ViewAreaProps = {
  actionButtons: ReactNode
  children: ReactNode
  height?: number
  label: string
  labelDisplay: ReactNode
  navigationButtons: ReactNode
}

export function ViewArea({
  actionButtons,
  children,
  height,
  label,
  labelDisplay,
  navigationButtons,
}: ViewAreaProps) {
  const { colors } = useTheme()
  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
        padding: "8gu 0",
        background: colors.layer2,
      }}
    >
      <div
        css={{
          position: "absolute",
          margin: "0 auto",
          inset: "0 auto",
          width: "100%",
          maxWidth: "160gu",
        }}
      >
        <div
          css={{
            position: "absolute",
            inset: "8gu 0 auto auto",
          }}
        >
          <MoireLabel
            background={colors.layer2}
            label={labelDisplay}
            labelColor={colors.background}
            linesColor={colors.accent2}
            title={label}
          />
        </div>
        <div
          css={{
            position: "absolute",
            inset: "8gu auto auto 0",
            display: "flex",
            flexDirection: "row",
            gap: "2gu",
          }}
        >
          {navigationButtons}
        </div>
        <div
          css={{
            position: "absolute",
            inset: "auto 0 3gu auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5gu",
          }}
        >
          {actionButtons}
        </div>
      </div>
      <div
        css={{
          height: `${height ? `${height}px` : "auto"}`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
