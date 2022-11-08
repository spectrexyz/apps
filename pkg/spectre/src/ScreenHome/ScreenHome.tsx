import type { SnftPreview } from "../types"

import * as dnum from "dnum"
import { AddressBadge, Anchor, Button, LoadingBox, TokenBadge } from "moire"
import { Link, useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { Grid } from "../AppLayout/Grid"
import { useHighlightedSnfts } from "../snft-hooks"
import { useLayout } from "../styles"

export function ScreenHome() {
  const layout = useLayout()
  return (
    <AppScreen
      compactBar={layout.below("medium") && { title: "Spectre" }}
      loading={false}
    >
      <Heading />
      <HighlightedArtists />
    </AppScreen>
  )
}

function Heading() {
  const layout = useLayout()
  const [titleFontMetrics, subTitleFontSize] = layout.value({
    small: ["32px/1.2", 16],
    large: ["80px/1.3", 24],
  })

  return (
    <div
      css={{
        maxWidth: "160gu",
        margin: "0 auto",
        padding: layout.below("large") ? "2gu" : 0,
        paddingTop: layout.below("large") ? "4gu" : "15gu",
        textAlign: "center",
      }}
    >
      <h1 css={{ font: `700 ${titleFontMetrics} fonts.sans` }}>
        Spectre is an open and public infrastructure for the art market
      </h1>
      <p
        css={{
          maxWidth: "98gu",
          margin: "4gu auto 6gu",
          font: `${subTitleFontSize}px/1.4 fonts.mono`,
          color: "colors.contentDimmed",
        }}
      >
        Use Spectre to allow creative works to be collectively owned. Tokenomics
        made easy and fun, allowing artists to fund themselves.
      </p>
      <div
        css={{
          display: "flex",
          flexDirection: layout.below("large") ? "column" : "row",
          gap: "3gu",
          justifyContent: "center",
        }}
      >
        <Link href="/fractionalize">
          <Button
            label="Fractionalize art"
            mode="primary-2"
            wide={layout.below("large")}
          />
        </Link>
        <Link href="/nfts">
          <Button
            label="Explore artworks"
            mode="secondary-2"
          />
        </Link>
      </div>
    </div>
  )
}

function HighlightedArtists() {
  const [, snftsPrefetchStatus, snftQueries] = useHighlightedSnfts()
  const layout = useLayout()
  return (
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
          Selected artworks
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
          visible={snftsPrefetchStatus === "loading"}
        />
        {snftsPrefetchStatus === "error"
          ? "Error loading the NFTs, please try reloading."
          : (
            <Grid>
              {snftQueries.map((snftQuery) =>
                snftQuery.data && (
                  <HighlightCard
                    key={snftQuery.data.id}
                    snft={snftQuery.data}
                  />
                )
              )}
            </Grid>
          )}
      </div>
    </section>
  )
}

function HighlightCard({ snft }: { snft: SnftPreview }) {
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
