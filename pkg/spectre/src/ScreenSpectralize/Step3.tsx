import React, { useCallback, useEffect, useState } from "react"
import { css } from "@emotion/react"
import {
  Button,
  Direction,
  Fieldset,
  IconLifebuoy,
  Info,
  Slider,
  TokenInput,
  closestIndexFromSortedNumbers,
  formatAmount,
  formatNumber,
  gu,
  lerp,
  norm,
  progressToItem,
  useAmountInput,
  usePrice,
} from "kit"
import {
  ContentLayout,
  ContentLayoutHeading,
  ContentLayoutSection,
} from "../ContentLayout"
import { useLayout } from "../styles"
import { AdvancedParameters } from "./AdvancedParameters"
import { AdvancedParametersEditModal } from "./AdvancedParametersEditModal"
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
  const { suggestFromBuyout, updateSuggestFromBuyout } = data

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      if (suggestFromBuyout) {
        updateSuggestFromBuyout(false)
      } else {
        onNext()
      }
    },
    [onNext, suggestFromBuyout, updateSuggestFromBuyout]
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

  const [showAdvancedParametersEdit, setShowAdvancedParamsEdit] =
    useState(false)

  const advancedColumns = layout.value({
    xlarge: 6,
    medium: 3,
    small: 2,
  })

  useEffect(() => {
    setShowAdvancedParamsEdit(true)
    updateSuggestFromBuyout(false)
  }, [updateSuggestFromBuyout])

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

            {!suggestFromBuyout && (
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
            {suggestFromBuyout ? (
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
                      {formatNumber(data.maxTokenSupplyCap)}
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
        {!suggestFromBuyout && (
          <div
            css={css`
              padding-top: 4gu;
            `}
          >
            <AdvancedParameters
              columns={advancedColumns}
              onEdit={() => setShowAdvancedParamsEdit(true)}
              headingBaseWidth={
                layout.below("large")
                  ? undefined
                  : `calc(50% - ${(5 / 2) * gu}px)`
              }
            />
            <AdvancedParametersEditModal
              visible={showAdvancedParametersEdit}
              onClose={() => setShowAdvancedParamsEdit(false)}
            />
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
                label={suggestFromBuyout ? "See suggestions" : "Next"}
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
                label={suggestFromBuyout ? "See suggestions" : "Next"}
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
      secondaryEnd={
        usdValue !== null ? `$${formatAmount(usdValue, 18, 2)}` : "−"
      }
      symbol="ETH"
      value={value}
    />
  )
}
