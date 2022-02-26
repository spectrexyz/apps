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

  return (
    <section>
      <PanelDetails
        primary={
          <>
            <NftDescription snft={snft} />
            {layout.below("xlarge") && <NftDetails snft={snft} />}
            {!layout.below("xlarge") && <NftProvenance />}
            {!layout.below("xlarge") && <MoreNfts snftFrom={snft} />}
          </>
        }
        secondary={
          <>
            {!layout.below("xlarge") && <NftDetails snft={snft} />}
            <NftActions />
            {layout.below("xlarge") && <NftProvenance />}
            <NftOwnership snft={snft} />
            <NftHistory snft={snft} />
            {layout.below("xlarge") && <MoreNfts snftFrom={snft} />}
          </>
        }
      />
    </section>
  )
}
