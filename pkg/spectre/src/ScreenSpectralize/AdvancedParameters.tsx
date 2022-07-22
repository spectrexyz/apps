import {
  ButtonText,
  Definition,
  Details,
  formatDuration,
  gu,
  IconPencil,
  IconWarningOctagon,
} from "kit"
import { memo } from "react"
import { useSpectralize } from "./use-spectralize"

type AdvancedParametersProps = {
  columns?: number
  headingFontSize?: string
  headingBaseWidth?: string
  onEdit?: () => void
}

export const AdvancedParameters = memo(function AdvancedParameters({
  columns = 2,
  headingFontSize = "16px",
  headingBaseWidth,
  onEdit,
}: AdvancedParametersProps) {
  const {
    buyoutMechanism,
    initialLpTokenWeight,
    mintingFees,
    targetLpTokenWeight,
    timelock,
    tradingFees,
  } = useSpectralize()

  return (
    <Details
      heading={
        <span
          css={{
            fontSize: headingFontSize,
          }}
        >
          Advanced parameters
        </span>
      }
      headingBaseWidth={headingBaseWidth}
      contextual={onEdit && (
        <ButtonText
          label="Edit"
          icon={<IconPencil />}
          onClick={onEdit}
          css={({ colors, fonts }) => ({
            color: colors.accent,
            fontSize: "16px",
            fontFamily: fonts.sans,
          })}
        />
      )}
    >
      <div
        css={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, auto)`,
          gap: "4gu",
        }}
      >
        <Definition
          title="Buyout mechanism"
          content={buyoutMechanism === "flash" ? "Flash" : "Manual"}
        />
        <Definition
          title="Buyout timelock"
          content={formatDuration(timelock)}
        />
        <Definition
          title="Initial LP weight"
          content={tokenWeightLabel(initialLpTokenWeight)}
        />
        <Definition
          title="Target LP weight"
          content={tokenWeightLabel(targetLpTokenWeight)}
        />
        <Definition title="Minting fees" content={`${mintingFees}%`} />
        <Definition title="Trading fees" content={`${tradingFees}%`} />
      </div>

      <div
        css={({ colors }) => ({
          display: "flex",
          alignItems: "center",
          gap: "1gu",
          paddingTop: "3gu",
          fontSize: "12px",
          color: colors.info,
        })}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            flexShrink: "0",
          }}
        >
          <IconWarningOctagon size={2 * gu} />
        </div>
        <p>
          These are advanced parameters defaults we recommend. Edit them at your
          own risk.
        </p>
      </div>
    </Details>
  )
})

function tokenWeightLabel(tokenWeight: number) {
  return (
    `${Math.round(tokenWeight * 100)}% / `
    + `${Math.round((1 - tokenWeight) * 100)}%`
  )
}
