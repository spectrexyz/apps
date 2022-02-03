import { memo, useMemo } from "react"
import { css } from "@emotion/react"
import {
  ButtonText,
  Definition,
  Details,
  IconPencil,
  IconWarningOctagon,
  formatDuration,
  gu,
} from "kit"
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
          css={css`
            font-size: ${headingFontSize};
          `}
        >
          Advanced parameters
        </span>
      }
      headingBaseWidth={headingBaseWidth}
      contextual={
        onEdit && (
          <ButtonText
            label="Edit"
            icon={<IconPencil />}
            onClick={onEdit}
            css={({ colors, fonts }) => css`
              color: ${colors.accent};
              font-size: 16px;
              font-family: ${fonts.families.sans};
            `}
          />
        )
      }
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(${columns}, auto);
          gap: 4gu;
        `}
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
        css={({ colors }) => css`
          display: flex;
          align-items: center;
          gap: 1gu;
          padding-top: 3gu;
          font-size: 12px;
          color: ${colors.info};
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-shrink: 0;
          `}
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
    `${Math.round(tokenWeight * 100)}% / ` +
    `${Math.round((1 - tokenWeight) * 100)}%`
  )
}
