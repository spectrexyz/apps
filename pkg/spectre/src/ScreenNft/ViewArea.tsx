import { css } from "@emotion/react"
import { MoireLabel, useTheme } from "kit"
import { ReactNode } from "react"

type ViewAreaProps = {
  actionButtons: ReactNode
  children: ReactNode
  height?: number
  label: string
  labelDisplay: ReactNode
}

export function ViewArea({
  actionButtons,
  children,
  height,
  label,
  labelDisplay,
}: ViewAreaProps) {
  const { colors } = useTheme()
  return (
    <div
      css={({ colors }) =>
        css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        padding: 8.75gu 0;
        background: ${colors.layer2};
      `}
    >
      <div
        css={css`
          position: absolute;
          margin: 0 auto;
          inset: 0 auto;
          width: 100%;
          max-width: 160gu;
        `}
      >
        <div
          css={css`
            position: absolute;
            inset: 5gu 0 auto auto;
          `}
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
          css={css`
            position: absolute;
            inset: auto 0 3gu auto;
            display: flex;
            flex-direction: column;
            gap: 1.5gu;
          `}
        >
          {actionButtons}
        </div>
      </div>
      <div
        css={css`
          height: ${height ? `${height}px` : "auto"};
        `}
      >
        {children}
      </div>
    </div>
  )
}
