import type { ComponentProps, ReactNode } from "react"

import { formatAmount, Percentage, PoolWeight, TokenAmount } from "moire"
import { match } from "ts-pattern"
import { useLayout } from "../styles"
import { InfoGrid } from "./InfoGrid"

export function Metrics(
  {
    compress,
    footer,
    metrics,
    heading,
  }: {
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
    heading?: string
  },
) {
  const layout = useLayout()
  return (
    <InfoGrid
      compress={compress}
      footer={footer}
      heading={heading}
      sections={metrics.map(({ heading, content }) => ({
        heading,
        content: match(content)
          .with(
            { type: "percentage" },
            ({ value }) => <Percentage percentage={value.join(".")} />,
          )
          .with(
            { type: "usdAmount" },
            ({ value }) => (
              <div css={{ fontFamily: "fonts.mono", fontSize: "32px" }}>
                ${formatAmount(value, 0, 2)}
              </div>
            ),
          )
          .with(
            { type: "tokenAmount" },
            ({ value }) => (
              <TokenAmount
                compact={layout.below("xlarge")}
                converted={value.converted}
                symbol={value.symbol}
                value={value.value}
              />
            ),
          )
          .with(
            { type: "poolWeight" },
            ({ value }) => (
              <PoolWeight
                compact={layout.below("xlarge")}
                secondary={value.secondary}
                tokens={value.tokens}
              />
            ),
          )
          .exhaustive(),
      }))}
    />
  )
}
