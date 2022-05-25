import type { Dnum } from "dnum"
import type { Address } from "kit"

import dnum from "dnum"
import { Button, co, formatNumber, gu } from "kit"
import { useMemo } from "react"
import { useLocation } from "wouter"
import { useSnft, useToken } from "../snft-hooks"
import { useLayout } from "../styles"

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
                flexShrink: "0",
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
              title={`Owns ${percentageOwned}`}
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
              <span
                css={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {percentageOwned}
              </span>{" "}
              {layout.above("large") && (
                <span
                  css={({ colors }) => ({
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    color: colors.accent2,
                  })}
                >
                  {`(${tokensOwned})`}
                </span>
              )}
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
            <DiscsChain
              images={snft.token.topHolders.slice(
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
            {formatNumber(snft.token.holdersCount, 0, { compact: true })} owners
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
              layout.above("large")
                ? "1 ETH gets you ~"
                : "1 ETH ~",
              `${
                dnum.format(
                  dnum.divide(dnum.from(1, 18), token.data.priceEth),
                  { digits: 2, compact: true },
                )
              } ${token.data.symbol}`,
              "left",
            ] as const,
            [
              "Market cap",
              dnum.format(
                token.data.marketCapEth,
                { digits: 2, compact: true },
              )
              + " ETH",
              "right",
            ] as const,
          ].map(([title, value, textAlign]) => (
            <div key={title} css={{ textAlign, whiteSpace: "nowrap" }}>
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
        <div css={{ display: "flex", flexDirection: "column", gap: "2gu" }}>
          <Button
            label="Swap fractions"
            mode="primary"
            onClick={() =>
              setLocation(`/nfts/${snftId}/buy`)}
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

function DiscsChain({
  images,
}: {
  images: Array<readonly [alt: string, url: string]>
}) {
  return (
    <div
      css={{
        display: "flex",
        marginLeft: "1.5gu",
        "img": {
          marginLeft: "-1.5gu",
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
