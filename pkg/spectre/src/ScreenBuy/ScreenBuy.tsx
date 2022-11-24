import type { Dnum } from "dnum"
import type { FormEventHandler, ReactNode } from "react"
import type { Snft } from "../types"

import * as dn from "dnum"
import { BigNumber } from "ethers"
import {
  Button,
  ButtonIcon,
  closestIndexFromSortedNumbers,
  DAY_MS,
  Fieldset,
  formatDuration,
  gu,
  IconArrowLeft,
  IconGearSix,
  IconGearSixFilled,
  Incremental,
  NO_BREAK_SPACE,
  Slider,
  springs,
  Tip,
  useTheme,
  WEEK_MS,
} from "moire"
import { useCallback, useMemo, useState } from "react"
import { a, useSpring } from "react-spring"
import { match } from "ts-pattern"
import { useLocation } from "wouter"
import { ISSUER_ABI_ISSUE } from "../abis"
import { AppScreen } from "../AppLayout/AppScreen"
import { CenteredContainer } from "../AppLayout/CenteredContainer"
import { AsyncTask } from "../AsyncTask/AsyncTask"
import { ADDRESS_ISSUER } from "../environment"
import { RequireConnected } from "../RequireConnected/RequireConnected"
import { useSnft } from "../snft-hooks"
import { useLabelStyle, useLayout } from "../styles"
import { useSignTxAndWait } from "../web3-hooks"
import { SwapModule } from "./SwapModule"

const SLIPPAGE_MAX = 10 // in %

const TIMEFRAME_OPTIONS = [
  1 * DAY_MS,
  2 * DAY_MS,
  3 * DAY_MS,
  4 * DAY_MS,
  5 * DAY_MS,
  6 * DAY_MS,
  1 * WEEK_MS,
  2 * WEEK_MS,
  3 * WEEK_MS,
  4 * WEEK_MS,
]

const TIMEFRAME_DEFAULT = 1 * WEEK_MS
const SLIPPAGE_DEFAULT = 0.5

export function ScreenBuy({ id }: { id: string }) {
  const layout = useLayout()
  const { colors } = useTheme()
  const [, setLocation] = useLocation()

  const snft = useSnft(id)
  const [mechanism, setMechanism] = useState<"MINT" | "SWAP">("MINT")
  const [showMechanismWarning, setShowMechanismWarning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const settings = useSettings()

  const [ethValue, setEthValue] = useState<null | Dnum>(null)

  const tokenPrice = snft.data?.token.priceEth

  const tokenValue = useMemo(() => {
    return ethValue && tokenPrice
      ? dn.divide(ethValue, tokenPrice)
      : null
  }, [ethValue, tokenPrice])

  const settingsBtnAnim = useSpring({
    config: springs.snappy,
    filledOpacity: Number(showSettings),
    outlineOpacity: Number(!showSettings),
    transform: `rotate(${showSettings ? 60 : 0}deg`,
  })

  const onBack = () => {
    if (showSettings && layout.below("medium")) {
      setShowSettings(false)
      return
    }
    setLocation(snft.data ? `/nfts/${snft.data.id}` : "/")
  }

  const settingsButton = (
    <ButtonIcon
      icon={
        <div css={{ position: "relative", width: "3gu", height: "3gu" }}>
          <a.div
            style={{ transform: settingsBtnAnim.transform }}
            css={{ position: "absolute", inset: 0 }}
          >
            <a.div
              style={{ opacity: settingsBtnAnim.filledOpacity }}
              css={{ position: "absolute", inset: 0 }}
            >
              <IconGearSixFilled color={colors.accent} />
            </a.div>
            <a.div
              style={{ opacity: settingsBtnAnim.outlineOpacity }}
              css={{ position: "absolute", inset: 0 }}
            >
              <IconGearSix />
            </a.div>
          </a.div>
        </div>
      }
      label="Settings"
      onClick={() => setShowSettings((v) => !v)}
    />
  )

  const loading = snft.isLoading

  const title = showSettings
    ? "Transaction settings"
    : snft.data
    ? `Buy ${snft.data?.token.symbol}`
    : "−"

  const [mode, setMode] = useState<"swap-form" | "swap-tx">(
    "swap-form",
  )

  const handleSubmit: FormEventHandler = useCallback((event) => {
    event.preventDefault()
    if (ethValue && ethValue[0] > 0n) {
      setMode("swap-tx")
    }
  }, [ethValue])

  const buy = useBuy({
    enabled: mode === "swap-tx" && ethValue !== null && tokenValue !== null,
    ethValue: ethValue ?? undefined,
    expected: tokenValue ?? undefined,
    snft: snft.data ?? undefined,
  })

  return (
    <RequireConnected
      onBack={() => {
        setLocation(snft.data ? `/nfts/${snft.data.id}` : "/")
      }}
      messageConnect="Please connect your account to buy the NFT token."
    >
      <AppScreen
        compactBar={layout.below("medium") && {
          contextual: settingsButton,
          onBack,
          title,
        }}
        loading={loading}
      >
        {match(mode)
          .with("swap-form", () => (
            <>
              {!layout.below("medium") && <BackButton onClick={onBack} />}
              <CenteredContainer
                maxWidth={layout.below("medium")
                  ? null
                  : 75 * gu}
              >
                <form onSubmit={handleSubmit}>
                  <section
                    css={({ colors }) => ({
                      padding: layout.below("medium")
                        ? "3gu 3gu 0"
                        : "3gu 5gu 5gu",
                      background: layout.below("medium")
                        ? "transparent"
                        : colors.background,
                      border: layout.below("medium")
                        ? 0
                        : `1px solid ${colors.layer2}`,
                    })}
                  >
                    {!layout.below("medium") && (
                      <div
                        css={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h1
                          css={{
                            display: "flex",
                            alignItems: "center",
                            textTransform: "uppercase",
                          }}
                        >
                          {title}
                        </h1>
                        <div css={{ marginRight: "-1gu" }}>
                          {settingsButton}
                        </div>
                      </div>
                    )}
                    {showSettings
                      ? (
                        <div>
                          <p
                            css={({ colors, fonts }) => ({
                              paddingTop: "1.5gu",
                              fontFamily: fonts.sans,
                              fontSize: "14px",
                              color: colors.contentDimmed,
                            })}
                          >
                            Modifying these settings will affect all
                            transactions created with the enabled account. You
                            can always reset them to the original default.
                          </p>
                          <Fieldset
                            contextual={
                              <span
                                css={({ colors }) => ({
                                  fontSize: "18px",
                                  color: colors.accent,
                                })}
                              >
                                {settings.slippage}%
                              </span>
                            }
                            dimmed
                            label="Slippage"
                          >
                            <Slider
                              labels={["0%", `${SLIPPAGE_MAX}%`]}
                              onChange={settings.onSlippageChange}
                              onLabelClick={settings.onSlippageLabelClick}
                              value={settings.slippagePct}
                            />
                          </Fieldset>
                          <Incremental
                            label="Proposal timeframe"
                            onDecrease={settings.onTimeframeDecrease}
                            onIncrease={settings.onTimeframeIncrease}
                            enableDecrease={settings.timeframeIndex > 0}
                            enableIncrease={settings.timeframeIndex
                              < TIMEFRAME_OPTIONS.length - 1}
                            value={formatDuration(settings.timeframe)}
                          />
                          <div
                            css={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "2.5gu",
                              paddingTop: "3gu",
                            }}
                          >
                            <Button
                              label="Reset"
                              onClick={() => {
                                settings.reset()
                              }}
                            />
                            <Button
                              label={layout.below("medium")
                                ? "Save"
                                : "Save changes"}
                              mode="primary"
                              onClick={() => {
                                setShowSettings(false)
                              }}
                            />
                          </div>
                        </div>
                      )
                      : (
                        <div
                          css={{
                            width: "100%",
                            margin: "0 auto",
                            padding: layout.below("medium")
                              ? "3gu 0 0"
                              : "3gu 0",
                          }}
                        >
                          {snft.data && (
                            <SwapModule
                              id={snft.data.id}
                              tokenValue={tokenValue}
                              onEthValueChange={setEthValue}
                            />
                          )}
                          <div
                            css={({ colors }) => ({
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              alignContent: "end",
                              padding: "0 2gu 3gu",
                              background: colors.layer1,
                              "section:first-of-type": {
                                gridColumn: "span 2",
                              },
                              "section:nth-of-type(odd):not(:first-of-type)": {
                                textAlign: "right",
                              },
                            })}
                          >
                            {showMechanismWarning && (
                              <Tip
                                title="Change buying mechanism"
                                type="warning"
                                confirmLabel="Swap fractions"
                                onCancel={() => {
                                  setShowMechanismWarning(false)
                                }}
                                onConfirm={() => {
                                  setMechanism("SWAP")
                                  setShowMechanismWarning(false)
                                }}
                              >
                                At present, minting fractions from the liquidity
                                pool is the cheapest option to fulfill your
                                buying order. You can override the default
                                mechanism if you prefer to swap fractions
                                instead, but note that the exchange rate will be
                                higher.
                              </Tip>
                            )}
                            {!showMechanismWarning && (
                              <Group heading="Buying mechanism">
                                <p>
                                  <span css={{ marginRight: "1.5gu" }}>
                                    {mechanism === "MINT"
                                      ? "Mint fractions"
                                      : "Swap fractions"}
                                  </span>
                                  {false && /* disabled for now (only mint) */ (
                                    <Button
                                      label={mechanism === "MINT"
                                        ? "Change"
                                        : "Change to mint"}
                                      mode="flat-3"
                                      size="mini"
                                      uppercase
                                      onClick={() => {
                                        if (mechanism === "MINT") {
                                          setShowMechanismWarning(true)
                                        } else {
                                          setMechanism("MINT")
                                        }
                                      }}
                                      css={{ color: "#F7B186" }}
                                    />
                                  )}
                                </p>
                              </Group>
                            )}
                            <Group heading="Est. price">
                              <p>
                                {tokenPrice
                                  ? `~ ${
                                    dn.format(
                                      tokenPrice,
                                      { trailingZeros: false, digits: 8 },
                                    )
                                  }${NO_BREAK_SPACE}ETH per ${
                                    snft.data?.token.symbol
                                  }`
                                  : ""}
                              </p>
                            </Group>
                            <Group heading="Network fee">
                              <p>−</p>
                            </Group>
                            <Group heading="Slippage">
                              <p>−</p>
                            </Group>
                            <Group
                              heading={`Rewards${NO_BREAK_SPACE}(${
                                snft.data?.issuanceAllocation
                                  ? dn.format(snft.data.issuanceAllocation)
                                  : "−"
                              }%)`}
                            >
                              <p>
                                {snft.data?.issuanceAllocation && ethValue
                                  ? (
                                    `${
                                      dn.format(
                                        dn.multiply(
                                          ethValue,
                                          dn.divide(
                                            snft.data.issuanceAllocation,
                                            100,
                                          ),
                                        ),
                                      )
                                    }${NO_BREAK_SPACE}ETH`
                                  )
                                  : "−"}
                              </p>
                            </Group>
                            <Group
                              heading={`Minting fee (${
                                snft.data?.issuanceFee
                                  ? dn.format(snft.data.issuanceFee)
                                  : "−"
                              }%)`}
                            >
                              <p>
                                {snft.data?.issuanceFee && ethValue
                                  ? (
                                    `${
                                      dn.format(
                                        dn.multiply(
                                          ethValue,
                                          dn.divide(snft.data.issuanceFee, 100),
                                        ),
                                      )
                                    }${NO_BREAK_SPACE}ETH`
                                  )
                                  : "−"}
                              </p>
                            </Group>
                            <Group heading="Protocol fee (−%)">
                              <p>−</p>
                            </Group>
                          </div>

                          <div css={{ paddingTop: "2gu" }}>
                            {snft.data?.buyoutFlash === false && (
                              <Tip title="Important">
                                Upon approval from the NFT guardian, your
                                fractions will be minted and transferred to the
                                connected account. Buying proposals approval may
                                take up to one week. Opt-in for email
                                notifications here.
                              </Tip>
                            )}
                          </div>

                          <div css={{ paddingTop: "3gu" }}>
                            <Button
                              label="Place order"
                              mode="primary"
                              shadowInBox
                              type="submit"
                              wide
                            />
                          </div>
                        </div>
                      )}
                  </section>
                </form>
              </CenteredContainer>
            </>
          ))
          .with("swap-tx", () => (
            // only for the type checker, tokenValue and ethValue are always truthy when mode=swap-tx
            tokenValue && ethValue && (
              <AsyncTask
                title={`Buy ${snft.data?.token.symbol}`}
                jobDescription={`You will spend ${
                  dn.format(ethValue, 2)
                }${NO_BREAK_SPACE}ETH and receive a minimum of ${
                  dn.format(tokenValue, 2)
                }${NO_BREAK_SPACE}${snft.data?.token.symbol}.`}
                jobTitle={`Swap ETH for ${snft.data?.token.symbol}`}
                mode={{
                  type: "transaction",
                  current: 1,
                  etherscanUrl:
                    `https://etherscan.io/address/${ADDRESS_ISSUER}#code`,
                  githubUrl:
                    "https://github.com/spectrexyz/protocol/blob/1cc7a31ebef753a5a8ac6b39d7b733e93d7cece7/contracts/issuer/Issuer.sol#L155-L176",
                  onRetry() {
                    buy.reset()
                  },
                  onSign() {
                    buy.write()
                  },
                  onDone() {
                    setLocation(snft.data ? `/nfts/${snft.data.id}` : "/")
                  },
                  status: buy.status,
                  total: 1,
                  signLabel: "Buy",
                }}
                onAbandon={() => {
                  setMode("swap-form")
                }}
              />
            )
          ))
          .otherwise(() => null)}
      </AppScreen>
    </RequireConnected>
  )
}

function Group({
  children,
  heading,
}: {
  children: ReactNode
  heading: ReactNode
}) {
  const labelStyle = useLabelStyle({ size: "small" })
  return (
    <section
      css={({ fonts }) => ({
        paddingTop: "2gu",
        fontFamily: fonts.sans,
        fontSize: "14px",
      })}
    >
      <h1 css={{ ...labelStyle, paddingBottom: "1gu" }}>
        {heading}
      </h1>
      <div>{children}</div>
    </section>
  )
}

function BackButton({
  onClick,
}: {
  onClick: () => void
}) {
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

function useSettings() {
  const [slippage, setSlippage] = useState(SLIPPAGE_DEFAULT)
  const [timeframe, setTimeframe] = useState(TIMEFRAME_DEFAULT)
  const closestTimeframeIndex = useMemo(
    () => closestIndexFromSortedNumbers(TIMEFRAME_OPTIONS, timeframe),
    [timeframe],
  )

  const onTimeframeIncrease = () => {
    setTimeframe(
      TIMEFRAME_OPTIONS[
        Math.min(closestTimeframeIndex + 1, TIMEFRAME_OPTIONS.length - 1)
      ],
    )
  }
  const onTimeframeDecrease = () => {
    setTimeframe(TIMEFRAME_OPTIONS[Math.max(closestTimeframeIndex - 1, 0)])
  }

  const onSlippageChange = (value: number) => {
    setSlippage(Math.round(value * SLIPPAGE_MAX * 10) / 10)
  }
  const onSlippageLabelClick = (value: string) => {
    setSlippage(value === "start" ? 0 : SLIPPAGE_MAX)
  }

  const reset = () => {
    setSlippage(SLIPPAGE_DEFAULT)
    setTimeframe(TIMEFRAME_DEFAULT)
  }

  return {
    timeframeIndex: closestTimeframeIndex,
    onSlippageChange,
    onSlippageLabelClick,
    onTimeframeDecrease,
    onTimeframeIncrease,
    reset,
    slippage,
    slippagePct: slippage / SLIPPAGE_MAX,
    timeframe,
  }
}

function useBuy(
  {
    enabled,
    ethValue,
    expected,
    snft,
  }: {
    enabled: boolean
    ethValue?: Dnum
    expected?: Dnum
    snft?: Snft
  },
) {
  // const expected_ = expected ? BigNumber.from(expected[0]) : null
  const expected_ = expected ? BigNumber.from(0n) : null // TODO: figure out why using the calculated expected value gets rejected by the contract
  const tokenAddress = snft?.token.contractAddress
  const enabled_ = Boolean(enabled && ethValue && expected_ && tokenAddress)
  return useSignTxAndWait({
    abi: ISSUER_ABI_ISSUE,
    address: ADDRESS_ISSUER,
    args: [tokenAddress, expected_],
    enabled: enabled_,
    functionName: "issue",
    value: ethValue,
  })
}
