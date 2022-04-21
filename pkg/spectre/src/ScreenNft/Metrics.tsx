import type { ComponentProps, ReactNode } from "react"

import { formatAmount, PoolWeight, TokenAmount } from "kit"
import { useLayout } from "../styles"
import { InfoGrid } from "./InfoGrid"

export function Metrics(
  { compress, footer, metrics, heading }: {
    compress?: ComponentProps<typeof InfoGrid>["compress"]
    footer?: ComponentProps<typeof InfoGrid>["footer"]
    metrics: {
      heading: ReactNode
      content:
        | {
          type: "usdAmount"
          value: bigint
        }
        | {
          type: "tokenAmount"
          value: { converted: string; symbol: string; value: string }
        }
        | {
          type: "percentage"
          value: [whole: string, fraction: string]
        }
        | {
          type: "poolWeight"
          value: { secondary?: string; tokens: Array<[string, number]> }
        }
    }[]
    heading: string
  },
) {
  const layout = useLayout()
  return (
    <InfoGrid
      compress={compress}
      footer={footer}
      heading={heading}
      sections={metrics.map(({ heading, content }) => {
        const { type, value } = content
        const section = { heading }
        if (type === "percentage") {
          return {
            ...section,
            content: (
              <div
                css={({ fonts }) => ({
                  fontFamily: fonts.mono,
                  fontSize: "32px",
                })}
              >
                {value[0]}
                <span css={{ fontSize: "18px" }}>
                  .{value[1] || "00"} %
                </span>
              </div>
            ),
          }
        }
        if (type === "usdAmount") {
          return {
            ...section,
            content: (
              <div
                css={({ fonts }) => ({
                  fontFamily: fonts.mono,
                  fontSize: "32px",
                })}
              >
                ${formatAmount(value, 0, 2)}
              </div>
            ),
          }
        }
        if (type === "tokenAmount") {
          return {
            ...section,
            content: (
              <TokenAmount
                compact={layout.below("xlarge")}
                converted={value.converted}
                symbol={value.symbol}
                value={value.value}
              />
            ),
          }
        }
        if (type === "poolWeight") {
          return {
            ...section,
            content: (
              <PoolWeight
                compact={layout.below("xlarge")}
                secondary={value.secondary}
                tokens={value.tokens}
              />
            ),
          }
        }

        throw new Error(`Unknown type: ${type}`)
      })}
    />
  )
}
