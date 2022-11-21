import type { FormEventHandler } from "react"
import type { Snft } from "../types"

import * as dn from "dnum"
import {
  AddressBadge,
  Button,
  DAY_MS,
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
import { useCallback, useState } from "react"
import { match } from "ts-pattern"
import { useAccount } from "wagmi"
import { useLocation } from "wouter"
import { BROKER_ABI_BUYOUT, BROKER_ABI_CREATE_PROPOSAL } from "../abis"
import { AppScreen } from "../AppLayout/AppScreen"
import { CenteredContainer } from "../AppLayout/CenteredContainer"
import { AsyncTask } from "../AsyncTask/AsyncTask"
import { ContentLayout, ContentLayoutHeading } from "../ContentLayout"
import { ADDRESS_BROKER } from "../environment"
import { RequireConnected } from "../RequireConnected/RequireConnected"
import { useBuyoutPriceFor, useSerc20Share, useSnft } from "../snft-hooks"
import { useLayout } from "../styles"
import { useConnectedAccountBalance, useSignTxAndWait } from "../web3-hooks"

export function ScreenBuyout({
  id,
}: {
  id: string
}) {
  const [, setLocation] = useLocation()
  const layout = useLayout()

  const snft = useSnft(id)
  const ethUsdPrice = usePrice("eth", "usd")
  const balance = useConnectedAccountBalance()
  const account = useAccount()
  const [accountShare, accountBalance] = useSerc20Share({
    account: account.address,
    snftId: id,
  })
  const flash = snft.data?.buyoutFlash === true

  const buyoutPrice = useBuyoutPriceFor(
    snft.data?.token.contractAddress,
    account.address,
  )

  const onBack = () => {
    setLocation(snft.data ? `/nfts/${snft.data.id}` : "/")
  }

  const loading = snft.isLoading

  const title = flash ? "Buyout" : "Buyout proposal"

  const [mode, setMode] = useState<"buyout-summary" | "buyout-tx">(
    "buyout-summary",
  )

  const handleSubmit: FormEventHandler = useCallback((event) => {
    event.preventDefault()
    setMode("buyout-tx")
  }, [])

  const buyout = useBuyout({
    enabled: mode === "buyout-tx",
    snft: snft.data ?? undefined,
  })

  return (
    <RequireConnected
      onBack={() => {
        setLocation(snft.data ? `/nfts/${snft.data.id}` : "/")
      }}
      messageConnect="Please connect your account before initiating the NFT buyout."
    >
      <AppScreen
        compactBar={layout.below("large") && { onBack, title }}
        loading={loading}
      >
        {match(mode)
          .with("buyout-summary", () => (
            <>
              {!layout.below("large") && <BackButton onClick={onBack} />}
              <CenteredContainer
                maxWidth={layout.value<null | number>({
                  small: null,
                  large: 104 * gu,
                  xlarge: 117 * gu,
                })}
              >
                {snft.data && (
                  <form onSubmit={handleSubmit}>
                    <ContentLayout>
                      <div
                        css={{
                          padding: layout.value({
                            small: "0 3gu",
                            medium: "0 3gu",
                            large: "0",
                          }),
                        }}
                      >
                        <ContentLayoutHeading
                          title={!layout.below("large") && title}
                        >
                          {flash
                            ? `Your ETH and any fractions that you might own will be exchanged for
       the NFT (ERC721) and transferred to the connected account.`
                            : `Upon approval from the NFT guardian, your ETH and any 
       fractions that you might own, will be exchanged for
       the NFT (ERC721) and transferred to the connected account.`}
                        </ContentLayoutHeading>
                        <div
                          css={{
                            height: layout.value({
                              small: "1gu",
                              large: "5.25gu",
                            }),
                          }}
                        />
                        <div
                          css={{
                            display: "grid",
                            ...layout.above("large")
                              ? { gridTemplateColumns: "1fr 1fr", gap: "5gu" }
                              : {},
                          }}
                        >
                          <div css={{ paddingBottom: "3gu" }}>
                            {snft.data.image && (
                              <img
                                alt=""
                                src={snft.data.image}
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
                                    <AddressBadge
                                      address={snft.data.guardian}
                                      rounded
                                    />
                                  </div>
                                }
                              />
                              <Definition
                                title="Total supply"
                                content={`${
                                  dn.format(snft.data.token.cap, 2)
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
                                title="Buyout opened"
                                content={`${
                                  ms(
                                    (new Date(Number(snft.data.buyoutOpening)))
                                      .getTime(),
                                    { long: true },
                                  )
                                } ago`}
                              />
                              <Definition
                                title="Wallet balance"
                                content={`${
                                  balance.data && dn.format(balance.data, 2)
                                } ETH`}
                              />
                              <Definition
                                title="Buyout price"
                                content={
                                  <TokenAmount
                                    converted={ethUsdPrice.data
                                        && buyoutPrice.data
                                      ? `$${
                                        dn.format(
                                          dn.multiply(
                                            ethUsdPrice.data,
                                            buyoutPrice.data,
                                          ),
                                          2,
                                        )
                                      }`
                                      : "−"}
                                    digits={2}
                                    symbol="ETH"
                                    value={buyoutPrice.data ?? ""}
                                  />
                                }
                              />
                              <Definition
                                title="You own"
                                content={
                                  <>
                                    <Percentage
                                      percentage={accountShare
                                        ? dn.format(
                                          dn.multiply(accountShare, 100),
                                          2,
                                        )
                                        : "−"}
                                    />
                                    <div
                                      css={{
                                        marginTop: "0",
                                        color: "colors.contentDimmed",
                                      }}
                                    >
                                      {accountBalance
                                        ? `${
                                          dn.format(accountBalance, 2)
                                        }${NO_BREAK_SPACE}${snft.data.token.symbol}`
                                        : "−"}
                                    </div>
                                  </>
                                }
                              />
                            </div>
                            {null && (
                              <div>
                                <Tip title="Important">
                                  −
                                </Tip>
                              </div>
                            )}
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
                  </form>
                )}
              </CenteredContainer>
            </>
          ))
          .with("buyout-tx", () =>
            buyoutPrice.data && (
              // only for the type checker, tokenValue and ethValue are always truthy when mode=swap-tx
              <AsyncTask
                title="Buyout"
                jobDescription={`You will spend ${
                  dn.format(buyoutPrice.data, 2)
                }${NO_BREAK_SPACE}ETH and receive the NFT.`}
                jobTitle={`NFT Buyout`}
                mode={{
                  type: "transaction",
                  current: 1,
                  etherscanUrl:
                    `https://etherscan.io/address/${ADDRESS_BROKER}#code`,
                  githubUrl: flash
                    ? "https://github.com/spectrexyz/protocol/blob/1cc7a31ebef753a5a8ac6b39d7b733e93d7cece7/contracts/broker/Broker.sol#L107-L124"
                    : "https://github.com/spectrexyz/protocol/blob/1cc7a31ebef753a5a8ac6b39d7b733e93d7cece7/contracts/broker/Broker.sol#L126-L157",
                  onRetry() {
                    buyout.reset()
                  },
                  onSign() {
                    buyout.write()
                  },
                  onDone() {
                    setLocation(snft.data ? `/nfts/${snft.data.id}` : "/")
                  },
                  status: buyout.status,
                  total: 1,
                  signLabel: "Buyout",
                }}
                onAbandon={() => {
                  setMode("buyout-summary")
                }}
              />
            ))
          .otherwise(() => null)}
      </AppScreen>
    </RequireConnected>
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

function useBuyout({
  enabled,
  snft,
}: {
  enabled: boolean
  snft?: Snft
}) {
  const flash = snft?.buyoutFlash === true
  const contractAddress = snft?.token.contractAddress ?? ""

  const functionName = flash ? "buyout" : "createProposal"
  const args = flash
    ? [contractAddress]
    : [contractAddress, String(7 * DAY_MS / 1000)]
  const abi = flash ? BROKER_ABI_BUYOUT : BROKER_ABI_CREATE_PROPOSAL

  return useSignTxAndWait({
    abi,
    address: ADDRESS_BROKER,
    args,
    enabled: Boolean(enabled && snft),
    functionName,
    value: snft?.buyoutPrice,
  })
}
