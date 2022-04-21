import { AddressBadge, Button, IconEye } from "kit"
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
          <PoolMetrics />
          <LatestTransactions />
        </>,
        <>
          <PoolLiquidity />
        </>,
      ]
    }

    if (layout.above("medium")) {
      return [
        <>
          <NftDetails snft={snft} />
          <PoolMetrics />
          <LatestTransactions />
        </>,
        <>
          <PoolLiquidity />
        </>,
      ]
    }

    // small
    return [
      <>
        <NftDetails snft={snft} />
      </>,
      <>
        <PoolMetrics />
        <PoolLiquidity />
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

function PoolMetrics() {
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
              tokens: [["ABC", 68], ["ETH", 32]],
            },
          },
        },
      ]}
    />
  )
}

function PoolLiquidity() {
  return (
    <Metrics
      compress
      heading="Your pool liquidity"
      metrics={[
        {
          heading: "Pooled ETH",
          content: {
            type: "tokenAmount",
            value: { converted: "$67,258", symbol: "ETH", value: "35.65" },
          },
        },
        {
          heading: "Pooled MOI",
          content: {
            type: "tokenAmount",
            value: { converted: "$20,293", symbol: "MOI", value: "832,560.18" },
          },
        },
        {
          heading: "Your pool share",
          content: { type: "percentage", value: [21, 18] },
        },
      ]}
      footer={({ compact }) => [
        <Button
          label="Add liquidity"
          mode="primary"
          size={compact ? "compact" : undefined}
          wide
        />,
        <Button
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
