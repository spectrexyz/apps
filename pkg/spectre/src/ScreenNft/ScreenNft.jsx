import React, { forwardRef, useCallback, useRef, useState } from "react"
import { css } from "@emotion/react"
import { a } from "react-spring"
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
import { useLayout } from "../styles.js"
import { useAppReady } from "../App/AppReady.jsx"
import { AppScreen } from "../AppLayout/AppScreen.jsx"
import { useSnftsAdjacent, useSnft } from "../snft-hooks"
import { NftPanel } from "./NftPanel.jsx"
import { TokenPanel } from "./TokenPanel.jsx"
import { ViewArea } from "./ViewArea.jsx"

export function ScreenNft({ id, panel }) {
  const [_, setLocation] = useLocation()
  const { appReadyTransition } = useAppReady()
  const layout = useLayout()
  const fullWidth = layout.below(601)
  const tokenPanel = panel === "serc20"

  const [nftPrev, nftNext] = useSnftsAdjacent(id)

  const handlePrevNft = useCallback(() => {
    setLocation(`/nfts/${nftPrev.id}${panel === "serc20" ? "/serc20" : ""}`)
  }, [nftPrev, panel, setLocation])

  const handleNextNft = useCallback(() => {
    setLocation(`/nfts/${nftNext.id}${panel === "serc20" ? "/serc20" : ""}`)
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
    <AppScreen mode="minimal">
      <ViewArea
        height={62.5 * gu}
        labelDisplay="SPECTRALIZED"
        label="Spectralized"
        actionButtons={
          <>
            <ButtonIcon icon={<IconHeartStraightFilled />} mode="outline" />
            <ButtonIcon
              external
              href={snft.image}
              icon={<IconMagnifyingGlassPlus />}
              mode="outline"
            />
          </>
        }
      >
        <img alt="" src={snft.image} width="500" />
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
          <ButtonIcon icon={<IconSquaresFour />} mode="outline" />
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
