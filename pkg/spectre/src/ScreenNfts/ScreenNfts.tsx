import type { SnftPreview } from "../types"

import * as dnum from "dnum"
import {
  AddressBadge,
  Anchor,
  Button,
  ButtonText,
  Card,
  list,
  TokenBadge,
} from "moire"
import { useCallback, useMemo } from "react"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { Grid } from "../AppLayout/Grid"
import { useSnfts } from "../snft-hooks"
import { useLayout } from "../styles"
import { pagination } from "../utils"

const SNFTS_PER_PAGE = 12

export function ScreenNfts({
  page,
}: {
  page: number
}) {
  const layout = useLayout()
  const [snftsCount, snftsPrefetchStatus, snftQueries] = useSnfts({
    first: SNFTS_PER_PAGE,
    skip: SNFTS_PER_PAGE * page,
  })

  const paginationData = useMemo(
    () =>
      pagination(
        page,
        SNFTS_PER_PAGE,
        snftsCount === null ? -1 : snftsCount,
      ),
    [page, snftsCount],
  )

  const [, setLocation] = useLocation()
  const setPage = useCallback((page: number) => {
    setLocation(page === 0 ? "/nfts" : `/nfts/page/${page + 1}`)
  }, [setLocation])

  return (
    <AppScreen
      compactBar={layout.below("medium") && { title: "Spectre" }}
      loading={snftsPrefetchStatus === "loading"}
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
          {snftsPrefetchStatus === "error"
            ? "Error loading the NFTs, please try reloading."
            : (
              <Grid>
                {list(paginationData.pageItems ?? 0, (index) => {
                  const snftQuery = snftQueries[index]
                  const loading = !snftQuery || snftQuery.status === "loading"
                  return (
                    <SnftCard
                      key={index}
                      loading={loading}
                      snft={snftQuery?.data}
                    />
                  )
                })}
              </Grid>
            )}
        </div>
        {snftsPrefetchStatus === "success" && paginationData.pages > 1 && (
          <Pagination
            next={paginationData.next}
            onPage={setPage}
            page={paginationData.page}
            prev={paginationData.prev}
          />
        )}
      </section>
    </AppScreen>
  )
}

function SnftCard({
  loading,
  snft,
}: {
  loading: boolean
  snft?: SnftPreview
}) {
  const [, setLocation] = useLocation()
  return (
    <Card loading={loading}>
      {snft && (
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
                  objectFit: "contain",
                  borderRadius: "6px",
                  background: "colors.layer2",
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
      )}
    </Card>
  )
}

function Pagination(
  {
    next,
    onPage,
    page,
    prev,
  }: {
    next: number | null
    onPage: (page: number) => void
    page: number
    prev: number | null
  },
) {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2gu",
      }}
    >
      {prev !== null && (
        <ButtonText
          label="Previous"
          onClick={() => {
            if (prev !== null) {
              onPage(prev)
            }
          }}
        />
      )}
      <div css={{ fontFamily: "fonts.mono" }}>{page + 1}</div>
      {next !== null && (
        <ButtonText
          label="Next"
          onClick={() => {
            if (next !== null) {
              onPage(next)
            }
          }}
        />
      )}
    </div>
  )
}
