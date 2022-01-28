import React, { useCallback, useRef } from "react"
import { css } from "@emotion/react"
import { useLocation } from "wouter"
import {
  ButtonIcon,
  IconArrowLeft,
  IconArrowRight,
  IconHeartStraightFilled,
  IconMagnifyingGlassPlus,
  IconSquaresFour,
  Tabs,
  gu,
} from "kit"
import { AppScreen } from "../AppLayout/AppScreen"
import { useSnftsAdjacent, useSnft } from "../snft-hooks"
import { NftPanel } from "./NftPanel"
import { TokenPanel } from "./TokenPanel"
import { ViewArea } from "./ViewArea"

export function ScreenNft({
  id,
  panel,
}: {
  id: string
  panel: "serc20" | "nft"
}) {
  const [_, setLocation] = useLocation()
  const tokenPanel = panel === "serc20"

  const [nftPrev, nftNext] = useSnftsAdjacent(id)

  const handlePrevNft = useCallback(() => {
    if (nftPrev) {
      setLocation(`/nfts/${nftPrev.id}${panel === "serc20" ? "/serc20" : ""}`)
    }
  }, [nftPrev, panel, setLocation])

  const handleNextNft = useCallback(() => {
    if (nftNext) {
      setLocation(`/nfts/${nftNext.id}${panel === "serc20" ? "/serc20" : ""}`)
    }
  }, [nftNext, panel, setLocation])

  const handleSelectPanel = useCallback(
    (index) => {
      setLocation(`/nfts/${id}${index === 1 ? "/serc20" : ""}`)
    },
    [id, tokenPanel, setLocation]
  )

  const snft = useSnft(id)

  const tabs = useRef([
    {
      label: "NFT",
      panelId: "nft-panel-nft",
      tabId: "nft-tab-nft",
    },
    {
      label: "sERC20",
      panelId: "nft-panel-serc20",
      tabId: "nft-tab-serc20",
    },
  ])

  return (
    <AppScreen mode="minimal" title="NFT" onBack={() => {}}>
      <ViewArea
        height={62.5 * gu}
        labelDisplay="FRACTIONALIZED"
        label="Fractionalized"
        actionButtons={
          <>
            <ButtonIcon
              icon={<IconHeartStraightFilled />}
              mode="outline"
              label="Add to favorites"
            />
            <ButtonIcon
              external
              href={snft?.image}
              icon={<IconMagnifyingGlassPlus />}
              label="Zoom"
              mode="outline"
            />
          </>
        }
      >
        <img alt="" src={snft?.image} width="500" />
      </ViewArea>

      <div
        css={css`
          padding-top: 6.5gu;
        `}
      />

      <Tabs
        align="start"
        bordered
        items={tabs.current}
        onSelect={handleSelectPanel}
        selected={panel === "nft" ? 0 : 1}
      />

      <div
        css={css`
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
          max-width: 160gu;
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            position: absolute;
            inset: 0 auto auto 0;
            display: flex;
            gap: 1.5gu;
          `}
        >
          {nftPrev ? (
            <ButtonIcon
              icon={<IconArrowLeft />}
              label="Previous"
              mode="outline"
              onClick={handlePrevNft}
            />
          ) : (
            <div
              css={css`
                width: 5gu;
                height: 5gu;
              `}
            />
          )}
          {nftNext && (
            <ButtonIcon
              icon={<IconArrowRight />}
              label="Next"
              mode="outline"
              onClick={handleNextNft}
            />
          )}
        </div>
        <div
          css={css`
            position: absolute;
            inset: 0 0 auto auto;
          `}
        >
          <ButtonIcon icon={<IconSquaresFour />} mode="outline" label="Grid" />
        </div>
      </div>
      <div
        css={css`
          padding-top: 3gu;
        `}
      >
        {tokenPanel ? <TokenPanel id={id} /> : <NftPanel id={id} />}
      </div>
    </AppScreen>
  )
}
