import { ReactNode } from "react"
import { TokenIcon } from "../TokenIcon"

type TokenAmountProps = {
  converted?: ReactNode
  symbol: string
  value: string
}

export function TokenAmount({ converted, symbol, value }: TokenAmountProps) {
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
        <div css={{ fontSize: "32px", transform: "translateY(-1px)" }}>
          <span>{whole}</span>
          <span css={{ fontSize: "18px" }}>{fraction && `.${fraction}`}</span>
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
