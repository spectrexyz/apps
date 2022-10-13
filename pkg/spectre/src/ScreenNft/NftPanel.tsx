import type { Snft } from "../types"

import { useLayout } from "../styles"
import { MoreNfts } from "./MoreNfts"
import { NftActions } from "./NftActions"
import { NftDescription } from "./NftDescription"
import { NftDetails } from "./NftDetails"
import { NftHistory } from "./NftHistory"
import { NftOwnership } from "./NftOwnership"
import { NftProvenance } from "./NftProvenance"
import { NftTitle } from "./NftTitle"
import { PanelDetails } from "./PanelDetails"

export function NftPanel({ snft }: { snft: Snft }) {
  const layout = useLayout()

  if (!snft) {
    return null
  }

  const [primary, secondary, after = null] = (() => {
    if (layout.above("xlarge")) {
      return [
        <>
          <NftTitle snft={snft} />
          <NftDescription snft={snft} />
          <NftProvenance snft={snft} />
          <MoreNfts snftFrom={snft} />
        </>,
        <>
          <NftDetails snft={snft} />
          <NftActions snft={snft} />
          <NftOwnership snft={snft} />
          <NftHistory snft={snft} />
        </>,
      ]
    }

    if (layout.above("medium")) {
      return [
        <>
          <NftTitle snft={snft} />
          <NftDescription snft={snft} />
          <NftDetails snft={snft} />
          <NftHistory snft={snft} />
        </>,
        <>
          <NftActions snft={snft} />
          <NftProvenance snft={snft} />
          <NftOwnership snft={snft} />
        </>,
        <>
          <MoreNfts snftFrom={snft} />
        </>,
      ]
    }

    // small
    return [
      <>
        <NftTitle snft={snft} />
        <NftDescription snft={snft} />
        <NftDetails snft={snft} />
      </>,
      <>
        <NftActions snft={snft} />
        <NftProvenance snft={snft} />
        <NftOwnership snft={snft} />
        <NftHistory snft={snft} />
        <MoreNfts snftFrom={snft} />
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
