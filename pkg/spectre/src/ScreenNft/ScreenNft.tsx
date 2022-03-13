import {
  ButtonIcon,
  IconArrowLeft,
  IconArrowRight,
  IconMagnifyingGlassPlus,
  IconShare,
  IconSquaresFour,
  noop,
  Tabs,
} from "kit"
import { ReactNode, useCallback, useMemo } from "react"
import { useLocation } from "wouter"
import { usePreventNextScrollReset } from "../App/AppScroll"
import { AppScreen } from "../AppLayout/AppScreen2"
import { useSnft, useSnftsAdjacent } from "../snft-hooks"
import { useLayout } from "../styles"
import { FractionsChart } from "./FractionsChart"
import { FractionsPanel } from "./FractionsPanel"
import { NftImage } from "./NftImage"
import { NftPanel } from "./NftPanel"

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
  const preventNextScrollReset = usePreventNextScrollReset()

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
      preventNextScrollReset()
      if (panels[index]) {
        setLocation(`/nfts/${id}${panels[index][1]}`)
      }
    },
    [id, preventNextScrollReset, setLocation],
  )

  const onBack = useCallback(() => {
    setLocation("/")
  }, [setLocation])

  const snft = useSnft(id)
  const layout = useLayout()

  return (
    <AppScreen
      compactBar={layout.below("medium") && {
        title: snft?.title,
        onBack,
      }}
    >
      {snft?.image && (
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
                onClick={() => {}}
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
                onClick={() => {}}
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
      {panel === "fractions" && <TokenPanel id={id} />}
      {panel === "pool" && <TokenPanel id={id} />}
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
