import type { Dnum } from "dnum"
import type { Address } from "kit"

import dnum from "dnum"
import { Button, co, formatNumber, gu } from "kit"
import { useMemo } from "react"
import { useLocation } from "wouter"
import { useSnft, useToken } from "../snft-hooks"

export function FractionsCard({
  quantity,
  snftId,
  token: [tokenContract, tokenId],
}: {
  quantity: Dnum
  snftId: string
  token: readonly [Address, string]
}) {
  const [, setLocation] = useLocation()
  const snft = useSnft(snftId)
  const token = useToken(tokenContract, tokenId)

  const tokenData = token.data
  const supply = tokenData?.supply

  const percentageOwned = useMemo(
    () =>
      supply
        ? dnum.format(dnum.divide(quantity, supply), 6) + "%"
        : "−",
    [quantity, supply],
  )

  if (!snft || !token.data) {
    return null
  }

  return (
    <section
      css={({ colors }) => ({
        overflow: "hidden",
        background: co(colors.accent2).alpha(0.16).toHex(),
      })}
    >
      <div css={{ padding: "3gu 3gu 0" }}>
        <div css={{ position: "relative" }}>
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
                overflow: "hidden",
                width: "3gu",
                height: "3gu",
                borderRadius: "50%",
              }}
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
            </div>
            <div
              css={{
                display: "flex",
                gap: "0.5gu",
                alignItems: "center",
                padding: "0 1gu 0 1gu",
                textTransform: "uppercase",
              }}
            >
              <span css={{ fontSize: "16px" }}>Owns</span>{" "}
              <span
                css={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {percentageOwned}
              </span>{" "}
              <span
                css={({ colors }) => ({
                  fontSize: "14px",
                  color: colors.accent2,
                })}
              >
                {`(${dnum.format(quantity, 2)} ${token.data?.symbol})`}
              </span>
            </div>
          </div>
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
        </div>
      </div>
      <div css={{ padding: "2gu 3gu 3gu" }}>
        <h1
          title={snft.title}
          css={({ colors }) => ({
            fontSize: "18px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: colors.contentHeading2,
          })}
        >
          {snft.title}
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
            <DiscsChain images={snft.token.topHolders} />
          </div>
          <div css={{ textTransform: "uppercase" }}>
            {formatNumber(snft.token.holdersCount)} owners
          </div>
        </div>
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "3gu 0",
          }}
        >
          {[
            [
              "1 ETH gets you ~",
              `${
                dnum.format(
                  dnum.divide(dnum.from(1, 18), token.data.priceEth),
                  { digits: 4, compact: true },
                )
              } ${token.data.symbol}`,
              "left",
            ] as const,
            [
              "Market cap",
              dnum.format(token.data.marketCapEth, 4) + " ETH",
              "right",
            ] as const,
          ].map(([title, value, textAlign]) => (
            <div key={title} css={{ textAlign }}>
              <div
                css={{
                  paddingBottom: "1gu",
                  textTransform: "uppercase",
                  fontSize: "14px",
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
        <div css={{ display: "flex", flexDirection: "column", gap: "2gu" }}>
          <Button
            label="Swap fractions"
            mode="primary"
            onClick={() => setLocation(`/nfts/${snftId}/buy`)}
            wide
          />
          <Button
            label="NFT buyout"
            mode="secondary"
            wide
          />
        </div>
      </div>
    </section>
  )
}

function DiscsChain(
  { images }: { images: Array<readonly [alt: string, url: string]> },
) {
  return (
    <div
      css={{
        "img": {
          marginLeft: "-12px",
          borderRadius: "50%",
        },
      }}
    >
      {images.map(([alt, url], index) => (
        <img
          key={`${index}${url}`}
          alt={alt}
          height={4 * gu}
          src={url}
          title={alt}
          width={4 * gu}
        />
      ))}
    </div>
  )
}
