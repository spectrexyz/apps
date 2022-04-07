import { Button, TokenAmount } from "kit"
import { useLabelStyle, useLayout } from "../styles"
import { PanelSection } from "./PanelSection"

export function NftActions(
  { highlight = "buyout" }: { highlight?: "buyout" | "fractions" },
) {
  const labelStyle = useLabelStyle({ size: "small" })
  const layout = useLayout()
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
          <TokenAmount
            compact={layout.below("xlarge")}
            converted="$1,367,258"
            symbol="ETH"
            value="435.18"
          />
          {!layout.below("xlarge") && (
            <>
              <div css={{ height: "3gu" }} />
              <Button
                label="NFT buyout"
                mode={highlight === "buyout" ? "primary" : "secondary"}
                wide
              />
            </>
          )}
        </div>
        <div>
          <h2 css={labelStyle}>Fraction price</h2>
          <TokenAmount
            compact={layout.below("xlarge")}
            converted="$20.23"
            symbol="ETH"
            value="0.0018"
          />
          {!layout.below("xlarge") && (
            <>
              <div css={{ height: "3gu" }} />
              <Button
                label="Buy fractions"
                wide
                mode={highlight === "fractions" ? "primary" : "secondary"}
              />
            </>
          )}
        </div>
      </div>
      {layout.below("xlarge") && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "2gu",
            paddingTop: "2gu",
          }}
        >
          <Button
            label="NFT buyout"
            mode={highlight === "buyout" ? "primary" : "secondary"}
            size="compact"
            wide
          />
          <Button
            label="Buy fractions"
            mode={highlight === "fractions" ? "primary" : "secondary"}
            size="compact"
            wide
          />
        </div>
      )}
    </PanelSection>
  )
}
