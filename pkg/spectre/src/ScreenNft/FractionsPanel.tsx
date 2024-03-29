import type { Snft } from "../types"

import * as dnum from "dnum"
import { IconHeartbeat, Tip, useEthToUsdFormat } from "moire"
import { useLayout } from "../styles"
import { Metrics } from "./Metrics"
import { NftActions } from "./NftActions"
import { NftDetails } from "./NftDetails"
import { NftHistory } from "./NftHistory"
import { NftTitle } from "./NftTitle"
import { PanelDetails } from "./PanelDetails"
import { TokenContractInfo } from "./TokenContractInfo"

const TOKEN_REPO_URL =
  "https://github.com/spectrexyz/protocol/blob/ac7f40212adf94a6e8ac40b21198697bb1bf3a95/contracts/token/sERC20.sol"

export function FractionsPanel({ snft }: { snft: Snft }) {
  const layout = useLayout()

  if (!snft) {
    return null
  }

  const tokenContract = snft.token.contractAddress

  const [primary, secondary, after = null] = (() => {
    if (layout.above("xlarge")) {
      return [
        <>
          <NftTitle snft={snft} spaceAfter />
          <NftDetails snft={snft} />
          <TokenContractInfo
            contractAddress={tokenContract}
            repoUrl={TOKEN_REPO_URL}
          />
          <FractionsMetrics snft={snft} />
        </>,
        <>
          <NftActions highlight="fractions" snft={snft} />
          <TokenHealthTip />
          <NftHistory snft={snft} />
        </>,
      ]
    }

    if (layout.above("medium")) {
      return [
        <>
          <NftDetails snft={snft} />
          <TokenHealthTip />
          <NftHistory snft={snft} />
        </>,
        <>
          <NftActions highlight="fractions" snft={snft} />
          <TokenContractInfo
            contractAddress={tokenContract}
            repoUrl={TOKEN_REPO_URL}
          />
          <FractionsMetrics snft={snft} />
        </>,
      ]
    }

    // small
    return [
      <>
        <NftDetails snft={snft} />
      </>,
      <>
        <NftActions highlight="fractions" snft={snft} />
        <TokenContractInfo
          contractAddress={tokenContract}
          repoUrl={TOKEN_REPO_URL}
        />
        <FractionsMetrics snft={snft} />
        <TokenHealthTip />
        <NftHistory snft={snft} />
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

function TokenHealthTip() {
  return (
    <div css={{ paddingTop: "8gu" }}>
      <Tip title="Token health tip" icon={<IconHeartbeat />}>
        There’s something else I’ve always wanted to say: Allons-y, Alonso! I’m
        sorry. I’m so sorry. Goodbye…my Sarah Jane! Don’t you think she looks
        tired? Oh, yes. Harmless is just the word: that’s why I like it! Doesn’t
        kill, doesn’t wound, doesn’t maim. But I’ll tell you what it does do: it
        is very good at opening doors.
      </Tip>
    </div>
  )
}

function FractionsMetrics({ snft }: { snft: Snft }) {
  const ethToUsd = useEthToUsdFormat()

  // const mintingFees = dnum.from(12.17, 18)
  // const tradingFees = dnum.from(31.06, 18)

  return (
    <Metrics
      heading="Metrics"
      metrics={[
        {
          heading: "Market cap",
          content: {
            type: "tokenAmount",
            value: {
              converted: ethToUsd(snft.token.marketCapEth),
              symbol: "ETH",
              value: dnum.format(snft.token.marketCapEth, 2),
            },
          },
        },
        {
          heading: "Minted supply",
          content: {
            type: "tokenAmount",
            value: {
              converted: `${dnum.format(snft.token.minted, 0)} of ${
                dnum.format(snft.token.cap, 0)
              } MOI`,
              symbol: "%",
              value: dnum.format(
                dnum.multiply(
                  dnum.divide(snft.token.minted, snft.token.cap),
                  100,
                ),
                1,
              ),
            },
          },
        },
        // {
        //   heading: "Minting fees",
        //   content: {
        //     type: "tokenAmount",
        //     value: {
        //       converted: ethToUsd(mintingFees),
        //       symbol: "ETH",
        //       value: dnum.format(mintingFees, 2),
        //     },
        //   },
        // },
        // {
        //   heading: "Trading fees",
        //   content: {
        //     type: "tokenAmount",
        //     value: {
        //       converted: ethToUsd(tradingFees),
        //       symbol: "ETH",
        //       value: dnum.format(tradingFees, 2),
        //     },
        //   },
        // },
      ]}
    />
  )
}
