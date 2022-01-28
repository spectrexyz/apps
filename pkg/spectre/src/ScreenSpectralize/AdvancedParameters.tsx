import React from "react"
import { css } from "@emotion/react"
import {
  ButtonText,
  Definition,
  Details,
  IconPencil,
  IconWarningOctagon,
  gu,
} from "kit"

type AdvancedParametersProps = {
  columns?: number
  headingFontSize?: string
  headingBaseWidth?: string
  onEdit?: () => void
}

export function AdvancedParameters({
  columns = 2,
  headingFontSize = "16px",
  headingBaseWidth,
  onEdit,
}: AdvancedParametersProps) {
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
        <Definition title="Buyout" content="FLASH - 1 week" />
        <Definition title="Minting" content="MANUAL" />
        <Definition title="Initial LP weight" content="80% ETH / 20% MOI" />
        <Definition title="Target LP weight" content="50% ETH / 50% MOI" />
        <Definition title="Minting fees" content="2%" />
        <Definition title="Trading fees" content="1%" />
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
}
