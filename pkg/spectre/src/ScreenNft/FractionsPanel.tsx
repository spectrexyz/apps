import { useSnft } from "../snft-hooks"
import { useLayout } from "../styles"
import { NftActions } from "./NftActions"
import { NftDetails } from "./NftDetails"
import { NftHistory } from "./NftHistory"
import { NftProvenance } from "./NftProvenance"
import { NftTitle } from "./NftTitle"
import { PanelDetails } from "./PanelDetails"

export function FractionsPanel({ id }: { id: string }) {
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
          <NftProvenance />
        </>,
        <>
          <NftActions highlight="fractions" />
          <NftHistory snft={snft} />
        </>,
      ]
    }

    if (layout.above("medium")) {
      return [
        <>
          <NftDetails snft={snft} />
          <NftHistory snft={snft} />
        </>,
        <>
          <NftActions highlight="fractions" />
          <NftProvenance />
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
        <NftProvenance />
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
