import { Badge, TokenBadge } from "kit"
import { useLabelStyle } from "../styles"
import { Snft } from "../types"

export function NftDetails({ snft }: { snft: Snft }) {
  const labelStyle = useLabelStyle()
  return (
    <section
      css={{
        display: "grid",
        gridTemplateColumns: "38% 38% 24%",
        gap: "2gu",
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
          />,
        ],
        [
          "Guardian",
          <Badge
            uppercase={false}
            fontSize="16px"
            label={snft.guardian}
          />,
        ],
        [
          "Fraction",
          <TokenBadge
            label={snft.token.symbol}
            tokenType="serc20"
          />,
        ],
      ].map((
        [title, content],
        index,
      ) => (
        <dl key={index}>
          <dt css={labelStyle}>{title}</dt>
          <dd
            css={{
              display: "flex",
              overflow: "hidden",
              paddingTop: "1gu",
            }}
          >
            {content}
          </dd>
        </dl>
      ))}
    </section>
  )
}
