import type { SnftPreview } from "../types"

import * as dnum from "dnum"
import { AddressBadge, Anchor, Button, LoadingBox, TokenBadge } from "moire"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { Grid } from "../AppLayout/Grid"
import { useSnfts } from "../snft-hooks"
import { useLayout } from "../styles"

export function ScreenNfts({
  page,
}: {
  page: number
}) {
  const layout = useLayout()
  const snftsQuery = useSnfts()
  const [snftsCount, snfts] = snftsQuery.data ?? [-1, []]
  console.log("count", snftsCount)
  return (
    <AppScreen
      compactBar={layout.below("medium") && { title: "Spectre" }}
      loading={snftsQuery.isLoading}
    >
      <section
        css={{
          position: "relative",
          width: "100%",
          maxWidth: "160gu",
          margin: "0 auto",
          padding: layout.below("large") ? "5gu 0" : "16gu 0",
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "5gu",
            marginBottom: layout.below("large") ? "3gu" : "5gu",
            padding: layout.below("large") ? "0 3gu" : 0,
          }}
        >
          <h1
            css={{
              font: (
                layout.below("large") ? "18px" : "32px"
              ) + " fonts.sans",
            }}
          >
            All artworks
          </h1>
        </div>
        <div css={{ position: "relative" }}>
          <LoadingBox
            container={(children) => (
              <div
                css={{
                  position: "absolute",
                  inset: "5gu auto auto 50%",
                }}
              >
                {children}
              </div>
            )}
            visible={!snfts}
          />
          {snfts && (
            <Grid>
              {snfts.map((snft) => (
                <SnftCard
                  key={snft.id}
                  snft={snft}
                />
              ))}
            </Grid>
          )}
        </div>
      </section>
    </AppScreen>
  )
}

function SnftCard({
  snft,
}: {
  snft: SnftPreview
}) {
  const [, setLocation] = useLocation()
  return (
    <div css={{ paddingBottom: "5gu" }}>
      <Anchor
        href={`/nfts/${snft.shortId}`}
        onClick={(event) => {
          event.preventDefault()
          setLocation(`/nfts/${snft.shortId}`)
        }}
        css={{
          display: "block",
          width: "100%",
        }}
      >
        <div css={{ paddingBottom: "4gu" }}>
          <img
            src={snft.image}
            alt=""
            css={{
              display: "block",
              width: "100%",
              aspectRatio: "1",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </div>
      </Anchor>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "2gu",
          "& > div": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2gu",
          },
        }}
      >
        <div>
          <div css={{ flexShrink: "1", flexGrow: "0" }}>
            <Button
              mode="primary"
              label={snft.title}
              size="compact"
              onClick={() => {
                setLocation(`/nfts/${snft.shortId}`)
              }}
              wide
            />
          </div>
          <div css={{ flexShrink: "0" }}>
            <TokenBadge label={snft.tokenSymbol} />
          </div>
        </div>
        <div>
          <Anchor
            href={`/${snft.guardian}`}
            onClick={(event) => {
              event.preventDefault()
              setLocation(`/${snft.guardian}`)
            }}
            css={{
              color: "colors.link",
              textDecoration: "none",
            }}
          >
            <AddressBadge address={snft.guardian} />
          </Anchor>
          <span css={{ whiteSpace: "nowrap" }}>
            {dnum.format(snft.tokenPriceEth, 4)} ETH
          </span>
        </div>
      </div>
    </div>
  )
}
