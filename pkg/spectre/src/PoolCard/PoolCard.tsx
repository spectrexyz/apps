import type { Dnum } from "dnum"
import type { Address } from "kit"
import type { ReactNode } from "react"

import dnum from "dnum"
import {
  Button,
  Card,
  DiscsChain,
  gu,
  IconEye,
  Percentage,
  TokenAmount,
  TokenIcon,
  useEthToUsdFormat,
  useTheme,
} from "kit"
import { usePool, useSnft2, useToken } from "../snft-hooks"
import { useLabelStyle } from "../styles"

export function PoolCard({
  compact,
  poolShare,
  snftId,
  token: [tokenContract, tokenId],
}: {
  compact: boolean
  poolShare: Dnum
  snftId: string
  token: readonly [Address, string]
}) {
  const { colors } = useTheme()
  const snft = useSnft2(snftId)
  const token = useToken([tokenContract, tokenId])
  const pool = usePool([tokenContract, tokenId])
  const ethToUsd = useEthToUsdFormat()

  const isLoading = !(token.data && pool.data)

  return (
    <Card
      loading={isLoading}
      loadingBackground={colors.background}
      css={{ height: "100%", minHeight: "70gu" }}
    >
      {token.data && (
        <div
          css={{
            overflow: "hidden",
            width: "100%",
            height: "100%",
            background: "colors.background",
            border: "2px solid colors.layer2",
          }}
        >
          <section
            css={{
              display: "flex",
              flexDirection: "column",
              padding: "3gu",
            }}
          >
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 0 3gu",
              }}
            >
              <DiscsChain
                images={[
                  <TokenIcon
                    alt=""
                    size={compact ? 4 * gu : 8 * gu}
                    tokenType="eth"
                  />,
                  <TokenIcon
                    alt=""
                    size={compact ? 4 * gu : 8 * gu}
                    src={snft.data?.image.url}
                    tokenType="serc20"
                  />,
                ]}
              />

              <Button
                icon={<IconEye />}
                label={compact ? "Balancer" : "View Balancer"}
                mode="flat"
                size="small"
                uppercase={true}
              />
            </div>
            <div>
              ETH/{token.data.symbol}
            </div>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
                gap: "3gu",
                paddingTop: "4gu",
              }}
            >
              <Definition title="Pooled ETH" spacing={0.5 * gu}>
                {pool.data && (
                  <TokenAmount
                    compact={true}
                    converted={ethToUsd(pool.data.eth)}
                    symbol="ETH"
                    value={dnum.format(pool.data.eth, {
                      digits: 2,
                      compact: true,
                    })}
                  />
                )}
              </Definition>
              <Definition
                title={`Pooled ${token.data.symbol}`}
                spacing={0.5 * gu}
              >
                {pool.data && (
                  <TokenAmount
                    compact={true}
                    converted={ethToUsd(dnum.multiply(
                      pool.data.token,
                      token.data.priceEth,
                    ))}
                    symbol={token.data.symbol}
                    value={dnum.format(pool.data.token, {
                      digits: 2,
                      compact: true,
                    })}
                  />
                )}
              </Definition>
            </div>

            <div css={{ padding: "4gu 0" }}>
              <div
                css={{
                  height: "2px",
                  background: "colors.layer2",
                }}
              />
            </div>
            <div css={{ paddingBottom: "3gu" }}>
              <Definition title="Pool share owned" spacing={0}>
                <Percentage percentage={poolShare} />
              </Definition>
            </div>
            <Definition title="Pool value owned">
              <div css={{ fontSize: "16px" }}>
                $108,028,579
              </div>
            </Definition>
          </section>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5gu",
              padding: "3gu",
            }}
          >
            <Button wide label="Remove liquidity" />
            <Button wide label="Add liquidity" mode="primary" />
          </div>
        </div>
      )}
    </Card>
  )
}

function Definition({
  children,
  spacing = 1 * gu,
  title,
}: {
  children: ReactNode
  spacing?: Number
  title: ReactNode
}) {
  const labelStyle = useLabelStyle({ size: "small" })
  return (
    <div>
      <h2 css={labelStyle}>{title}</h2>
      <div css={{ paddingTop: `${spacing}px` }}>{children}</div>
    </div>
  )
}
