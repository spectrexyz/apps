import type { Snft } from "../types"

import { Badge, TokenBadge } from "moire"
import { useLabelStyle, useLayout } from "../styles"

export function NftDetails({ snft }: { snft: Snft }) {
  const labelStyle = useLabelStyle()
  const layout = useLayout()
  return (
    <section
      css={{
        display: "grid",
        gap: "3gu",
        ...(layout.below("xlarge")
          ? {
            gridTemplateRows: "auto auto auto",
            gridTemplateColumns: "100%",
            paddingTop: "4gu",
          }
          : { gridTemplateColumns: "38% 38% 24%" }),
        "dl, dd": {
          margin: 0,
        },
      }}
    >
      {[
        [
          "Creator",
          <Badge
            uppercase={false}
            fontSize="16px"
            color="contentHeading"
            background="layer1"
            label={snft.creator.name}
            key="creator"
          />,
        ],
        [
          "Guardian",
          <Badge
            uppercase={false}
            fontSize="16px"
            label={snft.guardian}
            key="guardian"
          />,
        ],
        [
          "Fraction",
          <TokenBadge
            label={snft.token.symbol}
            tokenType="serc20"
            key="fraction"
          />,
        ],
      ].map((
        [title, content],
        index,
      ) => (
        <dl key={index} css={{ maxWidth: "100%" }}>
          <dt css={labelStyle}>{title}</dt>
          <dd
            css={{
              display: "flex",
              overflow: "hidden",
              paddingTop: layout.below("xlarge") ? 0 : "1gu",
              maxWidth: "100%",
            }}
          >
            {content}
          </dd>
        </dl>
      ))}
    </section>
  )
}
