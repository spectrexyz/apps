import { forwardRef, useCallback, useRef, useState } from "react"
import { css } from "@emotion/react"
import { a } from "react-spring"
import { useLocation } from "wouter"
import {
  ButtonIcon,
  IconArrowLeft,
  IconArrowRight,
  IconSquaresFour,
  Tabs,
} from "kit"
import { useLayout } from "../styles.js"
import { useAppReady } from "../App/AppReady.jsx"
import { AppScreen } from "../AppLayout/AppScreen.jsx"
import { NftPanel } from "./NftPanel.jsx"
import { TokenPanel } from "./TokenPanel.jsx"

export function ScreenNft({ id, panel }) {
  const [_, setLocation] = useLocation()
  const { appReadyTransition } = useAppReady()
  const layout = useLayout()
  const fullWidth = layout.below(601)

  const tokenPanel = panel === "serc20"

  const handleSelectPanel = useCallback(
    (index) => {
      setLocation(`/nfts/${id}${index === 1 ? "/serc20" : ""}`)
    },
    [id, tokenPanel, setLocation]
  )

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
          <ButtonIcon icon={<IconArrowLeft />} mode="outline" />
          <ButtonIcon icon={<IconArrowRight />} mode="outline" />
        </div>
        <div
          css={css`
            width: 32gu;
          `}
        >
          <Tabs
            fullWidth
            items={tabs.current}
            onSelect={handleSelectPanel}
            selected={panel === "nft" ? 0 : 1}
          />
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
