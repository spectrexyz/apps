import { gu } from "kit"
import { Link } from "wouter"
import { useSnftsByCreator } from "../snft-hooks"
import { useLayout, useViewportValue } from "../styles"
import { Snft } from "../types"
import { PanelSection } from "./PanelSection"

export function MoreNfts({ snftFrom }: { snftFrom: Snft }) {
  const snfts = useSnftsByCreator(snftFrom.creator.address, {
    exclude: [snftFrom.id],
    limit: 4,
  })

  const layout = useLayout()

  const viewportStyles = useViewportValue(({ width }) => [
    [width < 50 * gu, {
      columns: "1fr",
      maxWidth: "unset",
      padding: "0",
    }],
    [width < 72 * gu, {
      columns: "1fr 1fr",
      maxWidth: "unset",
      padding: "0",
    }],
    [width < 96 * gu, {
      columns: "1fr 1fr 1fr",
      maxWidth: "unset",
      padding: "0",
    }],
    [width < 120 * gu, {
      columns: "1fr 1fr 1fr",
      maxWidth: "unset",
      padding: "0 3gu",
    }],
    [width < 180 * gu, {
      columns: "1fr 1fr 1fr 1fr",
      maxWidth: "160gu",
      padding: "0 3gu",
    }],
    [true, {
      columns: "1fr 1fr",
      maxWidth: "unset",
      padding: "0",
    }],
  ])

  const imgSpacing = layout.value({
    small: "1.5gu",
    xlarge: "2gu",
  })

  return (
    <div
      css={{
        maxWidth: viewportStyles.maxWidth,
        margin: "0 auto",
        padding: viewportStyles.padding,
      }}
    >
      <PanelSection title="Other NFTs from this creator">
        <div
          css={({ colors }) => ({
            display: "grid",
            gridTemplateColumns: viewportStyles.columns,
            gridAutoRows: "auto",
            gridAutoFlow: "row",
            gap: layout.below("xlarge") ? "3gu" : "9gu 3gu",
            "img": {
              display: "block",
              width: "100%",
              marginBottom: imgSpacing,
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
          {snfts.data?.map((snft) => (
            <Link key={snft.id} href={`/nfts/${snft.id}`}>
              <img src={snft.image.url} alt="" />
              <div>{snft.title}</div>
            </Link>
          ))}
        </div>
      </PanelSection>
    </div>
  )
}
