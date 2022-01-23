import React, { useCallback } from "react"
import { css } from "@emotion/react"
import {
  Button,
  Fieldset,
  Slider,
  TokenInput,
  closestIndexFromSortedNumbers,
  formatAmount,
  lerp,
  norm,
  progressToItem,
} from "kit"
import {
  ContentLayout,
  ContentLayoutHeading,
  ContentLayoutSection,
} from "../ContentLayout"
import { useLayout } from "../styles"
import { useSpectralize } from "./use-spectralize"
import { StepProps } from "./types"

const maxTokenSupplyCapSteps = [
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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      onNext()
    },
    [onNext]
  )

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
              <TokenInput
                value={data.nftBuyoutPrice}
                onChange={(value) => data.updateNftBuyoutPrice(value)}
                symbol="ETH"
              />
            </Fieldset>
            <Fieldset label="Total market cap">
              <TokenInput
                value={data.totalMarketCap}
                onChange={(value) => data.updateTotalMarketCap(value)}
                symbol="ETH"
              />
            </Fieldset>
            <Fieldset label="Initial token price">
              <TokenInput
                value="0.001"
                onChange={() => {}}
                symbol="ETH"
                balance="_"
                balanceConverted="$283,982"
              />
            </Fieldset>
          </div>
          <div>
            <Fieldset
              label="Max token supply cap"
              contextual={
                <span
                  css={({ colors }) => css`
                    font-size: 18px;
                    colors: ${colors.contentDimmed};
                  `}
                >
                  {formatAmount(data.maxTokenSupplyCap)}
                </span>
              }
            >
              <Slider
                labels={["1K", "1B"]}
                onChange={(v) => {
                  data.updateMaxTokenSupplyCap(
                    progressToItem(v, maxTokenSupplyCapSteps) ?? 0n
                  )
                }}
                value={
                  closestIndexFromSortedNumbers(
                    maxTokenSupplyCapSteps,
                    data.maxTokenSupplyCap
                  ) /
                  (maxTokenSupplyCapSteps.length - 1)
                }
                onLabelClick={(side) => {
                  if (side === "start")
                    data.updateMaxTokenSupplyCap(maxTokenSupplyCapSteps[0])
                  if (side === "end")
                    data.updateMaxTokenSupplyCap(
                      maxTokenSupplyCapSteps[maxTokenSupplyCapSteps.length - 1]
                    )
                }}
              />
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
              <Slider
                labels={["1x", "5x"]}
                onChange={(value) => {
                  data.updateBuyoutMultiplier(Math.round(lerp(value, 10, 50)))
                }}
                keyboardStep={(value, direction) =>
                  value + (1 / (50 - 10)) * direction
                }
                onLabelClick={(side) => {
                  if (side === "start") data.updateBuyoutMultiplier(10)
                  if (side === "end") data.updateBuyoutMultiplier(50)
                }}
                value={norm(data.buyoutMultiplier, 10, 50)}
              />
            </Fieldset>
          </div>
        </ContentLayoutSection>
        <div>
          {layout.below("medium") ? (
            <div
              css={css`
                padding: 3gu 0;
              `}
            >
              <Button
                type="submit"
                label="Next"
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
              <Button type="submit" label="Next" mode="primary-2" shadowInBox />
            </div>
          )}
        </div>
      </ContentLayout>
    </form>
  )
}
