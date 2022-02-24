import { Link } from "wouter"
import { useSnftsByCreator } from "../snft-hooks"
import { Snft } from "../types"
import { PanelSection } from "./PanelSection"

export function MoreNfts({ snftFrom }: { snftFrom: Snft }) {
  const snfts = useSnftsByCreator(snftFrom.creator.address, {
    exclude: [snftFrom.id],
  })
  return (
    <PanelSection title="Other NFTs from this creator">
      <div
        css={({ colors }) => ({
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "auto",
          gridAutoFlow: "row",
          gap: "9gu 3gu",
          "img": {
            display: "block",
            width: "100%",
            marginBottom: "2gu",
            borderRadius: "6px",
          },
          "img + div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "5gu",
            fontSize: "18px",
            color: colors.accent,
            background: colors.layer2,
          },
        })}
      >
        {snfts.map((snft) => (
          <Link key={snft.id} href={`/nfts/${snft.id}`}>
            <img src={snft.image} alt="" />
            <div>{snft.title}</div>
          </Link>
        ))}
      </div>
    </PanelSection>
  )
}
