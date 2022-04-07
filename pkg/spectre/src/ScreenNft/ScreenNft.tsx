import type { TimeScale } from "./FractionsChart"

import {
  ButtonIcon,
  IconArrowLeft,
  IconArrowRight,
  IconMagnifyingGlassPlus,
  IconShare,
  IconSquaresFour,
  noop,
  Radio,
  RadioGroup,
  Tabs,
} from "kit"
import { ReactNode, useCallback, useMemo, useState } from "react"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen2"
import { poolEthWeights } from "../demo-data"
import { tokenPrices } from "../demo-data/token-prices"
import { useSnft, useSnftsAdjacent } from "../snft-hooks"
import { useLayout } from "../styles"
import { FractionsChart } from "./FractionsChart"
import { FractionsPanel } from "./FractionsPanel"
import { MintedChart } from "./MintedChart"
import { NftImage } from "./NftImage"
import { NftPanel } from "./NftPanel"
import { PoolChart } from "./PoolChart"

type GraphType = "market-cap" | "minted-supply"

const tabs = [
  {
    label: "NFT",
    panelId: "nft-panel-nft",
    tabId: "nft-tab-nft",
  },
  {
    label: "Fractions",
    panelId: "nft-panel-fractions",
    tabId: "nft-tab-fractions",
  },
  {
    label: "Pool",
    panelId: "nft-panel-pool",
    tabId: "nft-tab-pool",
  },
]

const panels = [
  ["nft", ""],
  ["fractions", "/fractions"],
  ["pool", "/pool"],
]

export function ScreenNft({
  id,
  panel,
}: {
  id: string
  panel: "pool" | "fractions" | "nft"
}) {
  const [, setLocation] = useLocation()
  const [nftPrev, nftNext] = useSnftsAdjacent(id)
  const [chartTimeScale, setChartTimeScale] = useState<TimeScale>("DAY")
  const [poolChartScale, setPoolChartScale] = useState<TimeScale>("DAY")
  const [graphType, setGraphType] = useState<GraphType>("market-cap")

  const tabIndex = useMemo(() => (
    panels.findIndex(([_panel]) => _panel === panel)
  ), [panel])

  const handlePrevNft = useCallback(() => {
    if (nftPrev) {
      setLocation(`/nfts/${nftPrev.id}${panels[tabIndex][1]}`)
    }
  }, [nftPrev, setLocation, tabIndex])

  const handleNextNft = useCallback(() => {
    if (nftNext) {
      setLocation(`/nfts/${nftNext.id}${panels[tabIndex][1]}`)
    }
  }, [nftNext, setLocation, tabIndex])

  const handleSelectPanel = useCallback(
    (index: number) => {
      if (panels[index]) {
        setLocation(`/nfts/${id}${panels[index][1]}`)
      }
    },
    [id, setLocation],
  )

  const onBack = useCallback(() => {
    setLocation("/")
  }, [setLocation])

  const snft = useSnft(id)
  const layout = useLayout()

  const normalizedHistory = useMemo(() => {
    const history = Object.entries(tokenPrices).find(([scale]) =>
      scale === chartTimeScale
    )?.[1]

    if (!history) {
      throw new Error(`Wrong timescale value (${chartTimeScale})`)
    }

    const max = Math.max(...history)
    const min = Math.min(...history)
    return history.map((v) => ((v - min) / (max - min)))
  }, [chartTimeScale])

  return (
    <AppScreen
      compactBar={layout.below("medium") && {
        title: snft?.title,
        onBack,
      }}
    >
      <div
        css={({ colors }) => ({
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "0 auto",
          padding: "8gu 0",
          background: colors.layer2,
        })}
      >
        {panel === "nft" && snft?.image && (
          <NftImage
            image={snft.image}
            label="Fractionalized"
            labelDisplay="FRACTIONALIZED"
            actionButtons={
              <>
                <ButtonIconLabel
                  icon={<IconShare />}
                  label="Share"
                  labelPosition="left"
                  onClick={noop}
                  disabled={false}
                />
                <ButtonIconLabel
                  href={snft.image.url}
                  icon={<IconMagnifyingGlassPlus />}
                  label="Zoom"
                  labelPosition="left"
                  disabled={false}
                />
              </>
            }
            navigationButtons={
              <>
                <ButtonIconLabel
                  icon={<IconArrowLeft />}
                  label="Prev"
                  labelFull="Previous"
                  onClick={handlePrevNft}
                  disabled={!(nftPrev)}
                />
                <ButtonIconLabel
                  icon={<IconSquaresFour />}
                  label="All"
                  onClick={noop}
                />
                <ButtonIconLabel
                  icon={<IconArrowRight />}
                  label="Next"
                  onClick={handleNextNft}
                  disabled={!nftNext}
                />
              </>
            }
          />
        )}
        {panel === "fractions" && (
          <div
            css={{
              position: "relative",
              display: layout.value({
                small: "grid",
                medium: "block",
              }),
              aspectRatio: layout.value({
                small: "auto",
                medium: "2 / 1",
              }),
              width: layout.value({
                small: "100%",
                medium: "80gu",
                large: "110gu",
              }),
              height: layout.value({
                small: "45gu",
                medium: "auto",
              }),
            }}
          >
            <div
              css={{
                position: "absolute",
                zIndex: 2,
                inset: layout.value({
                  small: "0 auto auto 2gu",
                  medium: "0 auto auto 7gu",
                }),
              }}
            >
              <RadioGroup selected={graphType} onChange={setGraphType}>
                <div
                  css={({ colors, fonts }) => ({
                    display: "flex",
                    gap: layout.below("medium") ? "2gu" : "3.5gu",
                    "label": {
                      display: "flex",
                      gap: "1.5gu",
                      alignItems: "center",
                      height: "5gu",
                      padding: "0 1.5gu 0 1gu",
                      fontFamily: fonts.families.mono,
                      fontSize: layout.below("medium") ? "14px" : "18px",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      color: colors.accent2,
                      cursor: "pointer",
                      border: `1px solid transparent`,
                      userSelect: "none",
                      "&.selected": {
                        borderColor: colors.accent2,
                      },
                    },
                  })}
                >
                  <label
                    className={graphType === "market-cap" ? "selected" : ""}
                  >
                    <Radio id="market-cap" mode="alt" />
                    Market cap
                  </label>
                  <label
                    className={graphType === "minted-supply" ? "selected" : ""}
                  >
                    <Radio id="minted-supply" mode="alt" />
                    Minted supply
                  </label>
                </div>
              </RadioGroup>
            </div>
            {graphType === "market-cap" && (
              <FractionsChart
                compact={layout.below("medium")}
                onScaleChange={setChartTimeScale}
                scale={chartTimeScale}
                values={normalizedHistory}
              />
            )}
            {graphType === "minted-supply" && (
              <MintedChart
                onScaleChange={() => {}}
                scale="DAY"
                values={[
                  0.2,
                  0.3,
                  0.3,
                  0.4,
                  0.45,
                  0.45,
                  0.45,
                  0.45,
                  0.47,
                  0.47,
                  0.49,
                  0.49,
                  0.49,
                  0.66,
                ]}
              />
            )}
          </div>
        )}
        {panel === "pool" && (
          <div
            css={{
              position: "relative",
              display: layout.value({
                small: "grid",
                medium: "block",
              }),
              aspectRatio: layout.value({
                small: "auto",
                medium: "2 / 1",
              }),
              width: layout.value({
                small: "100%",
                medium: "80gu",
                large: "110gu",
              }),
              height: layout.value({
                small: "45gu",
                medium: "auto",
              }),
            }}
          >
            <PoolChart
              onScaleChange={setPoolChartScale}
              scale={poolChartScale}
              ethWeight={poolEthWeights[poolChartScale]}
            />
          </div>
        )}
      </div>

      <div css={{ paddingTop: layout.below("xlarge") ? "2gu" : "6.5gu" }} />

      <div
        css={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "160gu",
          margin: "0 auto",
        }}
      >
        <div css={{ width: "100%" }}>
          <Tabs
            compact={layout.below("xlarge")}
            fullWidth={layout.below("xlarge")}
            items={tabs}
            onSelect={handleSelectPanel}
            selected={tabIndex}
          />
        </div>
      </div>
      {panel === "nft" && <NftPanel id={id} />}
      {panel === "fractions" && <FractionsPanel id={id} />}
      {panel === "pool" && <FractionsPanel id={id} />}
    </AppScreen>
  )
}

function ButtonIconLabel({
  disabled = false,
  href,
  icon,
  label,
  labelFull = label,
  labelPosition = "bottom",
  onClick,
}: {
  disabled?: boolean
  href?: string
  icon: ReactNode
  label: string
  labelFull?: string
  labelPosition?: "left" | "bottom"
  onClick?: () => void
}) {
  const layout = useLayout()
  const buttonIconSize = layout.value({
    small: "medium",
    xlarge: "large",
  })
  const showLabel = layout.value({
    small: false,
    xlarge: true,
  })
  return (
    <div
      title={labelFull}
      css={{
        display: "flex",
        flexDirection: labelPosition === "bottom" ? "column" : "row-reverse",
        gap: "1.5gu",
      }}
    >
      <ButtonIcon
        disabled={disabled}
        external={Boolean(href)}
        href={href}
        icon={icon}
        label={labelFull}
        mode="outline"
        onClick={onClick}
        size={buttonIconSize}
      />
      {showLabel && (
        <div
          css={({ colors, fonts }) => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            fontFamily: fonts.sans,
            textTransform: "uppercase",
            color: colors.contentDimmed,
            userSelect: "none",
          })}
        >
          {label}
        </div>
      )}
    </div>
  )
}
