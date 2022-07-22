import { AddressBadge, Button, IconEye } from "kit"
import { useLayout } from "../styles"
import { PanelSection } from "./PanelSection"

export function TokenContractInfo(
  { contractAddress, repoUrl }: {
    contractAddress: string
    repoUrl: string
  },
) {
  const layout = useLayout()
  return (
    <PanelSection title="Token contract info">
      <p css={({ colors }) => ({ color: colors.contentDimmed })}>
        Fractionalized NFT: ERC721 is locked and sERC20 are minted to represent
        fractional ownership of the artwork.
      </p>
      <div
        css={{
          display: "flex",
          gap: "2gu",
          paddingTop: "2gu",
        }}
      >
        <AddressBadge
          address={contractAddress}
          rounded
        />
        <Button
          external
          href={repoUrl}
          icon={<IconEye />}
          label={layout.below("medium") ? "GitHub" : "View on GitHub"}
          mode="flat"
          size="compact"
          title="View on GitHub"
          uppercase
        />
      </div>
    </PanelSection>
  )
}
