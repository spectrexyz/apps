import React, { ReactNode, useCallback, useState } from "react"
import { css } from "@emotion/react"
import {
  Button,
  ButtonText,
  Definition,
  Details,
  Direction,
  Fieldset,
  IconLifebuoy,
  IconPencil,
  IconWarningOctagon,
  Info,
  Slider,
  TokenInput,
  closestIndexFromSortedNumbers,
  formatAmount,
  formatCurrencyNumber,
  lerp,
  norm,
  progressToItem,
  useAmountInput,
  usePrice,
  gu,
} from "kit"
import {
  ContentLayout,
  ContentLayoutHeading,
  ContentLayoutSection,
} from "../ContentLayout"
import { useLayout } from "../styles"
import { StepProps } from "./types"
import { useSpectralize } from "./use-spectralize"

const maxTokenSupplyCapSteps = [
  100n,
  1_000n,
  5_000n,
  10_000n,
  50_000n,
  100_000n,
  500_000n,
  1_000_000n,
  5_000_000n,
  10_000_000n,
  50_000_000n,
  100_000_000n,
  500_000_000n,
  1_000_000_000n,
]

export function Step3({ title, onNext, onPrev }: StepProps) {
  const data = useSpectralize()
  const layout = useLayout()
  const [buyoutOnly, setBuyoutOnly] = useState(true)

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      if (buyoutOnly) {
        setBuyoutOnly(false)
      } else {
        onNext()
      }
    },
    [onNext, buyoutOnly]
  )

  const inputs = {
    nftBuyoutPrice: useAmountInput(data.nftBuyoutPrice, (value) => {
      data.updateNftBuyoutPrice(value)
    }),
    totalMarketCap: useAmountInput(data.totalMarketCap, (value) => {
      data.updateTotalMarketCap(value)
    }),
    initialTokenPrice: useAmountInput(data.initialTokenPrice, (value) => {
      data.updateInitialTokenPrice(value)
    }),
    maxTokenSupplyCap: {
      onChange(value: number) {
        data.updateMaxTokenSupplyCap(
          progressToItem(value, maxTokenSupplyCapSteps) ?? 0n
        )
      },
      onLabelClick(side: "start" | "end") {
        if (side === "start")
          data.updateMaxTokenSupplyCap(maxTokenSupplyCapSteps[0])
        if (side === "end")
          data.updateMaxTokenSupplyCap(
            maxTokenSupplyCapSteps[maxTokenSupplyCapSteps.length - 1]
          )
      },
      value:
        closestIndexFromSortedNumbers(
          maxTokenSupplyCapSteps,
          data.maxTokenSupplyCap
        ) /
        (maxTokenSupplyCapSteps.length - 1),
    },
    buyoutMultiplier: {
      onChange(value: number) {
        data.updateBuyoutMultiplier(Math.round(lerp(value, 10, 50)))
      },
      keyboardStep(value: number, direction: Direction) {
        return value + (1 / (50 - 10)) * direction
      },
      onLabelClick(side: "start" | "end") {
        if (side === "start") data.updateBuyoutMultiplier(10)
        if (side === "end") data.updateBuyoutMultiplier(50)
      },
      value: norm(data.buyoutMultiplier, 10, 50),
    },
  }

  const advancedColumns = layout.value({
    xlarge: 6,
    medium: 3,
    small: 2,
  })

  return (
    <form onSubmit={handleSubmit}>
      <ContentLayout>
        <ContentLayoutHeading title={title}>
          Set the economic values of the NFT’s fractions. These will determine
          the amount of fractions that can be minted, the starting price, as
          well as the initial price to buy back the NFT.
        </ContentLayoutHeading>
        <ContentLayoutSection type="two-parts">
          <div>
            <Fieldset label="NFT buyout price">
              <EthInput {...inputs.nftBuyoutPrice} />
            </Fieldset>

            {!buyoutOnly && (
              <>
                <Fieldset label="Total market cap">
                  <EthInput {...inputs.totalMarketCap} />
                </Fieldset>
                <Fieldset label="Initial token price">
                  <EthInput {...inputs.initialTokenPrice} />
                </Fieldset>
              </>
            )}
          </div>
          <div>
            {buyoutOnly ? (
              <Info
                icon={<IconLifebuoy />}
                mode="translucid"
                title="Token health tip"
                css={css`
                  margin-top: 2gu;
                `}
              >
                Ask yourself: what price do you think your NFT will be worth in
                the future? Think of it as the reserve price in an auction
                platform.
              </Info>
            ) : (
              <>
                <Fieldset
                  label="Max token supply cap"
                  contextual={
                    <span
                      css={({ colors }) => css`
                        font-size: 18px;
                        colors: ${colors.contentDimmed};
                      `}
                    >
                      {formatCurrencyNumber(data.maxTokenSupplyCap)}
                    </span>
                  }
                >
                  <Slider labels={["1K", "1B"]} {...inputs.maxTokenSupplyCap} />
                </Fieldset>
                <Fieldset
                  label="Buyout multiplier"
                  contextual={
                    <span
                      css={({ colors }) => css`
                        font-size: 18px;
                        colors: ${colors.contentDimmed};
                      `}
                    >
                      {data.buyoutMultiplier / 10}x
                    </span>
                  }
                >
                  <Slider labels={["1x", "5x"]} {...inputs.buyoutMultiplier} />
                </Fieldset>
              </>
            )}
          </div>
        </ContentLayoutSection>
        {!buyoutOnly && (
          <div
            css={css`
              padding-top: 4gu;
            `}
          >
            <Details
              heading="Advanced parameters"
              headingBaseWidth={`calc(50% - ${(5 / 2) * gu}px)`}
              contextual={
                <ButtonText
                  label="Edit"
                  icon={<IconPencil />}
                  css={({ colors, fonts }) => css`
                    color: ${colors.accent};
                    font-size: 16px;
                    font-family: ${fonts.families.sans};
                  `}
                />
              }
              fullWidth={layout.below("large")}
            >
              <div
                css={css`
                  display: grid;
                  grid-template-columns: repeat(${advancedColumns}, auto);
                  gap: 4gu;
                `}
              >
                <Definition title="Buyout" content="FLASH - 1 week" />
                <Definition title="Minting" content="MANUAL" />
                <Definition
                  title="Initial LP weight"
                  content="80% ETH / 20% MOI"
                />
                <Definition
                  title="Target LP weight"
                  content="50% ETH / 50% MOI"
                />
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
                  These are advanced parameters defaults we recommend. Edit them
                  at your own risk.
                </p>
              </div>
            </Details>
          </div>
        )}
        <div>
          {layout.below("medium") ? (
            <div
              css={css`
                padding: 3gu 0;
              `}
            >
              <Button
                type="submit"
                label={buyoutOnly ? "Accept suggestions" : "Next"}
                mode="primary-2"
                shadowInBox
                wide
              />
            </div>
          ) : (
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                gap: 2gu;
                padding-top: 3gu;
              `}
            >
              <Button
                label="Back"
                mode="secondary-2"
                shadowInBox
                onClick={onPrev}
              />
              <Button
                type="submit"
                label={buyoutOnly ? "Accept suggestions" : "Next"}
                mode="primary-2"
                shadowInBox
              />
            </div>
          )}
        </div>
      </ContentLayout>
    </form>
  )
}

function EthInput({
  onChange,
  value,
}: {
  onChange: (value: string) => void
  value: string
}) {
  const ethPrice = usePrice("eth", "usd")
  const numValue = parseFloat(value)
  const usdValue =
    ethPrice.data && !isNaN(numValue)
      ? BigInt(Math.round(ethPrice.data * numValue * 10 ** 18))
      : null

  return (
    <TokenInput
      onChange={onChange}
      secondaryEnd={usdValue !== null ? `$${formatAmount(usdValue, 18)}` : "−"}
      symbol="ETH"
      value={value}
    />
  )
}
