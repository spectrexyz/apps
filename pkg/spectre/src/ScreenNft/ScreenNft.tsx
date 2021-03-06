import type { ComponentProps } from "react"
import type { TimeScale } from "../types"

import {
  ButtonIconLabel,
  formatAmount,
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
import { useCallback, useMemo, useState } from "react"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import {
  buyoutMultiplier,
  minted,
  poolEthWeights,
  tokenPrices,
} from "../demo-data"
import { useSnft, useSnftsAdjacent } from "../snft-hooks"
import { useLayout } from "../styles"
import { FractionsChart } from "./FractionsChart"
import { FractionsPanel } from "./FractionsPanel"
import { MintedChart } from "./MintedChart"
import { NftImage } from "./NftImage"
import { NftPanel } from "./NftPanel"
import { PoolChart } from "./PoolChart"
import { PoolPanel } from "./PoolPanel"

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
  const snftsAdjacent = useSnftsAdjacent(id)
  const [timeScale, setTimeScale] = useState<TimeScale>("DAY")
  const [graphType, setGraphType] = useState<GraphType>("market-cap")

  const [nftPrev, nftNext] = snftsAdjacent?.data ?? []

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

  const history = useMemo(() => {
    const history = Object.entries(tokenPrices).find(([scale]) => {
      return scale === timeScale
    })?.[1]
    if (!history) {
      throw new Error(`Wrong timescale value (${timeScale})`)
    }
    return history
  }, [timeScale])

  const normalizedHistory = useMemo(() => {
    const max = Math.max(...history)
    const min = Math.min(...history)
    return history.map((v) => ((v - min) / (max - min)))
  }, [history])

  const fractionChartLabels = useCallback((valueIndex: number) => {
    const price = history[valueIndex]
    const supply = 100_000_000

    const format = (value: number) =>
      `$${
        formatAmount(BigInt(Math.round(value)), 0, { compact: true, digits: 2 })
      }`

    return {
      buyoutPrice: format(supply * price * buyoutMultiplier),
      marketCap: format(supply * price),
      price: format(price),
    }
  }, [history])

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
                <LayoutAwareButtonIconLabel
                  icon={<IconShare />}
                  label="Share"
                  labelPosition="left"
                  onClick={noop}
                />
                <LayoutAwareButtonIconLabel
                  href={snft.image.url}
                  icon={<IconMagnifyingGlassPlus />}
                  label="Zoom"
                  labelPosition="left"
                />
              </>
            }
            navigationButtons={snftsAdjacent.data && (
              <>
                <LayoutAwareButtonIconLabel
                  icon={<IconArrowLeft />}
                  label="Prev"
                  labelFull="Previous"
                  onClick={handlePrevNft}
                  disabled={!nftPrev}
                />
                <LayoutAwareButtonIconLabel
                  icon={<IconSquaresFour />}
                  label="All"
                  onClick={noop}
                />
                <LayoutAwareButtonIconLabel
                  icon={<IconArrowRight />}
                  label="Next"
                  onClick={handleNextNft}
                  disabled={!nftNext}
                />
              </>
            )}
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
                  medium: "0 auto auto 3gu",
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
                multiplier={buyoutMultiplier}
                compact={layout.below("medium")}
                onScaleChange={setTimeScale}
                scale={timeScale}
                values={normalizedHistory}
                labels={fractionChartLabels}
              />
            )}
            {graphType === "minted-supply" && (
              <MintedChart
                onScaleChange={setTimeScale}
                scale={timeScale}
                values={minted[timeScale]}
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
              onScaleChange={setTimeScale}
              scale={timeScale}
              ethWeight={poolEthWeights[timeScale]}
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
      {panel === "pool" && <PoolPanel id={id} />}
    </AppScreen>
  )
}

function LayoutAwareButtonIconLabel(
  props: ComponentProps<typeof ButtonIconLabel>,
) {
  const layout = useLayout()
  return (
    <ButtonIconLabel
      {...props}
      compact={layout.below("xlarge")}
    />
  )
}
