import type { Snft } from "../types"

import { Button, co } from "kit"

export function NftCard({ snft }: { snft: Snft }) {
  return (
    <section
      css={({ colors }) => ({
        overflow: "hidden",
        background: co(colors.translucid).alpha(0.2).toHex(),
        borderRadius: "6px",
      })}
    >
      <img
        src={snft.image.url}
        alt=""
        css={{
          display: "block",
          width: "100%",
          aspectRatio: "1",
          objectFit: "cover",
        }}
      />
      <div css={{ padding: "3gu" }}>
        <h1
          title={snft.title}
          css={{
            fontSize: "28px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {snft.title}
        </h1>
        <p
          css={({ colors, fonts }) => ({
            padding: "2gu 0 3gu",
            fontFamily: fonts.sans,
            fontSize: "16px",
            color: colors.accent2,
          })}
        >
          {snft.creator.name}
        </p>
        <Button label="Fractionalize" mode="primary" wide />
      </div>
    </section>
  )
}
