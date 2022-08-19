import { gu, TokenAmount } from "moire"

export function TokenAmountDemo() {
  return (
    <div>
      <TokenAmount symbol="ETH" value="435.18" />
      <TokenAmount symbol="ETH" value="435.18" converted="$1,367,258" />
    </div>
  )
}
