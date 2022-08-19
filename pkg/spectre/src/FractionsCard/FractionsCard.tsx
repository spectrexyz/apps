import type { Dnum } from "dnum"
import type { TokenLocator } from "../types"

import * as dnum from "dnum"
import { Button, Card, co, DiscsChain, formatNumber } from "moire"
import { useMemo } from "react"
import { useLocation } from "wouter"
import { useSnft, useToken } from "../snft-hooks"
import { useLayout } from "../styles"

export function FractionsCard({
  className,
  quantity,
  snftId,
  token: [tokenContract, tokenId],
}: {
  className?: string
  quantity: Dnum
  snftId: string
  token: TokenLocator
}) {
  const [, setLocation] = useLocation()
  const snft = useSnft(snftId)
  const token = useToken([tokenContract, tokenId])
  const layout = useLayout()

  const tokenData = token.data
  const supply = tokenData?.supply

  const percentageOwned = useMemo(
    () =>
      supply
        ? dnum.format(dnum.divide(quantity, supply), 3) + "%"
        : "−",
    [quantity, supply],
  )

  const tokensOwned = useMemo(
    () =>
      `${
        dnum.format(
          quantity,
          { digits: 2, compact: true },
        )
      } ${tokenData?.symbol}`,
    [quantity, tokenData],
  )

  return (
    <Card
      className={className}
      loading={!(snft.data && token.data)}
      css={{ height: "100%", minHeight: "70gu" }}
    >
      {snft.data && token.data && (
        <div
          css={({ colors }) => ({
            overflow: "hidden",
            width: "100%",
            height: "100%",
            background: co(colors.accent2).alpha(0.16).toHex(),
          })}
        >
          <section css={{ display: "flex", flexDirection: "column" }}>
            <div css={{ padding: "3gu 3gu 0" }}>
              <div css={{ position: "relative" }}>
                <OwnsBadge
                  image={snft.data?.image.url}
                  tokens={tokensOwned}
                  percentage={percentageOwned}
                />
                <img
                  src={snft.data.image.url}
                  alt=""
                  css={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div css={{ padding: "2gu 3gu 3gu" }}>
              <h1
                title={snft.data.title}
                css={({ colors }) => ({
                  fontSize: "18px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: colors.contentHeading2,
                })}
              >
                {snft.data.title}
              </h1>
              <div
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "3gu",
                }}
              >
                <div>
                  <DiscsChain
                    images={snft.data.token.topHolders.slice(
                      0,
                      layout.value({
                        small: 3,
                        large: 6,
                        xlarge: 9,
                      }),
                    )}
                  />
                </div>
                <div
                  css={{
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  {formatNumber(snft.data.token.holdersCount, 0, {
                    compact: true,
                  })} owners
                </div>
              </div>
              <div
                css={{
                  display: layout.below("medium")
                    ? "block"
                    : "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "3gu 0",
                }}
              >
                {[
                  [
                    layout.above("large")
                      ? "1 ETH gets you ~"
                      : "1 ETH ~",
                    `${
                      dnum.format(
                        dnum.divide(dnum.from(1, 18), token.data.priceEth),
                        { digits: 2, compact: true },
                      )
                    } ${token.data.symbol}`,
                  ] as const,
                  [
                    "Market cap",
                    dnum.format(
                      token.data.marketCapEth,
                      { digits: 2, compact: true },
                    )
                    + " ETH",
                  ] as const,
                ].map(([title, value], index) => (
                  <div
                    key={title}
                    css={{
                      textAlign: layout.below("medium") || index === 0
                        ? "left"
                        : "right",
                      whiteSpace: "nowrap",
                      paddingTop: layout.below("medium") && index > 0
                        ? "2gu"
                        : 0,
                    }}
                  >
                    <div
                      css={{
                        paddingBottom: "1gu",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        userSelect: "none",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      css={({ colors }) => ({
                        fontSize: "16px",
                        color: colors.accent2,
                      })}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2gu",
                }}
              >
                <Button
                  label={layout.below("medium")
                    ? "Swap"
                    : "Swap fractions"}
                  mode="primary"
                  onClick={() => setLocation(`/nfts/${snftId}/buy`)}
                  wide
                />
                <Button
                  label={layout.below("medium") ? "Buyout" : "NFT buyout"}
                  mode="secondary"
                  wide
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </Card>
  )
}

function OwnsBadge(
  {
    image,
    percentage,
    tokens,
  }: {
    image: string
    percentage: string
    tokens: string
  },
) {
  const layout = useLayout()
  return (
    <div
      css={{
        position: "absolute",
        inset: "1gu auto auto 1gu",
        display: "flex",
        alignItems: "center",
        height: "4gu",
        paddingLeft: "0.5gu",
        background: "#8177FF",
        borderRadius: "2gu",
      }}
    >
      <div
        css={{
          flexShrink: "0",
          overflow: "hidden",
          width: "3gu",
          height: "3gu",
          borderRadius: "50%",
        }}
      >
        <img
          src={image}
          alt=""
          css={{
            display: "block",
            width: "100%",
            aspectRatio: "1",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        title={`Owns ${percentage} (${tokens})`}
        css={{
          display: "flex",
          gap: "0.5gu",
          alignItems: "baseline",
          padding: "0 1gu 0 1gu",
          textTransform: "uppercase",
          cursor: "default",
        }}
      >
        {(layout.below("large") || layout.above("xlarge")) && (
          <span css={{ fontSize: "16px" }}>Owns{" "}</span>
        )}
        <span css={{ fontSize: "18px", fontWeight: "bold" }}>
          {percentage}
        </span>{" "}
        {layout.above("large") && (
          <span
            css={({ colors }) => ({
              transform: "translateY(-1px)",
              fontSize: "14px",
              whiteSpace: "nowrap",
              color: colors.accent2,
            })}
          >
            {`(${tokens})`}
          </span>
        )}
      </div>
    </div>
  )
}
