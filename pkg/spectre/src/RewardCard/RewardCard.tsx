import type { Dnum } from "dnum"
import type { ReactNode } from "react"
import type { Reward, TokenLocator } from "../types"

import * as dnum from "dnum"
import {
  Button,
  ButtonText,
  Card,
  TokenAmount,
  useEthToUsdFormat,
  useTheme,
} from "kit"
import { useMemo } from "react"
import { useLocation } from "wouter"
import { useSnft, useToken } from "../snft-hooks"
import iconBuyout from "./rewards-buyout.svg"
import iconCommunity from "./rewards-community.svg"
import iconCreators from "./rewards-creators.svg"

type RewardEth = Reward & { token: "ETH" }
type RewardToken = Reward & { token: TokenLocator }

function isRewardEth(reward: Reward): reward is RewardEth {
  return reward.token === "ETH"
}

function isRewardToken(reward: Reward): reward is RewardToken {
  return reward.token !== "ETH"
}

export function RewardCard({ reward }: { reward: Reward }) {
  if (isRewardEth(reward)) {
    return <RewardCardEth reward={reward} />
  }
  if (isRewardToken(reward)) {
    return <RewardCardToken reward={reward} />
  }
  return null
}

function RewardCardBase(
  {
    amount,
    loading,
    onClaim,
    onRewardTitleClick,
    rewardShare,
    rewardTitle,
    rewardType,
  }: {
    amount: ReactNode
    loading?: boolean
    onClaim?: () => void
    onRewardTitleClick: () => void
    rewardShare?: Dnum
    rewardTitle?: string
    rewardType: Reward["rewardType"]
  },
) {
  const { colors } = useTheme()

  const [rewardTypeLabel, icon] = useMemo(() => {
    if (rewardType === "creators") return ["Creators reward", iconCreators]
    if (rewardType === "community") return ["Community reward", iconCommunity]
    if (rewardType === "buyout") return ["Buyout reward", iconBuyout]
    throw new Error(`Wrong reward type used on RewardCard: ${rewardType}`)
  }, [rewardType])

  return (
    <Card
      loading={loading}
      loadingBackground={colors.background}
      css={{ height: "100%", minHeight: "50gu" }}
    >
      <section
        css={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          padding: "3gu",
          background: "colors.background",
          border: "2px solid colors.layer2",
        }}
      >
        <div css={{ flexGrow: "1" }}>
          <img src={icon} alt="" css={{ display: "block" }} />
          <h1
            css={{
              paddingTop: "3gu",
              textTransform: "uppercase",
              fontSize: "18px",
            }}
          >
            {rewardTypeLabel}
          </h1>
          <div css={{ paddingTop: "4gu" }}>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <ButtonText
                  onClick={onRewardTitleClick}
                  label={
                    <span
                      css={{
                        color: "colors.link",
                        textDecoration: "underline",
                      }}
                    >
                      {rewardTitle}
                    </span>
                  }
                />
              </div>
              {rewardShare && (
                <div
                  css={{
                    fontSize: "18px",
                    color: "colors.contentDimmed",
                  }}
                >
                  {dnum.format(dnum.multiply(rewardShare, 100), 2)}%
                </div>
              )}
            </div>
            <div>{amount}</div>
          </div>
        </div>
        <div
          css={{
            flexGrow: "0",
            flexShrink: "0",
            display: "flex",
            flexDirection: "column",
            gap: "1.5gu",
          }}
        >
          <Button label="Claim" onClick={onClaim} wide />
        </div>
      </section>
    </Card>
  )
}

function RewardCardEth({ reward }: { reward: RewardEth }) {
  const snft = useSnft(reward.snftId)
  const ethToUsdFormat = useEthToUsdFormat()
  const [, setLocation] = useLocation()
  return (
    <RewardCardBase
      amount={
        <TokenAmount
          digits={3}
          symbol="ETH"
          value={reward.amount}
          converted={ethToUsdFormat(reward.amount)}
        />
      }
      onRewardTitleClick={() => setLocation(`/nfts/${reward.snftId}`)}
      rewardTitle={snft.data?.token.symbol}
      rewardType={reward.rewardType}
      rewardShare={reward.share}
    />
  )
}

function RewardCardToken({ reward }: { reward: RewardToken }) {
  const snft = useSnft(reward.snftId)
  const token = useToken(reward.token)
  const ethToUsdFormat = useEthToUsdFormat()
  const [, setLocation] = useLocation()
  const tokenPriceEth = token.data?.priceEth
  return (
    <RewardCardBase
      amount={token.data && tokenPriceEth && (
        <TokenAmount
          digits={3}
          symbol={token.data?.symbol}
          value={reward.amount}
          converted={ethToUsdFormat(
            dnum.multiply(reward.amount, tokenPriceEth),
          )}
        />
      )}
      loading={!token.data}
      onRewardTitleClick={() => setLocation(`/nfts/${reward.snftId}`)}
      rewardTitle={snft.data?.token.symbol}
      rewardType={reward.rewardType}
      rewardShare={reward.share}
    />
  )
}
