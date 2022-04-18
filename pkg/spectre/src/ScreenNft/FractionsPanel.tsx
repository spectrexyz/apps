import { Tip } from "kit"
import { useSnft } from "../snft-hooks"
import { useLayout } from "../styles"
import { FractionsMetrics } from "./FractionsMetrics"
import { NftActions } from "./NftActions"
import { NftDetails } from "./NftDetails"
import { NftHistory } from "./NftHistory"
import { NftTitle } from "./NftTitle"
import { PanelDetails } from "./PanelDetails"
import { TokenContractInfo } from "./TokenContractInfo"

export function FractionsPanel({ id }: { id: string }) {
  const snft = useSnft(id)
  const layout = useLayout()

  if (!snft) {
    return null
  }

  const tokenContract = "0xfabe062eb33af3e68eb3329818d0507949c14142"
  const tokenRepoUrl = "https://github.com/"

  const [primary, secondary, after = null] = (() => {
    if (layout.above("xlarge")) {
      return [
        <>
          <NftTitle snft={snft} spaceAfter />
          <NftDetails snft={snft} />
          <TokenContractInfo
            contractAddress={tokenContract}
            repoUrl={tokenRepoUrl}
          />
          <FractionsMetrics />
        </>,
        <>
          <NftActions highlight="fractions" />
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
          <NftActions highlight="fractions" />
          <TokenContractInfo
            contractAddress={tokenContract}
            repoUrl={tokenRepoUrl}
          />
          <FractionsMetrics />
        </>,
      ]
    }

    // small
    return [
      <>
        <NftDetails snft={snft} />
      </>,
      <>
        <NftActions highlight="fractions" />
        <TokenContractInfo
          contractAddress={tokenContract}
          repoUrl={tokenRepoUrl}
        />
        <FractionsMetrics />
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
      <Tip title="Token health tip">
        There’s something else I’ve always wanted to say: Allons-y, Alonso! I’m
        sorry. I’m so sorry. Goodbye…my Sarah Jane! Don’t you think she looks
        tired? Oh, yes. Harmless is just the word: that’s why I like it! Doesn’t
        kill, doesn’t wound, doesn’t maim. But I’ll tell you what it does do: it
        is very good at opening doors.
      </Tip>
    </div>
  )
}
