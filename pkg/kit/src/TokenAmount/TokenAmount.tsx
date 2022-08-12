import type { Dnum } from "dnum"

import * as dnum from "dnum"
import { ReactNode } from "react"
import { TokenIcon } from "../TokenIcon"

export function TokenAmount(
  {
    compact = false,
    converted,
    digits,
    symbol,
    value,
  }: {
    compact?: boolean
    converted?: ReactNode
    digits?: number
    symbol: string
    value: Dnum | string
  },
) {
  if (dnum.isDnum(value)) {
    value = dnum.format(value)
  }

  const [whole, fraction_] = value.split(".")
  let fraction = fraction_
  if (digits !== undefined && fraction) {
    fraction = fraction.slice(0, digits)
  }

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
            {fraction && <span css={{ fontSize: "18px" }}>.{fraction}</span>}
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
