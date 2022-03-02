import { useSnft } from "../snft-hooks"
import { useLayout } from "../styles"
import { MoreNfts } from "./MoreNfts"
import { NftActions } from "./NftActions"
import { NftDescription } from "./NftDescription"
import { NftDetails } from "./NftDetails"
import { NftHistory } from "./NftHistory"
import { NftOwnership } from "./NftOwnership"
import { NftProvenance } from "./NftProvenance"
import { PanelDetails } from "./PanelDetails"

export function NftPanel({ id }: { id: string }) {
  const snft = useSnft(id)
  const layout = useLayout()

  if (!snft) {
    return null
  }

  const [primary, secondary, after = null] = (() => {
    if (layout.above("xlarge")) {
      return [
        <>
          <NftDescription snft={snft} />
          <NftProvenance />
          <MoreNfts snftFrom={snft} />
        </>,
        <>
          <NftDetails snft={snft} />
          <NftActions />
          <NftOwnership snft={snft} />
          <NftHistory snft={snft} />
        </>,
      ]
    }

    if (layout.above("medium")) {
      return [
        <>
          <NftDescription snft={snft} />
          <NftDetails snft={snft} />
          <NftHistory snft={snft} />
        </>,
        <>
          <NftActions />
          <NftProvenance />
          <NftOwnership snft={snft} />
        </>,
        <MoreNfts snftFrom={snft} />,
      ]
    }

    // small
    return [
      <>
        <NftDescription snft={snft} />
        <NftDetails snft={snft} />
      </>,
      <>
        <NftActions />
        <NftProvenance />
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
