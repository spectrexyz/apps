import type { Snft } from "../types"

import dnum from "dnum"
import { Button, IconEye, useEthToUsdFormat } from "kit"
import { useSnft } from "../snft-hooks"
import { useLayout } from "../styles"
import { Metrics } from "./Metrics"
import { NftDetails } from "./NftDetails"
import { NftTitle } from "./NftTitle"
import { PanelDetails } from "./PanelDetails"
import { PanelSection } from "./PanelSection"

export function PoolPanel({ id }: { id: string }) {
  const snft = useSnft(id)
  const layout = useLayout()

  if (!snft) {
    return null
  }

  const [primary, secondary, after = null] = (() => {
    if (layout.above("xlarge")) {
      return [
        <>
          <NftTitle snft={snft} spaceAfter />
          <NftDetails snft={snft} />
          <PoolMetrics snft={snft} />
          <LatestTransactions />
        </>,
        <>
          <PoolLiquidity snft={snft} />
        </>,
      ]
    }

    if (layout.above("medium")) {
      return [
        <>
          <NftDetails snft={snft} />
          <PoolMetrics snft={snft} />
          <LatestTransactions />
        </>,
        <>
          <PoolLiquidity snft={snft} />
        </>,
      ]
    }

    // small
    return [
      <>
        <NftDetails snft={snft} />
      </>,
      <>
        <PoolMetrics snft={snft} />
        <PoolLiquidity snft={snft} />
        <LatestTransactions />
      </>,
    ]
  })()

  return (
    <section>
      <PanelDetails primary={primary} secondary={secondary} />
      {after}
    </section>
  )
}

function PoolMetrics({ snft }: { snft: Snft }) {
  return (
    <Metrics
      compress
      heading="Metrics"
      metrics={[
        {
          heading: "Pool value",
          content: { type: "usdAmount", value: 18_028_579n },
        },
        {
          heading: "Volume (24h)",
          content: { type: "usdAmount", value: 2_028_098n },
        },
        {
          heading: "Fees (24h)",
          content: { type: "usdAmount", value: 6_973n },
        },
        {
          heading: "APY",
          content: { type: "percentage", value: ["10", "18"] },
        },
        {
          heading: "Pool weight",
          content: {
            type: "poolWeight",
            value: {
              secondary: "Last 24h",
              tokens: [[snft.token.symbol, 21], ["ETH", 79]],
            },
          },
        },
      ]}
    />
  )
}

function PoolLiquidity({ snft }: { snft: Snft }) {
  const ethToUsd = useEthToUsdFormat()
  const poolShare = 5.6
  const pooledMoi = dnum.divide(snft.token.minted, 100 / poolShare)
  const pooledMoiInEth = dnum.multiply(pooledMoi, snft.token.priceEth)
  const pooledEth = dnum.multiply(pooledMoiInEth, 1.1)
  return (
    <Metrics
      compress
      heading="Your pool liquidity"
      metrics={[
        {
          heading: "Pooled ETH",
          content: {
            type: "tokenAmount",
            value: {
              converted: ethToUsd(pooledEth),
              symbol: "ETH",
              value: dnum.format(pooledEth, 2),
            },
          },
        },
        {
          heading: "Pooled MOI",
          content: {
            type: "tokenAmount",
            value: {
              converted: ethToUsd(pooledMoiInEth),
              symbol: "MOI",
              value: dnum.format(pooledMoi, 2),
            },
          },
        },
        {
          heading: "Your pool share",
          content: {
            type: "percentage",
            value: String(poolShare).split(".") as [string, string],
          },
        },
      ]}
      footer={({ compact }) => [
        <Button
          key="add"
          label="Add liquidity"
          mode="primary"
          size={compact ? "compact" : undefined}
          wide
        />,
        <Button
          key="remove"
          label="Remove liquidity"
          mode="secondary"
          size={compact ? "compact" : undefined}
          wide
        />,
      ]}
    />
  )
}

function LatestTransactions() {
  return (
    <PanelSection title="Latest transactions">
      <p
        css={({ colors }) => ({
          paddingBottom: "3gu",
          color: colors.contentDimmed,
        })}
      >
        You can go to the Balancer UI to view more information about this NFT
        liquidity pool.
      </p>
      <Button
        external
        href="https://example.com"
        icon={<IconEye />}
        label="View on Balancer"
        mode="flat"
        size="compact"
        uppercase
      />
    </PanelSection>
  )
}
