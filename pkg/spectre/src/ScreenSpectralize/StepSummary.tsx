import type { FormEventHandler } from "react"
import type { StepProps } from "./types"

import {
  AddressBadge,
  Button,
  Definition,
  formatAmount,
  formatBytes,
  formatNumber,
  Truncate,
} from "moire"
import { useCallback } from "react"
import {
  ContentLayout,
  ContentLayoutHeading,
  ContentLayoutSection,
} from "../ContentLayout"
import { useLayout } from "../styles"
import { AdvancedParameters } from "./AdvancedParameters"
import { useSpectralize } from "./use-spectralize"

export function StepSummary({ title, onNext, onPrev }: StepProps) {
  const data = useSpectralize()
  const layout = useLayout()

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault()
      onNext()
    },
    [onNext],
  )

  const headingBottomSpace = layout.value({
    small: "1gu",
    large: "5.25gu",
  })

  const fractionalize = () => {
    alert("Soon")
  }

  return (
    <form onSubmit={handleSubmit} css={{ width: "100%" }}>
      <ContentLayout>
        <ContentLayoutHeading
          title={
            <span
              css={({ colors }) => ({
                color: colors.accent,
              })}
            >
              {title}
            </span>
          }
        >
          Make sure all the information related to your NFT & fractions is
          correct before you confirm.
        </ContentLayoutHeading>
        <div
          css={{
            height: headingBottomSpace,
          }}
        />
        <ContentLayoutSection type="two-parts">
          <div
            css={{
              paddingBottom: "3gu",
            }}
          >
            {data.previewUrl && (
              <img
                src={data.previewUrl}
                alt=""
                css={{
                  display: "block",
                  width: "100%",
                }}
              />
            )}

            <div
              css={{
                display: "grid",
                gap: "2gu",
                gridTemplateColumns: "repeat(2, 1fr)",
                width: "100%",
                padding: "3gu 0",
              }}
            >
              <Definition title="NFT Title" content={data.title} />
              <Definition
                title={`Artwork details (${data.fileType})`}
                content={<Truncate text={artworkDetails(data.file)} />}
              />
            </div>
            <Definition title="NFT Description" content={data.description} />
          </div>
          <div>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "3gu",
                paddingBottom: "3gu",
              }}
            >
              <Definition
                title="Token Name"
                content={<Truncate text={data.tokenName} />}
              />
              <Definition
                title="Token Symbol"
                content={<Truncate text={data.tokenSymbol} />}
              />
              <Definition
                title="Initial Token Price"
                content={
                  <Truncate
                    text={`${formatAmount(data.initialTokenPrice, 18)} ETH`}
                  />
                }
              />
              <Definition
                title="Initial Market Cap"
                content={`${formatAmount(data.totalMarketCap, 18)} ETH`}
              />
              <Definition
                title="Max Token Supply Cap"
                content={formatNumber(data.maxTokenSupplyCap)}
              />
              <Definition
                title="Buyout Multiplier"
                content={`${data.buyoutMultiplier / 10}x`}
              />
              <Definition
                title="Buyout Price"
                content={`${formatAmount(data.nftBuyoutPrice, 18)} ETH`}
              />
              <Definition
                title="Minting Rewards"
                content={`${formatNumber(data.rewardsPct)}%`}
              />
            </div>
            <Definition
              title="Allocation of Minting Rewards"
              content={
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5gu",
                    paddingTop: "0.5gu",
                  }}
                >
                  {data.rewardsSplit.map((account) => (
                    <div
                      key={account}
                      css={{
                        display: "flex",
                        gap: "1.5gu",
                      }}
                    >
                      <AddressBadge address={account} />
                      <div
                        css={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {formatNumber(
                          data.rewardsPct / data.rewardsSplit.length,
                        )}
                        %
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
            <div
              css={{
                paddingTop: "3gu",
              }}
            >
              <AdvancedParameters headingFontSize="14px" />
            </div>
          </div>
        </ContentLayoutSection>
        <div>
          {layout.below("medium")
            ? (
              <div
                css={{
                  padding: "3gu 0",
                }}
              >
                <Button
                  label="Fractionalize NFT"
                  mode="primary-2"
                  onClick={fractionalize}
                  shadowInBox
                  type="submit"
                  wide
                />
              </div>
            )
            : (
              <div
                css={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "2gu",
                  paddingTop: "3gu",
                }}
              >
                <Button
                  label="Back"
                  mode="secondary-2"
                  shadowInBox
                  onClick={onPrev}
                />
                <Button
                  label="Fractionalize NFT"
                  mode="primary-2"
                  onClick={fractionalize}
                  shadowInBox
                  type="submit"
                />
              </div>
            )}
        </div>
      </ContentLayout>
    </form>
  )
}

function artworkDetails(file: File | null): string {
  let details = file?.name ?? ""
  if (file?.size) {
    details += ` − ${formatBytes(file?.size)}`
  }
  return details
}
