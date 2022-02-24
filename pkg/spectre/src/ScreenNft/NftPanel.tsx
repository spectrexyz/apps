import { useSnft } from "../snft-hooks"
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

  if (!snft) {
    return null
  }

  return (
    <section>
      <PanelDetails
        title={snft.title}
        primary={
          <>
            <NftDescription snft={snft} />
            <NftProvenance />
            <MoreNfts snftFrom={snft} />
          </>
        }
        secondary={
          <>
            <NftDetails snft={snft} />
            <NftActions />
            <NftOwnership snft={snft} />
            <NftHistory snft={snft} />
          </>
        }
      />
    </section>
  )
}
