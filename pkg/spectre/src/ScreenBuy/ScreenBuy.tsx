import type { ReactNode } from "react"

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
  Slider,
  springs,
  Tip,
  useTheme,
  WEEK_MS,
} from "moire"
import { useMemo, useState } from "react"
import { a, useSpring } from "react-spring"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { CenteredContainer } from "../AppLayout/CenteredContainer"
import { useSnft } from "../snft-hooks"
import { useLabelStyle, useLayout } from "../styles"
import { SwapModule } from "./SwapModule"

const SLIPPAGE_MAX = 10

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
  const snft = useSnft(id)
  const [, setLocation] = useLocation()
  const layout = useLayout()
  const { colors } = useTheme()
  const [mechanism, setMechanism] = useState<"MINT" | "SWAP">("MINT")
  const [showMechanismWarning, setShowMechanismWarning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const settings = useSettings()

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

  return (
    <AppScreen
      compactBar={layout.below("medium") && {
        contextual: settingsButton,
        onBack,
        title,
      }}
      loading={loading}
    >
      {!layout.below("medium") && <BackButton onClick={onBack} />}
      <CenteredContainer maxWidth={layout.below("medium") ? null : 75 * gu}>
        <section
          css={({ colors }) => ({
            padding: layout.below("medium") ? "3gu 3gu 0" : "3gu 5gu 5gu",
            background: layout.below("medium")
              ? "transparent"
              : colors.background,
            border: layout.below("medium") ? 0 : `1px solid ${colors.layer2}`,
          })}
        >
          {!layout.below("medium") && (
            <div css={{ display: "flex", justifyContent: "space-between" }}>
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
                  Modifying these settings will affect all transactions created
                  with the enabled account. You can always reset them to the
                  original default.
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
                    label={layout.below("medium") ? "Save" : "Save changes"}
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
                  padding: layout.below("medium") ? "3gu 0 0" : "3gu 0",
                }}
              >
                {snft.data && <SwapModule id={snft.data.id} />}
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
                      At present, minting fractions from the liquidity pool is
                      the cheapest option to fulfill your buying order. You can
                      override the default mechanism if you prefer to swap
                      fractions instead, but note that the exchange rate will be
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
                      </p>
                    </Group>
                  )}
                  <Group heading="Est. price">
                    <p>~ 0.0643709 ETH per {snft.data?.token.symbol}</p>
                  </Group>
                  <Group heading="Network fee">
                    <p>~ $67.49</p>
                  </Group>
                  <Group heading="Slippage">
                    <p>0.5%</p>
                  </Group>
                  <Group heading="Creator & community rewards (10%)">
                    <p>$120.56</p>
                  </Group>
                  <Group heading="Minting fee (2%)">
                    <p>$27.33</p>
                  </Group>
                  <Group heading="Protocol fee (1%)">
                    <p>$13.42</p>
                  </Group>
                </div>

                <Important />

                <div css={{ paddingTop: "3gu" }}>
                  <Button label="Place order" mode="primary" wide shadowInBox />
                </div>
              </div>
            )}
        </section>
      </CenteredContainer>
    </AppScreen>
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

function Important() {
  return (
    <div css={{ paddingTop: "2gu" }}>
      <Tip title="Important">
        Upon approval from the NFT guardian, your fractions will be minted and
        transferred to the connected account. Buying proposals approval may take
        up to one week. Opt-in for email notifications here.
      </Tip>
    </div>
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
