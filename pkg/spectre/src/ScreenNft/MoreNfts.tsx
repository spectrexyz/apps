import type { Snft } from "../types"

import { gu, Truncate } from "moire"
import { Link } from "wouter"
import { useSnftsByCreator } from "../snft-hooks"
import { useLayout, useViewportValue } from "../styles"
import { PanelSection } from "./PanelSection"

export function MoreNfts({ snftFrom }: { snftFrom: Snft }) {
  const snfts = useSnftsByCreator(snftFrom.creator.address, {
    exclude: [snftFrom.id],
    first: 4,
  })

  const layout = useLayout()

  const viewportStyles = useViewportValue(({ width }) => [
    [width < 50 * gu, {
      columns: 1,
      maxWidth: "unset",
      padding: "0",
    }],
    [width < 72 * gu, {
      columns: 2,
      maxWidth: "unset",
      padding: "0",
    }],
    [width < 96 * gu, {
      columns: 3,
      maxWidth: "unset",
      padding: "0",
    }],
    [width < 120 * gu, {
      columns: 3,
      maxWidth: "unset",
      padding: "0 3gu",
    }],
    [width < 180 * gu, {
      columns: 4,
      maxWidth: "160gu",
      padding: "0 3gu",
    }],
    [true, {
      columns: 2,
      maxWidth: "unset",
      padding: "0",
    }],
  ])

  const imgSpacing = layout.value({
    small: "1.5gu",
    xlarge: "2gu",
  })

  if (!snfts.data?.length) {
    return null
  }

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
            gridTemplateColumns:
              `repeat(${viewportStyles.columns}, minmax(0, 1fr))`,
            gridAutoRows: "auto",
            gridAutoFlow: "row",
            gap: "3gu",
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
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          })}
        >
          {snfts.data?.map((snft) => (
            <Link key={snft.shortId} href={`/nfts/${snft.shortId}`}>
              <img src={snft.image} alt="" />
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0 1gu",
                  textTransform: "uppercase",
                  fontSize: "16px",
                }}
              >
                {<Truncate text={snft.title} />}
              </div>
            </Link>
          ))}
        </div>
      </PanelSection>
    </div>
  )
}
