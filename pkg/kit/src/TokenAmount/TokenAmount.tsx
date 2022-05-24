import { ReactNode } from "react"
import { TokenIcon } from "../TokenIcon"

type TokenAmountProps = {
  compact?: boolean
  converted?: ReactNode
  symbol: string
  value: string
}

export function TokenAmount(
  { compact = false, converted, symbol, value }: TokenAmountProps,
) {
  const [whole, fraction] = value.split(".")
  return (
    <div css={{ display: "flex", flexDirection: "column" }}>
      <div
        css={({ fonts }) => ({
          display: "flex",
          alignItems: "center",
          gap: "1gu",
          fontFamily: fonts.mono,
        })}
      >
        <TokenIcon tokenType={symbol === "ETH" ? "eth" : "serc20"} />
        <div
          css={{
            display: "flex",
            alignItems: "baseline",
            transform: "translateY(-1px)",
            fontSize: compact ? "24px" : "32px",
          }}
        >
          <span>
            <span>{whole}</span>
            <span css={{ fontSize: "18px" }}>{fraction && `.${fraction}`}</span>
          </span>{" "}
          <span css={{ fontSize: "18px", marginLeft: "1gu" }}>{symbol}</span>
        </div>
      </div>
      {converted && (
        <div
          css={({ colors }) => ({
            marginTop: "0",
            color: colors.contentDimmed,
          })}
        >
          {converted}
        </div>
      )}
    </div>
  )
}
