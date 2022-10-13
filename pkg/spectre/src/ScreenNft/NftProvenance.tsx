import type { Snft } from "../types"

import { Button, IconDiscordLogo, IconEye } from "moire"
import { explorerUrl, ipfsUrl } from "../utils"
import { PanelSection } from "./PanelSection"

export function NftProvenance({ snft }: { snft: Snft }) {
  return (
    <PanelSection title="Provenance">
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "2gu",
        }}
      >
        {[
          [
            "View on Etherscan",
            explorerUrl({
              type: "tokenId",
              contract: snft.nft.contractAddress,
              tokenId: snft.nft.tokenId,
            }),
          ],
          ["View on IPFS", ipfsUrl(snft.nft.tokenURI)],
          // ["Community Discord", "https://discord.com/"],
        ].map(([label, url]) => (
          <div key={label + url}>
            <Button
              external
              href={url}
              icon={/^https:\/\/discord\.com\//.test(url)
                ? <IconDiscordLogo />
                : <IconEye />}
              label={label}
              mode="flat"
              size="compact"
              uppercase
            />
          </div>
        ))}
      </div>
    </PanelSection>
  )
}
