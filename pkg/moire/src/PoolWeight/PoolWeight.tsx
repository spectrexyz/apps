import { ReactNode } from "react"
import { TokenIcon } from "../TokenIcon"

type PoolWeightProps = {
  compact?: boolean
  secondary?: ReactNode
  tokens: Array<[symbolName: string, percentage: number]>
}

export function PoolWeight(
  { compact = false, secondary, tokens }: PoolWeightProps,
) {
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
        <div css={{ display: "flex" }}>
          {tokens.map(([symbol], index) => (
            <div
              key={symbol}
              css={{
                position: "relative",
                zIndex: tokens.length - index,
                marginLeft: index > 0 ? "-6px" : "0px",
              }}
            >
              <TokenIcon
                alt={symbol}
                tokenType={symbol === "ETH"
                  ? "eth"
                  : "serc20"}
              />
            </div>
          ))}
        </div>
        <div
          css={{
            display: "flex",
            fontSize: compact ? "24px" : "32px",
            transform: "translateY(-1px)",
          }}
        >
          {tokens.map(([, percentage], index) => (
            <div key={index}>
              {index > 0 && <span css={{ fontSize: "18px" }}>{" / "}</span>}
              <span>{percentage}</span>
              <span css={{ fontSize: "18px", letterSpacing: "-4px" }}>
                {" %"}
              </span>
            </div>
          ))}
        </div>
      </div>
      {secondary && (
        <div
          css={({ colors }) => ({
            marginTop: "0",
            color: colors.contentDimmed,
          })}
        >
          {secondary}
        </div>
      )}
    </div>
  )
}
