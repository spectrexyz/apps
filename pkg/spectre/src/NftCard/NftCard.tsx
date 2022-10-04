import type { ReactNode } from "react"
import type { Snft } from "../types"

import { Anchor, co } from "moire"
import { useLocation } from "wouter"

export function NftCard({
  action,
  snft,
}: {
  action?: ReactNode
  snft: Snft
}) {
  const [, setLocation] = useLocation()
  return (
    <section
      css={({ colors }) => ({
        overflow: "hidden",
        background: co(colors.translucid).alpha(0.2).toHex(),
        borderRadius: "6px",
      })}
    >
      <Anchor
        key={snft.shortId}
        href={`/nfts/${snft.shortId}`}
        onClick={(event) => {
          event.preventDefault()
          setLocation(`/nfts/${snft.shortId}`)
        }}
        css={{ width: "100%" }}
      >
        <img
          src={snft.image}
          alt=""
          css={{
            display: "block",
            width: "100%",
            aspectRatio: "1",
            objectFit: "cover",
          }}
        />
      </Anchor>
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
            padding: action ? "2gu 0 3gu" : "2gu 0 0",
            fontFamily: fonts.sans,
            fontSize: "16px",
            color: colors.accent2,
          })}
        >
          {snft.creator.name}
        </p>
        {action}
      </div>
    </section>
  )
}
