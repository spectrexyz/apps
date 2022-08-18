import { gu, PoolWeight } from "moire"

export function PoolWeightDemo() {
  return (
    <div css={{ display: "flex", flexDirection: "column", gap: "4gu" }}>
      <PoolWeight
        tokens={[
          ["ABC", 68],
          ["ETH", 32],
        ]}
      />
      <PoolWeight
        secondary="Last 24h"
        tokens={[
          ["ABC", 68],
          ["ETH", 32],
        ]}
      />
      <PoolWeight
        tokens={[
          ["ABC", 4],
          ["ETH", 7],
          ["DEF", 17],
          ["GHI", 28],
          ["JKL", 44],
        ]}
      />
    </div>
  )
}
