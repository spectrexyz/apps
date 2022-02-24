import { Button, TokenAmount } from "kit"
import { useLabelStyle } from "../styles"
import { PanelSection } from "./PanelSection"

export function NftActions() {
  const labelStyle = useLabelStyle({ size: "small" })
  return (
    <PanelSection title="Actions">
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3gu",
          paddingTop: "1gu",
        }}
      >
        <div>
          <h2 css={labelStyle}>Buyout price</h2>
          <TokenAmount value="435.18" symbol="ETH" converted="$1,367,258" />
          <div css={{ height: "3gu" }} />
          <Button label="NFT buyout" mode="primary" wide />
        </div>
        <div>
          <h2 css={labelStyle}>Fraction price</h2>
          <TokenAmount value="0.0018" symbol="ETH" converted="$20.23" />
          <div css={{ height: "3gu" }} />
          <Button label="Buy fractions" wide />
        </div>
      </div>
    </PanelSection>
  )
}
