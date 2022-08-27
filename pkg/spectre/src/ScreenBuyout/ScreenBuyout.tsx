import * as dnum from "dnum"
import {
  AddressBadge,
  Button,
  Definition,
  gu,
  IconArrowLeft,
  ms,
  NO_BREAK_SPACE,
  noop,
  Percentage,
  Tip,
  TokenAmount,
  TokenBadge,
  Truncate,
  usePrice,
} from "moire"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { CenteredContainer } from "../AppLayout/CenteredContainer"
import { ContentLayout, ContentLayoutHeading } from "../ContentLayout"
import { useSnft } from "../snft-hooks"
import { useLayout } from "../styles"

export function ScreenBuyout({ id }: { id: string }) {
  const snft = useSnft(id)
  const [, setLocation] = useLocation()
  const layout = useLayout()
  const ethUsdPrice = usePrice("eth", "usd")

  const onBack = () => {
    setLocation(snft.data ? `/nfts/${snft.data.id}` : "/")
  }

  const title = "Buyout proposal"

  const headingBottomSpace = layout.value({
    small: "1gu",
    large: "5.25gu",
  })

  const maxWidth = layout.value<null | number>({
    small: null,
    large: 104 * gu,
    xlarge: 117 * gu,
  })

  const contentPadding = layout.value({
    small: "0 3gu",
    medium: "0 3gu",
    large: "0",
  })

  const loading = snft.isLoading

  return (
    <AppScreen
      compactBar={layout.below("large") && { onBack, title }}
      loading={loading}
    >
      {!layout.below("large") && <BackButton onClick={onBack} />}
      <CenteredContainer maxWidth={maxWidth}>
        {snft.data && (
          <ContentLayout>
            <div css={{ padding: contentPadding }}>
              <ContentLayoutHeading title={!layout.below("large") && title}>
                Upon approval from the NFT guardian, your ETH and any fractions
                that you might own, will be exchanged for the NFT (ERC721) and
                transfer to the connected account.
              </ContentLayoutHeading>
              <div css={{ height: headingBottomSpace }} />
              <div
                css={{
                  display: "grid",
                  ...layout.above("large")
                    ? { gridTemplateColumns: "1fr 1fr", gap: "5gu" }
                    : {},
                }}
              >
                <div css={{ paddingBottom: "3gu" }}>
                  {snft.data.image.url && (
                    <img
                      alt=""
                      src={snft.data.image.url}
                      css={{
                        display: "block",
                        width: "100%",
                      }}
                    />
                  )}
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
                      title="NFT title"
                      content={<Truncate text={snft.data.title} />}
                    />
                    <Definition
                      title="Guardian"
                      content={
                        <div css={{ display: "flex" }}>
                          <AddressBadge address={snft.data.guardian} rounded />
                        </div>
                      }
                    />
                    <Definition
                      title="Circulating supply"
                      content={`${
                        dnum.format(snft.data.token.minted, 2)
                      }${NO_BREAK_SPACE}${snft.data.token.symbol}`}
                    />
                    <Definition
                      title="Fraction symbol"
                      content={
                        <div css={{ display: "flex" }}>
                          <TokenBadge
                            label={snft.data.token.symbol}
                            tokenType="serc20"
                          />
                        </div>
                      }
                    />
                    <Definition
                      title="Proposal timeout"
                      content={ms(snft.data.proposalTimeout, { long: true })}
                    />
                    <Definition
                      title="Wallet balance"
                      content={`${
                        dnum.format([1000000000000000000n, 18], 2)
                      } ETH`}
                    />
                    <Definition
                      title="Buyout price"
                      content={
                        <TokenAmount
                          converted={ethUsdPrice.data
                            ? `$${
                              dnum.format(
                                dnum.multiply(
                                  ethUsdPrice.data,
                                  snft.data.buyoutPrice,
                                ),
                                2,
                              )
                            }`
                            : "−"}
                          digits={2}
                          symbol="ETH"
                          value={snft.data.buyoutPrice}
                        />
                      }
                    />
                    <Definition
                      title="You own"
                      content={<Percentage percentage="12.14%" />}
                    />
                  </div>
                  <div>
                    <Important />
                  </div>
                  {layout.below("medium")
                    ? (
                      <div css={{ padding: "3gu 0" }}>
                        <Button
                          label="Submit proposal"
                          mode="primary"
                          onClick={noop}
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
                          label="Cancel"
                          mode="secondary"
                          shadowInBox
                          onClick={onBack}
                        />
                        <Button
                          label="Submit proposal"
                          mode="primary"
                          onClick={noop}
                          shadowInBox
                          type="submit"
                          wide
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </ContentLayout>
        )}
      </CenteredContainer>
    </AppScreen>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  const layout = useLayout()
  return (
    <div
      css={{
        width: "100%",
        maxWidth: layout.value({
          small: "initial",
          medium: "75gu",
          large: "104gu",
          xlarge: "160gu",
        }),
        margin: layout.value({
          small: "4gu auto 0",
          medium: "4gu auto 2gu",
          xlarge: "4gu auto 0",
        }),
      }}
    >
      <Button
        icon={<IconArrowLeft />}
        label="Back"
        mode="outline"
        onClick={onClick}
        size="compact"
      />
    </div>
  )
}

function Important() {
  return (
    <Tip title="Important">
      When you add liquidity, you will receive pool tokens representing your
      position in the pool. These tokens will earn fees proportional to your
      share and can be redeemed at any time. Opt-in for email notifications
      here.
    </Tip>
  )
}
